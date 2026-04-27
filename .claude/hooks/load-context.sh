#!/usr/bin/env bash
# 사용자 프롬프트 제출 시 상황별 컨텍스트 제공
# UserPromptSubmit 훅

set -euo pipefail

prompt="${CLAUDE_USER_PROMPT:-}"

# 배포 관련 키워드 감지
if echo "$prompt" | grep -qE "배포|deploy|출시|런칭|launch"; then
  echo "⚠️ 배포 전 필수 체크:"
  echo "  - seo-auditor 전체 페이지 감사 통과"
  echo "  - adsense-guardian ads.txt + 개인정보처리방침 확인"
  echo "  - lighthouse-profiler CWV 모든 페이지 Good"
  echo "  - 기존 WordPress Trend Money Lab 삭제 계획"
fi

# 세율 관련 키워드 감지
if echo "$prompt" | grep -qE "세율|세금|공제|과세"; then
  echo "📋 세율 작업 시 규칙:"
  echo "  - calc-logic-verifier 반드시 거치기"
  echo "  - src/lib/constants/tax-rates-{year}.ts 에만 저장"
  echo "  - 법조항 주석 필수"
fi

exit 0
