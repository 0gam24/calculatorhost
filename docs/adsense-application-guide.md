# AdSense 신청 절차 가이드 (운영자용)

> **Status**: 신청부터 승인까지 단계별 체크리스트
> **관계 문서**: `.claude/skills/adsense-policy-reference/REFERENCE.md`, `docs/adsense-launch-playbook.md`, `docs/launch-runbook.md`
> **Last updated**: 2026-05-06

## 개요

calculatorhost.com의 AdSense 정식 신청 및 승인 획득 절차. 신청 거부 방지를 위해 **모든 사전 조건 확인 필수**.

---

## 신청 전 체크리스트 (Step 0)

신청하기 전 다음 7개 항목을 모두 확인하세요:

- [ ] **도메인 소유권**: Google Search Console에서 "calculatorhost.com" 소유자 확인 완료 (HTML 태그 또는 DNS 인증)
- [ ] **콘텐츠 충분성**: 최소 20개 페이지 + 각 페이지당 1000자 이상 본문
- [ ] **정책 페이지**: `/privacy`, `/terms`, `/contact` 페이지 배포됨
- [ ] **모바일 최적화**: 반응형 디자인 + 클릭 버튼 48×48px 이상
- [ ] **ads.txt**: `public/ads.txt` 존재 (placeholder는 가능)
- [ ] **자동 클릭 방지**: 로컬/스테이징 환경에서 AdSense 클라이언트 ID 노출 안 함
- [ ] **신청 환경**: 자신의 Google 계정으로 생성한 도메인 Gmail 사용

---

## 신청 7단계

### Step 1: AdSense 계정 생성 (5분)

1. [adsense.google.com](https://adsense.google.com) 접속
2. "지금 시작" → Google 계정 로그인 (도메인 소유자 계정 권장)
3. 개인/비즈니스 정보 입력

**실패 케이스**: 도메인 소유권 미확인 → Search Console 먼저 인증 후 재시도

### Step 2: 사이트 등록 (3분)

1. "광고 제공 위치" → "웹사이트" 선택
2. 도메인 입력: `calculatorhost.com`
3. 국가/언어: 대한민국 / 한국어
4. 카테고리: **Finance > Tax & Finance Calculators**

**주의**: 정확한 카테고리 선택 = 심사 속도 ↑

### Step 3: AdSense 코드 추가 (5분)

AdSense가 제공하는 **글로벌 사이트 태그** 스니펫을 복사:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

**배치 위치**: `src/app/layout.tsx` 의 `<head>` 태그 내:
```tsx
export default function RootLayout() {
  return (
    <html>
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
        {/* ... other scripts ... */}
      </head>
      {/* ... */}
    </html>
  );
}
```

**체크**:
- `NEXT_PUBLIC_ADSENSE_CLIENT` 환경변수 설정 (Cloudflare Pages: ca-pub-{16자리})
- 로컬 .env.local 에는 절대 입력 금지 (공개 노출 위험)

### Step 4: 사이트 심사 신청 (2분)

1. AdSense 계정 → "계정 상태" → "계정 활성화 대기 중" 페이지
2. "사이트 검토 신청" 버튼 클릭
3. 사이트 설명(선택): 템플릿 사용:
   > "calculatorhost는 한국 성인을 대상으로 한국 금융세법 기준의 정확한 계산기를 제공합니다. 종합소득세, 양도소득세, 대출이자, 연봉 계산 등 공식 세율을 반영하며 개인정보 수집 없음."

### Step 5: 승인 대기 (1–14일)

**모니터링**:
- AdSense 대시보드 일일 확인
- Google 계정 메일 확인 ("AdSense" 검색)

**기간별 진행**:
| 기간 | 상태 | 조치 |
|---|---|---|
| 2–4일 | "검토 중" | 콘텐츠 지속 추가 가능 |
| 4–7일 | "추가 정보 요청" (경우에 따라) | 메일 내용 따라 수정 + 회신 |
| 7–14일 | "승인" 또는 "거부" | 결정 알림 메일 도착 |

### Step 6: 승인 후 광고 단위 ID 발급 (5분)

승인 메일 도착 후:
1. AdSense 계정 → "광고" → "광고 단위" → "새 광고 단위" 생성
2. 슬롯 이름 및 규격 입력 (설계된 5종):
   - **AD-1**: 리더보드 (728×90 또는 970×250)
   - **AD-2**: 중형 직사각형 (300×250)
   - **AD-3**: 대형 스카이스크래퍼 (300×600)
   - **AD-4**: 인피드 (반응형)
   - **AD-5**: 모바일 앵커 (320×50)
3. 각 단위의 **slot ID** 복사 → 환경변수 등록:
   ```
   NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD=1234567890
   NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE=1234567891
   ...
   ```

### Step 7: ads.txt 갱신 (2분)

1. AdSense 계정 → "계정" → "계정 정보" → "게시자 ID" (ca-pub-XXXXXX) 복사
2. `public/ads.txt` 업데이트:
   ```
   google.com, ca-pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
3. npm run build 후 배포

**확인**: 브라우저에서 `calculatorhost.com/ads.txt` 접속 → 실값 표시 확인

---

## 거부 시 대응 (3가지 시나리오)

### 시나리오 A: "콘텐츠 부족" 거부

**조치**:
1. 각 페이지에 1500자 이상 설명문 추가 (세율 설명, 법조항, FAQ)
2. Structured Summary 및 FAQ 상단 배치 (GEO/AEO 최적화)
3. 이미지/차트 3개 이상 추가
4. 7–14일 후 재신청 (한 번만)

### 시나리오 B: "정책 위반" 거부

**즉시 조치**:
- `npm run audit:adsense` 실행 → 정책 위반 항목 자동 검출
- 금지 표현 제거: "투자 권유", "수익 보장", "추천합니다"
- 광고 배치 검수: 페이지당 4개 이하, 정책 페이지(privacy/terms) 제외
- 모바일 전면광고 제거

### 시나리오 C: "도메인 신뢰도 부족" 거부

**조치**:
1. Search Console 7일+ 데이터 축적 (자연 트래픽 기록)
2. HTTPS 확인 (Cloudflare 자동)
3. "운영자 소개" 페이지 추가 (선택사항)

---

## 최종 체크

승인 후 첫 24–48시간:
- [ ] 광고 슬롯이 모든 계산기 페이지에서 표시됨
- [ ] 광고 클릭 시 AdSense 대시보드에 실적 기록됨
- [ ] `/privacy` 페이지에 "당사는 Google 광고를..." 문구 표시

운영 관련 자세한 내용은 `.claude/skills/adsense-policy-reference/REFERENCE.md` 및 `docs/adsense-launch-playbook.md` 참조.
