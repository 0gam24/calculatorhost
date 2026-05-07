# Ralph FAQ Suggest — Search Console 4티어 FAQ 자동 보강

## 개요

**Phase P (Ralph E)** 스크립트. Search Console 실제 검색 쿼리 데이터를 분석하여, 1페이지 진입 직전(position 11~30) 에 있는 쿼리를 식별하고, 각 계산기 페이지별로 추가할 FAQ 후보를 자동 생성.

## 흐름

```
Search Console Export (CSV)
        ↓
[1] CSV 파싱 (의존성 0)
        ↓
[2] position 11~30 필터 (1페이지 진입 직전)
        ↓
[3] 기존 FAQ 중복 제거 (substring 매칭)
        ↓
[4] 키워드 → 페이지 슬러그 매핑
        ↓
[5] 페이지별 상위 3~5개 FAQ 그룹화
        ↓
.claude/reports/faq-suggest-{YYYY-MM-DD}.md
```

## 사용법

### 1. Search Console CSV 준비
Google Search Console 대시> **성과** > **페이지별** → CSV 다운로드:
```
query,impressions,clicks,position
연봉 5000 실수령액,8420,1240,3.2
양도소득세 계산기,5230,680,7.1
...
```

### 2. CSV를 프로젝트에 배치
```bash
cp ~/Downloads/search-console-export.csv ./data/search-queries.csv
```

### 3. 스크립트 실행
```bash
npm run ralph:faq
```

### 4. 출력 확인
```
.claude/reports/faq-suggest-YYYY-MM-DD.md
```

## 샘플 실행 결과

20개 샘플 쿼리를 입력했을 때:
- CSV 로드: 20개 쿼리
- position 11~30 필터: 17개 후보
- 기존 FAQ 중복 제거 후: 15개 추가 권고
- 페이지별 그룹화: 13개 페이지에 FAQ 분배

출력 샘플:
```
### /calculator/salary
- **"4대보험 계산"**
  - impressions: 2340, position: 14.2
```

## 다음 단계 (사람 작업)

1. **content-writer 검토**: 보고서의 FAQ 목록이 타당한지 확인
2. **답변 작성**: 각 계산기 MDX 파일의 FAQ 섹션에 추가
3. **스타일 통일**: 기존 FAQ 포맷과 일치하게 작성
4. **2-3주 후 측정**: Search Console에서 다시 export → 효과 측정

## 기술 스펙

- **입력**: CSV (query, impressions, clicks, position)
- **필터**: position 11~30 (POSITION_MIN/MAX 설정 가능)
- **중복 판정**: substring 매칭 (3글자 이상 연속 일치 = 중복)
- **페이지 매핑**: 단순 키워드 규칙 (형태소 분석 X)
- **출력**: Markdown 보고서 (자동 수정 X, 보고만)
- **의존성**: 0개 (Node.js 기본 fs/path만 사용)

## 커스터마이징

### position 범위 변경
```javascript
const POSITION_MIN = 11;  // 시작
const POSITION_MAX = 30;  // 종료 (현재 1페이지 진입 직전)
```

### 키워드 매핑 추가
```javascript
const PAGE_KEYWORD_MAP = [
  { slug: 'new-calculator', keywords: ['새로운', '키워드'] },
  ...
];
```

### FAQ 그룹당 상위 개수 변경
```javascript
.slice(0, 5)  // 현재 5개, 원하는 개수로 변경
```

## 월례 프로세스

```
[매월 1일]
  ↓
[Search Console 성과 데이터 export]
  ↓
npm run ralph:faq
  ↓
content-writer에 보고서 검토 요청
  ↓
[선택된 FAQ 추가]
  ↓
[다음달 측정]
```

## FAQ

**Q. 실제 데이터는 어디서 오나?**  
A. Google Search Console "성과" 섹션에서 월간 export.

**Q. 자동으로 페이지를 수정하나?**  
A. 아니오. 보고서만 생성. content-writer가 다음 회차에 수동 추가.

**Q. 형태소 분석을 하나?**  
A. 아니오. 단순 substring. 예: "양도세" 키워드가 "일시적2주택 양도세"와 일치하면 매핑.

---

**마지막 갱신**: 2026-05-07  
**담당**: Phase P (Ralph E) — Search Console 4티어 자동 보강
