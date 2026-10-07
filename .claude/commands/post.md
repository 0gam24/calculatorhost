---
description: 수동 포스팅 1건. 글감 목록의 [발행 지시] 또는 직접 지시로 새 가이드 작성, 또는 기존 계산기·가이드 보강 후 검증·발행
argument-hint: 키워드 (또는 위젯 버튼이 넣는 "발행: <쿼리> — 대시보드 지시(큐 <id>)")
---

# /post — 수동 포스팅 1건

입력: `$ARGUMENTS`. 원본은 awoo `.claude/commands/post.md`. calculatorhost 는 **수동 발행 전용**이다(운영자 지시 2026-09-30 "앞으로는 수동으로만"). 운영자가 이 세션에서 버튼을 누르거나 직접 지시할 때만 쓴다. 표준은 `.claude/rules/new-post-seo-geo-harness.md`.

## 대시보드 버튼 지시

메시지가 `발행:` 으로 시작하고 "대시보드 지시"가 들어 있으면 운영자가 글감 목록의 [발행 지시]를 누른 것이다.

- `docs/ops/pipeline-queue.json` items 에서 같은 `query`(공백 무시)를 찾는다. 그 항목의 `track·family·action·exposure·recent7·note·condition` 이 브리프다.
- **`exposure.reasons`(자리 열림·위에 관공서 없음·경쟁 계산기 자리 등)를 작성 브리프 맨 앞에 넣는다.** 그 자리를 차지하는 것이 글의 목표다. 큐가 이미 판정했으니 주제 선정 단계는 건너뛴다.
- 버튼 클릭이 곧 결재다. 검증을 통과하면 다시 묻지 않고 발행한다. 검증 실패면 발행하지 않고 사유만 보고한다.
- `보류:` 로 시작하는 메시지는 큐 항목 `status` 를 `hold`, `statusAt` 을 오늘로 바꾸고 끝낸다.

직접 지시(`/post 키워드`)이고 큐에 없는 키워드면, 먼저 `node scripts/keyword-pipeline.mjs --scout="<키워드>"` 로 재고 그 결과를 브리프로 쓴다.

## 처리 방식 (`action.type`)

| type | 할 일 |
|---|---|
| `calculator` | **새 글을 만들지 않는다.** `action.target` 계산기 페이지의 본문·예시 표·FAQ 를 그 검색어 의도에 맞게 보강 |
| `guide` | **새 글을 만들지 않는다.** `action.target` 가이드의 사실·날짜·빠진 각도를 보강 |
| `new` | 새 가이드 1편 |
| `new-calculator` | 멈추고 운영자에게 묻는다. 공식 설계·TDD·calc-logic-verifier 가 필요한 별도 작업 |

보강할 때 **제목·메타 설명은 바꾸지 않는다.** 90일 계획의 동결 목록(CTR 작업 금지, `.claude/STATE.md` §7)이다.

## 발행 속도 (내가 조절한다)

버튼 클릭은 "이 글감을 쓰라"는 승인이지 "지금 당장 올리라"가 아니다. 발행 직전에 센다.

```bash
node scripts/ops-widget.mjs --count
```

- **새 가이드는 하루 1건.** 이미 1건이 나갔으면 작성·검증까지 마치고 커밋하지 않은 초안으로 둔다. "왜 오늘 안 내는지, 언제 내는지"를 보고한다.
- 기존 페이지 보강은 새 URL 이 아니라서 이 상한에 넣지 않는다.
- 같은 날 제목 형태가 3건 연속 같으면 하나를 미룬다.
- 운영자가 "오늘 다 내"라고 다시 지시하면 따르되 위험을 한 문장으로 남긴다.

## 순서

### 0. 동기화
```bash
git fetch origin && git rebase --autostash origin/main
```

### 1. 수요 확인 (새 가이드만)
하네스 §1.5 를 따른다. WebSearch 로 그 검색어의 최신 이슈, 지식iN·연관검색어에서 독자가 막힌 지점과 실제 표현 3~5개, PAA 를 모은다. 이것으로 H2 5~8개를 정한다. 지식iN 은 니즈·표현의 출처로만 쓰고 문장을 옮기지 않는다.

### 2. 작성
**content-writer** 에이전트에 위임한다. 프롬프트에 넣을 것:
- `.claude/STATE.md` §1 "현재 모드"(라이브 운영 중) 한 단락
- 큐 브리프(맨 앞에 `exposure.reasons`) + 1단계 수요 결과
- 하네스 §2(작성)·§3(계산 검증)·§4(메타)·§6(광고 컴포넌트 없음)·§7(GuideHeader 등 UI props)
- §2-14: 긴 줄표·이모지 금지
- 방문자에게 보이는 작성도구(AI·자동 작성) 관련 문구를 넣지 않는다. 운영자가 2026-10-01 릴리스에서 사이트 전체에서 이런 문구를 지웠다(`docs/reports/copy-release-2026-10-01.md`). 하네스 §2-9 의 "AI 보조 표기"보다 이 결정이 우선한다. 사람 검수를 보증하는 문구도 쓰지 않는다
- 세율·공제는 `src/lib/constants/tax-rates-2026.ts` 와 `docs/data-model.md` 에서만. 법조항 §N 은 law.go.kr 1차출처로 확인한 것만
- 내부 링크: 관련 계산기 1개 이상 + 기존 가이드 cross-link(내부 링크 0 인 고립 페이지 금지)

계산 사례가 들어가면 **calc-logic-verifier** 에 검증을 맡긴다.

### 3. 등록 (새 가이드만)
```bash
node scripts/register-guide.mjs --slug <slug> --title <title> --description <desc> \
  --category <세금|세금·부동산|금융|투자|근로> --published-at <오늘> --reading-minutes <N>
```
`/guide/` 인덱스와 sitemap 에 함께 들어간다.

### 4. 검증 (전부 통과해야 발행)
```bash
node scripts/check-guide-quality.mjs src/app/guide/<slug>/page.tsx
npm run typecheck && npm run lint && npm test && npm run build
npm run sitemap:check && npm run citations:audit
```
`check-guide-quality` 의 "AI 보조 작성 표기" 항목은 위 2026-10-01 결정 때문에 수동 발행에선 적용하지 않는다(그 항목만 red 면 통과로 본다). 나머지 항목은 모두 통과해야 한다.
GitHub Actions 가 꺼져 있어서 CI 게이트가 없다. 로컬에서 위가 전부 통과해야 한다. 실패하면 고쳐서 다시 돌리고(최대 2회), 그래도 안 되면 발행하지 않고 보고한다. YMYL 수치에 확인 못 한 값이 남아 있으면 발행하지 않는다.

### 5. 발행
빌드가 바꾼 생성물(`public/llms.txt`, `src/data/date-modified-manifest.json`, `.claude/STATE.md` 자동 영역)은 커밋에서 뺀다(`git checkout -- <파일>`).
```bash
git add <작성·수정한 파일만>
git commit   # 첫 줄에 [revenue-lever: traffic] (새 URL 이면 indexing+traffic), 본문에 수익화 영향 평가 3줄
git fetch origin && git rebase --autostash origin/main && git push origin main
```
main 에 push 하면 Cloudflare Pages 가 배포한다. 이것이 사이트에 반영되는 유일한 길이다.

### 6. 후처리
- 큐 항목 `status` 를 `published`, `statusAt` 을 오늘, `publishedSlug` 를 slug 로 바꾼다(로컬 전용 파일, 커밋 안 함).
- 배포 후 URL 이 200 인지 확인한다.
- 색인 요청은 운영자가 직접 한다. 링크만 준다.
  - GSC: `https://search.google.com/search-console` → 상단 URL 검사에 발행 URL 붙여넣기 → 색인 생성 요청 (하루 10건 안팎 한도)
  - 네이버 서치어드바이저는 소유확인이 안 된 상태라 수집 요청을 못 한다(`.claude/STATE.md` §6).

## 보고 형식

운영자에게는 짧고 쉽게 쓴다(운영자 지시 2026-09-28).

```
새 글 올렸어요.            (보강이면 "<페이지> 보강했어요.")
<글 제목>
<무슨 내용인지 쉬운 말 1~2문장>
[글 보기](https://calculatorhost.com/guide/<slug>/)
```

출처·§조항·게이트 결과는 커밋 메시지에만 남긴다. 미룬 날은 "오늘 새 글은 이미 1건 나가서 초안으로 뒀어요. <날짜>에 올릴게요." 실패한 날은 "못 올렸어요. 이유: <한 줄>".

## 금지

- 예약 실행·루틴·워크플로로 발행하지 않는다.
- 토픽 풀(`scripts/daily-topic-pool.mjs`, `POOL_FROZEN=true`)을 다시 쓰지 않는다. 글감은 이 큐에서만.
- force push·reset --hard 금지.
