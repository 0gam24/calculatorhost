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

# ── git push 컨텍스트 검증 ──
# 사용자가 직전 메시지에 "푸쉬"/"push"/"푸시" 키워드를 명시했을 때만 통과.
# 그 외엔 차단 — Claude 가 자율적으로 push 하는 것 방지.
# (force push 변형은 settings.json deny 로 별도 차단)
if echo "$command" | grep -qE '^[[:space:]]*git[[:space:]]+push'; then
  PROJECT_SLUG="c--Users-Necon-Downloads-Bibe-Code-5----"
  TRANSCRIPT_DIR="$HOME/.claude/projects/$PROJECT_SLUG"

  if [[ -d "$TRANSCRIPT_DIR" ]] && command -v node >/dev/null 2>&1; then
    LATEST_JSONL=$(ls -t "$TRANSCRIPT_DIR"/*.jsonl 2>/dev/null | head -1)
    if [[ -n "$LATEST_JSONL" ]]; then
      # 마지막 텍스트형 user 메시지 (tool_result 제외) 추출
      last_msg=$(node -e "
        const fs=require('fs');
        const lines=fs.readFileSync('$LATEST_JSONL','utf8').trim().split('\n');
        for (let i=lines.length-1; i>=0; i--) {
          try {
            const o=JSON.parse(lines[i]);
            if (o.type!=='user' || !o.message || o.message.role!=='user') continue;
            const c=o.message.content;
            if (typeof c==='string') { process.stdout.write(c); return; }
            if (Array.isArray(c)) {
              const t=c.find(x=>x.type==='text');
              if (t) { process.stdout.write(t.text||''); return; }
            }
          } catch(e){}
        }
      " 2>/dev/null)

      if echo "$last_msg" | grep -qiE '푸쉬|push|푸시'; then
        # 사용자 명시 동의 — 통과
        exit 0
      else
        echo "BLOCKED: git push 는 사용자가 '푸쉬'/'push'/'푸시' 키워드로 명시 동의한 직후만 허용." >&2
        echo "사용자 직전 메시지에서 키워드 미발견. 사용자에게 'PowerShell 에서 git push 직접 실행' 안내 권장." >&2
        exit 2
      fi
    fi
  fi
  # transcript 못 찾으면 안전 차단
  echo "BLOCKED: git push — transcript 검증 불가. 사용자 직접 실행 권장." >&2
  exit 2
fi

# 금지 패턴 — 영구 비타협 규칙
# 시크릿 노출 차단: env, printenv, .env 출력 등
block_patterns=(
  "rm -rf /"
  "rm -rf ~"
  "rm -rf \."
  "dd if="
  "mkfs"
  "> /dev/sd"
  ":(){ :|:& };:"

  # ── 그 외 파괴적 git ──
  "git reset --hard origin/(main|master)"
  "git branch -D (main|master)"
  "git clean -fdx"

  # ── 원격 자원 자체 변경/삭제 (단독 운영자라도 보호 유지) ──
  # gh pr create/merge/close/comment 는 settings.json allow 등재 (2026-05-08 운영자 명시 승인).
  # 본 훅은 git push 와 동일한 키워드 컨텍스트 검증 로직을 사용 — 위 git push 블록의 키워드
  # 검증이 통과한 동일 turn 에서만 자율 실행, 그 외에는 settings.json allow 만으로 통과.
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
