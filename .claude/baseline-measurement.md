# 로컬 Lighthouse 베이스라인 측정 (Phase C)

## 환경
- macOS/Linux 권장 (Windows는 임시 파일 권한 이슈 가능)
- Node 20+
- Chrome/Chromium 설치 필수

## 측정 절차

### 1단계: 빌드 및 서버 시작
```bash
npm run build
npx http-server out -p 4173 &
sleep 2  # 서버 준비 대기
```

### 2단계: Lighthouse CI 실행 (개발 시)
```bash
npx lhci autorun --config=.lighthouserc.json
```

### 3단계: 단일 페이지 측정 (빠른 검증)
```bash
npx lighthouse http://localhost:4173/ \
  --output=json \
  --output-path=baseline-home.json \
  --chrome-flags="--headless=new --disable-gpu"

npx lighthouse http://localhost:4173/calculator/salary/ \
  --output=json \
  --output-path=baseline-salary.json
```

### 4단계: 결과 확인
```bash
# JSON 결과에서 주요 지표 추출
node -e "
  const fs = require('fs');
  const lh = JSON.parse(fs.readFileSync('baseline-home.json'));
  console.log('LCP:', lh.audits['largest-contentful-paint'].displayValue);
  console.log('FID:', lh.audits['first-input-delay']?.displayValue || 'N/A');
  console.log('CLS:', lh.audits['cumulative-layout-shift'].displayValue);
  console.log('Performance:', lh.categories.performance.score * 100);
"
```

## CI 자동 측정
PR/main push 시 GitHub Actions가 자동으로 측정합니다:
1. `npm run build` 실행
2. `npx http-server out -p 4173` 백그라운드 시작
3. `.lighthouserc.json` 설정으로 측정
4. 결과를 artifacts로 저장 (30일 유지)

## Phase C 임계값
| 지표 | 임계값 | 판정 레벨 |
|---|---|---|
| LCP | < 2500ms | error |
| CLS | < 0.1 | error |
| Performance | ≥ 85 | warn |
| SEO | ≥ 95 | error |
| Accessibility | ≥ 90 | warn |

## 트러블슈팅
- **Windows 임시 파일 오류**: WSL2 또는 CI 환경에서 측정
- **ECOS/API 키 미설정**: 경고만 출력, 빌드 진행 (fallback 데이터 사용)
- **포트 충돌**: 다른 포트로 변경 `npx http-server out -p 5000`
