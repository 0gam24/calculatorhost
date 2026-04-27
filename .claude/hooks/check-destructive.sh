#!/usr/bin/env bash
# 파괴적 명령 차단 훅
# PreToolUse에서 Bash 호출 전 실행
# $CLAUDE_TOOL_INPUT에 명령어 JSON 포함

set -euo pipefail

# JSON에서 command 필드 추출 (jq 미설치 환경 대비 node 사용)
input="${CLAUDE_TOOL_INPUT:-}"
if [[ -z "$input" ]]; then
  exit 0
fi

# node 가 있으면 안정적으로 JSON 파싱, 없으면 sed fallback
if command -v node >/dev/null 2>&1; then
  command=$(printf '%s' "$input" | node -e "let s='';process.stdin.on('data',c=>s+=c).on('end',()=>{try{const o=JSON.parse(s);process.stdout.write(o.command||'')}catch(e){}})" 2>/dev/null || echo "")
else
  command=$(printf '%s' "$input" | sed -n 's/.*"command"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')
fi

if [[ -z "$command" ]]; then
  exit 0
fi

# 금지 패턴 — 영구 비타협 규칙
# 1) git push 전면 차단: 사용자가 명시적으로 "푸쉬" 요청한 직후에만 settings.json deny 임시 해제 후 사용
# 2) 시크릿 노출 차단: env, printenv, .env 출력 등
block_patterns=(
  "rm -rf /"
  "rm -rf ~"
  "rm -rf \."
  "dd if="
  "mkfs"
  "> /dev/sd"
  ":(){ :|:& };:"

  # ── git push 전면 차단 ──
  "git push"

  # ── 그 외 파괴적 git ──
  "git reset --hard origin/(main|master)"
  "git branch -D (main|master)"
  "git clean -fdx"

  # ── 원격 자원 변경 (PR/이슈/리포 머지·삭제) ──
  "gh pr (create|merge|close|comment)"
  "gh repo (create|delete)"
  "wrangler pages project delete"
  "wrangler pages deployment delete"

  # ── 시크릿 노출 ──
  "(^|;|&&|\| )env( |$)"
  "printenv"
  "cat[[:space:]]+.*\\.env"
  "cat[[:space:]]+.*\\.my\b"
  "cat[[:space:]]+.*[/.]my$"
  "cat[[:space:]]+\\.my$"
  "cat[[:space:]]+.*\\.pem"
  "cat[[:space:]]+.*\\.key"
  "cat[[:space:]]+.*credentials"
  "cat[[:space:]]+.*secret"
  "(head|tail|less|more|bat)[[:space:]]+.*\\.env"
  "(head|tail|less|more|bat)[[:space:]]+.*\\.my\b"
  "grep[[:space:]]+.*\\.my\b"
  "grep[[:space:]]+.*\\.env"
  "echo[[:space:]]+\\\$[A-Z_]*(KEY|SECRET|TOKEN|PASSWORD|PASS|CREDENTIAL)"
  "git[[:space:]]+add[[:space:]]+\\.my"
  "git[[:space:]]+add[[:space:]]+\\.env"
  "git[[:space:]]+add[[:space:]]+secrets"
  "(scp|rsync)[[:space:]]+.*\\.(my|env|pem|key)"
  "curl[[:space:]]+.*-T[[:space:]]+.*\\.(my|env|pem|key)"
  "curl[[:space:]]+.*--upload-file[[:space:]]+.*\\.(my|env|pem|key)"

  # ── 설치형 셸 실행 ──
  "curl .* \| (sh|bash)"
  "wget .* \| (sh|bash)"
  "chmod 777 /"
)

for pattern in "${block_patterns[@]}"; do
  if echo "$command" | grep -qE "$pattern"; then
    echo "BLOCKED: 파괴적 명령 차단됨 — 패턴: $pattern" >&2
    echo "명령: $command" >&2
    exit 2  # non-zero = 차단
  fi
done

exit 0
