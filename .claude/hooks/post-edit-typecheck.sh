#!/usr/bin/env bash
# 편집 후 TypeScript 검증 훅 (경량)
# PostToolUse에서 Edit/Write 성공 후 실행

set -euo pipefail

file_path=$(echo "${CLAUDE_TOOL_INPUT:-{\}}" | jq -r '.file_path // ""' 2>/dev/null || echo "")

# TypeScript 파일이 아니면 스킵
if [[ ! "$file_path" =~ \.(ts|tsx)$ ]]; then
  exit 0
fi

# package.json 없으면 아직 프로젝트 init 안 된 상태 → 스킵
if [[ ! -f "package.json" ]]; then
  exit 0
fi

# 빠른 타입체크 (해당 파일만)
if command -v npx >/dev/null 2>&1; then
  if ! npx tsc --noEmit --skipLibCheck "$file_path" 2>&1 | head -20; then
    echo "⚠️ TypeScript 오류 감지됨 — 수정 권장" >&2
    # exit 0 으로 경고만 하고 진행은 허용
  fi
fi

exit 0
