// 네이버 웹문서 검색 결과 판정 (순수 함수).
//
// 원본: awoo `scripts/naver-rank-check.mjs` 의 hostKind·classifyDoc·parseResults·verdicts
// (D:\Bibe-Code\00 Website\01 awoo, 2026-09-15 공식 API 전환판). 이식 지침서
// `01 awoo/docs/ops/KEYWORD-SYSTEM-PORT-PROMPT.md` 2단계에 따라 calculatorhost 용으로 다시 썼다.
//
// awoo 와 다른 점 (docs/ops/SITE-KEYWORD-PROFILE.md "결정적으로 다른 점"):
// - 'tool' 종류 추가. 경쟁 계산기 사이트는 awoo 에겐 못 이기는 벽이지만 우리에겐 뺏을 자리다.
//   그래서 openSlots 에 센다. 2026-10-07 네이버 실측("청약가점 계산기"·"양도소득세 계산기")에서
//   aptalimi·onetoolhub·devcomma·부동산계산기.com 같은 소형 도구 사이트가 웹문서 자리에 있었다.
// - 지역 규칙(no-region·구청 본청 판정)은 뺐다. 지원금 지역 글 전용 규칙이다.
// - mainGov 는 "지자체 본청" 이 아니라 "살아 있는 관공서 문서" 다. 홈택스·위택스 모의계산,
//   노동부 계산기처럼 공식 도구가 위에 있으면 우리가 들어가기 어렵다.
//
// 출력 키 이름은 awoo 계약(scout 출력)과 같게 둔다. 이후 이식할 파이프라인·exposureOf 가 그대로 읽는다.

export const SITE_HOST = 'calculatorhost.com';
export const ABOVE_WINDOW = 10; // 통합검색 웹문서 블록(≈10건)과 같은 눈금

// ── 기관 ─────────────────────────────────────────────────────
// awoo 2026-09-09 실측: go.kr 만 보면 korea.kr·or.kr·gov.kr 공식기관이 상업으로 샌다.
const INSTITUTIONAL_RE = /(^|\.)(go\.kr|or\.kr|re\.kr|mil\.kr|ac\.kr|gov\.kr)$/;
// TLD 로 안 잡히는 공식 도메인. 청약홈은 한국부동산원 운영, kosis.kr 은 통계청.
const OFFICIAL_EXTRA = new Set(['korea.kr', 'applyhome.co.kr', 'kosis.kr']);
const isInstitutional = (h) => INSTITUTIONAL_RE.test(h) || OFFICIAL_EXTRA.has(h);

// ── 경쟁 계산기 사이트 (tool) ────────────────────────────────
// 목록 출처: 2026-10-07 네이버 실측 5건 + 2026-09-30 구글 SERP 실측(adsense-90day-plan 근거).
// 누락은 commercial 로 남는다. 둘 다 openSlots 에 들어가므로 판정은 같고 표시만 다르다.
const TOOL_HOSTS = new Set([
  'aptalimi.com',
  'onetoolhub.com',
  'enolasoft.com',
  'apttoyou.kr',
  'devcomma.com',
  'calculate.co.kr',
  'xn--989a00af8jnslv3dba.com', // 부동산계산기.com
  'mrsbok.com',
  'k-calc.com',
  'kukmincalc.com',
  'taxcalc.co.kr',
  'demoday.co.kr',
  'ezloan.io',
  'taxly.kr',
  'taxcap.co.kr',
  'calcnara.com',
  'calctools.co.kr',
]);
const TOOL_LABEL_RE = /(calc|calculator|calculate|tool|tools|keisan|gyesan)/;
const isTool = (h) =>
  TOOL_HOSTS.has(h) ||
  [...TOOL_HOSTS].some((t) => h.endsWith(`.${t}`)) ||
  h.split('.').some((label) => TOOL_LABEL_RE.test(label));

// ── 언론 (awoo 목록에서 경제지 중심으로 추림) ─────────────────
const PRESS_LABEL_RE =
  /^(?:.*(?:news|ilbo|times|daily|press|journal|media|sinmun|shinmun|broadcast|nocut|newspim|dailian|pressian|ohmy).*|tv.*|.*tv)$/;
const PRESS_HOSTS = new Set([
  'yna.co.kr', 'ytn.co.kr', 'mbc.co.kr', 'kbs.co.kr', 'sbs.co.kr', 'jtbc.co.kr',
  'hani.co.kr', 'joongang.co.kr', 'chosun.com', 'donga.com', 'khan.co.kr',
  'mt.co.kr', 'mk.co.kr', 'hankyung.com', 'hankookilbo.com', 'kmib.co.kr',
  'segye.com', 'munhwa.com', 'fnnews.com', 'asiae.co.kr', 'etoday.co.kr',
  'ajunews.com', 'edaily.co.kr', 'news1.kr', 'newsis.com', 'inews24.com',
  'kukinews.com', 'sedaily.com', 'heraldcorp.com', 'bizwatch.co.kr', 'biz.chosun.com',
]);
const isPress = (h) =>
  PRESS_HOSTS.has(h) ||
  [...PRESS_HOSTS].some((p) => h.endsWith(`.${p}`)) ||
  h.split('.').some((label) => label.length >= 3 && PRESS_LABEL_RE.test(label));

const inSet = (h, set) => set.has(h) || [...set].some((s) => h.endsWith(`.${s}`));

/**
 * 호스트 1차 분류. 순서가 판정이다:
 * 자사 → 네이버 → 자매 → 기관 → 도구 → 언론 → 상업.
 * 도구를 언론보다 먼저 보는 이유: 'taxcalc' 같은 라벨이 언론 정규식에 걸리지 않게.
 * @param {string} host  소문자, www. 제거된 호스트
 * @param {Set<string>} sisters  자매 호스트(자사 제외)
 */
export function hostKind(host, sisters = new Set()) {
  if (host === SITE_HOST || host.endsWith(`.${SITE_HOST}`)) return 'us';
  if (host.includes('naver.com')) return 'naver';
  if (inSet(host, sisters)) return 'sister';
  if (isInstitutional(host)) return 'institutional';
  if (isTool(host)) return 'tool';
  return isPress(host) ? 'press' : 'commercial';
}

// 관공서 게시판 공지 한 장은 우리 글이 이길 수 있는 자리다 (awoo 계획 §4-4 (a)).
const BOARD_PATH_RE =
  /(bbs|board|notice|게시판|nttId|bbsId|boardView|selectBbs|postUid|\/post\/|fboard=)/i;
// 구청·주민센터 공지도 본청(핵심 관공서) 문서가 아니다.
const SUB_OFFICE_RE = /(구청|[읍면동]\s?(사무소|행정복지센터)|행정복지센터|주민센터)/;

const decodeUrl = (u) => {
  const s = String(u ?? '').replace(/&amp;/g, '&');
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};

/**
 * 제목·스니펫의 연도(2000~2099). "2026.07." "2026년" "2025-12-30" 에 더해 "2024 청약가점 계산기" ·
 * "계산기 2026 | 사이트" 처럼 공백·쉼표·파이프·끝으로 끊긴 단독 연도도 잡는다.
 * awoo 원본은 앞의 세 꼴만 잡았는데, 계산기 사이트 제목은 "X 계산기 2026" 꼴이 흔하다.
 * "2000cc"·"2030세대"·"2000만원" 은 뒤에 글자가 붙어 있어 잡히지 않는다.
 */
const yearsIn = (text) =>
  [...String(text ?? '').matchAll(/(?:^|[^\d])(20\d{2})(?=\s*[.\-년/,|)]|\s|$)/g)].map((m) =>
    Number(m[1]),
  );

/**
 * 문서 1건 분류. 기관 문서는 게시판·지난 연도·하위 관서면 'institutional-open'(열린 자리)으로 다시 나눈다.
 * @returns {{kind:string, stale:boolean, mainGov:boolean, openBy:string[]}}
 */
export function classifyDoc(doc, sisters, year) {
  const kind0 = hostKind(doc.host, sisters);
  const yrs = yearsIn(`${doc.title ?? ''} ${doc.snippet ?? ''}`);
  // 연도가 전부 올해 이전 = 지난 회차 문서. 올해 언급이 하나라도 있으면 살아 있는 문서.
  const stale = yrs.length > 0 && Math.max(...yrs) < year;
  if (kind0 !== 'institutional') return { kind: kind0, stale, mainGov: false, openBy: [] };

  const openBy = [];
  if (BOARD_PATH_RE.test(decodeUrl(doc.url))) openBy.push('board');
  if (SUB_OFFICE_RE.test(doc.title ?? '')) openBy.push('sub-office');
  if (stale) openBy.push('stale');
  if (openBy.length) return { kind: 'institutional-open', stale, mainGov: false, openBy };
  return { kind: 'institutional', stale, mainGov: true, openBy };
}

/** API 응답 텍스트 정리. 제목·요약에 검색어 강조 <b> 와 엔티티가 섞여 온다. */
export const stripTags = (s) =>
  String(s ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * 웹문서 검색 API 응답 → 분류된 문서 목록.
 * 호스트당 첫 건만 남긴다. API 는 한 사이트 문서를 여러 개 돌려주지만 통합검색 웹문서 블록은
 * 사이트당 1~2건만 보여준다(awoo 2026-09-16 실측). 중복을 세면 "자리가 꽉 찼다"가 부푼다.
 * @param {{total?:number, items?:{title:string,link:string,description:string}[]}} json
 * @param {{sisters?:Set<string>, year:number}} opts
 */
export function parseResults(json, { sisters = new Set(), year }) {
  const all = [];
  for (const it of json?.items ?? []) {
    let host;
    try {
      host = new URL(it.link).hostname.toLowerCase().replace(/^www\./, '');
    } catch {
      continue; // URL 파싱 불가 항목은 건너뛴다
    }
    const doc = {
      url: it.link,
      host,
      title: stripTags(it.title).slice(0, 80) || null,
      snippet: stripTags(it.description).slice(0, 300) || null,
    };
    const c = classifyDoc(doc, sisters, year);
    all.push({ ...doc, ...c });
  }
  const seen = new Set();
  const webDocs = all.filter((d) => !seen.has(d.host) && seen.add(d.host));
  const top = webDocs.slice(0, ABOVE_WINDOW);
  const count = (k) => top.filter((d) => d.kind === k).length;
  return {
    webDocs,
    webDocCount: webDocs.length,
    webDocRaw: all.length,
    webDocTotal: json?.total ?? null,
    institutionalCount: count('institutional') + count('institutional-open'),
    institutionalOpenCount: count('institutional-open'),
    mainGovCount: top.filter((d) => d.mainGov).length,
    toolCount: count('tool'),
    pressCount: count('press'),
    commercialCount: count('commercial'),
    sisterCount: count('sister'),
  };
}

/**
 * 자사 위 문서. 미노출(-1)이거나 창 밖이면 상위 창 전체를 담는다 — 원인 규명이 가장 필요한 경우다.
 * @param {object[]} webDocs  parseResults().webDocs
 * @param {number} idx  자사 인덱스(없으면 -1)
 */
export function buildAbove(webDocs, idx) {
  const wholeWindow = idx === -1 || idx >= ABOVE_WINDOW;
  const slice = wholeWindow ? webDocs.slice(0, ABOVE_WINDOW) : webDocs.slice(0, idx);
  const above = slice.map((d) => ({
    host: d.host,
    kind: d.kind,
    title: d.title,
    ...(d.stale ? { stale: true } : {}),
    ...(d.mainGov ? { mainGov: true } : {}),
    ...(d.openBy?.length ? { openBy: d.openBy } : {}),
  }));
  return { above, wholeWindow };
}

const NEWS_SAME_TITLE_WARN = 4;
const EYE_CLOSED = 3;
const EYE_LABEL = { 1: '첫 화면', 2: '한 번 스크롤', 3: '그 아래' };

/**
 * 열린 자리·판정 (awoo verdicts 와 같은 규칙, tool 을 열린 자리로 센다).
 *   openSlots = above 중 naver·institutional·sister·us 가 아닌 것 (tool·commercial·press·institutional-open)
 *   verdictT1 = 관공서 ≤1 AND (자사 미노출 OR 4위 이하)
 *   verdictT2 = openSlots ≥ 2
 *   눈 확인 3(그 아래)이면 둘 다 닫힘.
 */
export function verdicts({ rank, above, eyeOffset, news }) {
  const openSlots = above.filter(
    (d) => !['naver', 'institutional', 'sister', 'us'].includes(d.kind),
  ).length;
  const mainGovAbove = above.filter((d) => d.mainGov).length;
  const sisterAbove = above.filter((d) => d.kind === 'sister').length;
  const toolAbove = above.filter((d) => d.kind === 'tool').length;
  const reason = [];

  let verdictT1 = 'open';
  if (mainGovAbove > 1) {
    verdictT1 = 'closed';
    reason.push(`mainGov ${mainGovAbove}>1`);
  }
  if (rank != null && rank < 4) {
    verdictT1 = 'closed';
    reason.push(`already r${rank}`);
  }
  let verdictT2 = 'open';
  if (openSlots < 2) {
    verdictT2 = 'closed';
    reason.push(`openSlots ${openSlots}<2`);
  }
  if (eyeOffset === EYE_CLOSED) {
    verdictT1 = 'closed';
    verdictT2 = 'closed';
    reason.push(`eye ${EYE_LABEL[EYE_CLOSED]}`);
  }
  if (news?.newsSameTitle >= NEWS_SAME_TITLE_WARN) {
    reason.push(`news-warn 같은 제목 ${news.newsSameTitle}·7일 ${news.newsWall}건`);
  }
  if (sisterAbove > 0) reason.push(`sister ${sisterAbove}`);
  if (toolAbove > 0) reason.push(`tool ${toolAbove}`);
  // 못 잰 값은 지어내지 않는다
  reason.push('offset·press 미측정(API)');

  return {
    openSlots,
    mainGovAbove,
    pressAbove: null,
    sisterAbove,
    toolAbove,
    verdictT1,
    verdictT2,
    reason,
  };
}
