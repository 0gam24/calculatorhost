# 외부 링크 헬스 체크 보고서

**생성 시간**: 2026년 05월 06일 14:32 (Asia/Seoul)

**ralph-link-health 스크립트**: 모든 page.tsx + content/ 의 외부 링크(https://) 추출 → 도메인별 HEAD 요청 → 4xx/5xx 감지

## 요약

- 도메인 수: 12개
- 정상: 11개
- 실패: 1개

## 실패 도메인

### developers.google.com

- **상태 코드**: 403 Forbidden
- **테스트 URL**: https://developers.google.com/search/blog/2023/02/google-search-and-ai-content
- **참조 페이지**: 1곳

**설명**: 구글 검색 블로그 링크가 일시적으로 접근 제한됨. 미러 또는 WayBack Machine 대체 검토.

## 모든 도메인 목록

✅ www.hometax.go.kr (200)
✅ www.nts.go.kr (200)
✅ www.moef.go.kr (200)
✅ www.wetax.go.kr (200)
✅ www.bok.or.kr (200)
✅ www.fss.or.kr (200)
✅ www.reb.or.kr (200)
✅ kosis.kr (200)
✅ molit.go.kr (200)
✅ policybrief.molit.go.kr (200)
✅ kftc.go.kr (200)
❌ developers.google.com (403)

## 권고사항

1. **developers.google.com**: 구글 공식 문서 링크 점검 필요. 지역 제한 여부 확인.
2. **모든 정부 API 도메인 정상**: 국세청, 기획재정부, 한국은행 등 공식 채널 안정적.
3. **stuck.md 갱신**: developers.google.com 을 ralph link-health 섹션에 기록함.

---

**다음 실행**: `npm run ralph:link-health` (매일 자동 또는 수동)
