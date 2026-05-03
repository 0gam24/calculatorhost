# 어필리에이트 파트너 가입 가이드

> **운영자(김준혁) 전용 가이드**. 코드 인프라는 모두 구축됨 — 가입 후 환경변수만 입력하면 자동 활성.

## 🎯 우선순위 (즉시 시작 권장 Top 3)

### 1순위: **삼쩜삼 (3.3)** — 가장 강력한 매칭

**왜 1순위?**
- 토스 자회사 → 신뢰도 매우 높음
- 매칭 페이지가 가장 많음 (freelancer-tax, salary, 연말정산·종소세 가이드)
- 5월 종합소득세 시즌과 완벽히 정합

**가입 절차**:
1. https://3o3.co.kr/affiliate 접속
2. "파트너 신청" → 사업자 정보 입력 (스마트데이터샵 / 406-06-34485)
3. 심사 1~3 영업일
4. 승인 후 파트너 대시보드에서 추적 코드 포함된 URL 발급
5. Cloudflare Pages 환경변수 입력:
   - 변수명: `NEXT_PUBLIC_AFFILIATE_3O3_URL`
   - 값: 발급받은 URL (예: `https://3o3.co.kr/?utm_source=calculatorhost&affiliate_id=XXXX`)
   - 환경: Production
6. 다음 배포 후 freelancer-tax 페이지에 추천 박스 자동 노출 확인

**예상 수익**: CPA 5,000~10,000원/가입. 5월 시즌 월 30~50건 → 월 15~50만원 추정.

---

### 2순위: **쿠팡 파트너스** — 가장 쉽게 가입

**왜 2순위?**
- 가입 즉시 승인
- 도서·전자책 어필리에이트로 모든 가이드 끝에 자연 배치 가능
- CPS 3% (도서 기준)

**가입 절차**:
1. https://partners.coupang.com 접속
2. "파트너스 시작하기" → 카카오/네이버 간편 로그인
3. 정보 입력 → 즉시 승인
4. 추적 링크 생성: 추천하고 싶은 도서 검색 → "링크 생성" 버튼 → 단축 URL 복사
5. Cloudflare Pages 환경변수:
   - 변수명: `NEXT_PUBLIC_AFFILIATE_COUPANG_URL`
   - 값: 발급받은 단축 URL (예: `https://link.coupang.com/a/XXXXX`)

**활용 예** (가이드 끝 도서 추천):
- "양도세 절세 책": https://www.coupang.com/np/search?q=양도세+절세
- "재테크 입문서": https://www.coupang.com/np/search?q=재테크+입문

**주의**: 쿠팡 파트너스 정책상 "쿠팡파트너스 활동의 일환으로 일정 수수료를 받습니다" 명시 필수 — 이미 본 사이트에 적용됨.

---

### 3순위: **카카오뱅크 친구추천** — 즉시 가능

**왜 3순위?**
- 개인 추천 코드라 별도 가입 절차 없음
- 적금·예금 계산기와 완벽 매칭
- 추천인·추천받은 사람 모두 5,000원 보너스

**가입 절차**:
1. 카카오뱅크 앱 → 더보기 → **친구초대**
2. **추천 코드** 또는 **추천 링크** 복사
3. Cloudflare Pages 환경변수:
   - 변수명: `NEXT_PUBLIC_AFFILIATE_KAKAOBANK_URL`
   - 값: 추천 링크 (예: `https://r.kakaobank.com/recommend?code=XXXXX`)

**활용 페이지**: `/calculator/savings/`, `/calculator/deposit/` (다음 PR에서 추천 박스 추가 가능)

---

## ⚙️ 환경변수 입력 후 동작 흐름

1. **운영자**: Cloudflare Pages → Settings → Environment variables 에 키 입력
2. **자동**: 다음 배포 시 빌드에 반영
3. **자동**: 각 페이지의 `<AffiliateRecommendation>` 컴포넌트가 env var 감지 → 자동 노출
4. **자동**: `/affiliate-disclosure` 페이지의 "활성 파트너" 표에 자동 등재

env var 미입력 상태에서는:
- 사이트에 어필리에이트 UI **자동 비표시** (운영자 가입 전 안전 비활성)
- `/affiliate-disclosure` 페이지에는 "검토 중인 파트너" 섹션에 표시
- AdSense·SEO·신뢰도 영향 0

## 🛡️ 안전 운영 원칙

1. **회색지대 서비스 추천 금지** — OTT 계정공유 같이 서비스 약관 위반 가능 서비스는 추가 X
2. **한 페이지당 최대 1개** 어필리에이트 추천 (스팸 회피)
3. **광고 라벨 의무** — `<AffiliateRecommendation>` 컴포넌트가 자동 부여
4. **rel="sponsored"** — Google 정책 자동 준수
5. **사용자 결제액 영향 없음 명시** — disclosure 페이지에 명시됨

## 📊 측정 지표 (월간 점검)

| 지표 | 측정 방법 | 목표 |
|---|---|---|
| 어필리에이트 클릭률 | 파트너 대시보드 | 페이지 뷰의 1~3% |
| 전환률 | 파트너 대시보드 | 클릭의 5~10% |
| AdSense RPM 변화 | AdSense 콘솔 | 변동 없음 (어필리에이트가 광고 수익 잠식 X) |
| 페이지 신뢰도 (이탈률) | GA4 | 변동 없음 |

## 🔄 신규 파트너 추가 절차 (개발자 영역)

1. `.env.example` 에 `NEXT_PUBLIC_AFFILIATE_<KEY>_URL` 추가
2. `src/lib/constants/affiliate-partners.ts` 의 `REGISTERED_PARTNERS` 배열에 메타 추가
3. 단축 헬퍼 함수 추가 (예: `getInflearnUrl`)
4. 활용 페이지에서 `<AffiliateRecommendation>` 적용
5. 빌드 검증 + 커밋

## 📞 이의·문의

- 운영자: 김준혁 (스마트데이터샵)
- 이메일: smartdatashop@gmail.com
- 사업자등록번호: 406-06-34485
- 공식 정책: https://calculatorhost.com/affiliate-disclosure/

## 업데이트 이력

- 2026-05-03: 초판 — 8개 파트너 메타 등록, 삼쩜삼·쿠팡파트너스·카카오뱅크 우선 가입 권장
