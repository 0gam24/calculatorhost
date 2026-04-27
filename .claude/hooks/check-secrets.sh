#!/usr/bin/env bash
# 시크릿 커밋 방지 훅
# PreToolUse에서 Edit/Write 전에 내용 검사

set -euo pipefail

input="${CLAUDE_TOOL_INPUT:-}"
if [[ -z "$input" ]]; then
  exit 0
fi

# jq 미설치(Windows) 환경에서는 node 로 JSON 파싱. file_path 와 content 를 각각 별도 호출 — bash 변수에 null byte 못 들어가는 이슈 회피.
if command -v node >/dev/null 2>&1; then
  file_path=$(printf '%s' "$input" | node -e "let s='';process.stdin.on('data',c=>s+=c).on('end',()=>{try{process.stdout.write(JSON.parse(s).file_path||'')}catch(e){}})" 2>/dev/null || echo "")
  content=$(printf '%s' "$input" | node -e "let s='';process.stdin.on('data',c=>s+=c).on('end',()=>{try{const o=JSON.parse(s);process.stdout.write(o.content||o.new_string||'')}catch(e){}})" 2>/dev/null || echo "")
else
  file_path=$(printf '%s' "$input" | sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')
  content=""
fi

if [[ -z "$content" ]]; then
  exit 0
fi

# .env / .my / secrets 파일 차단 (사용자 본인이 직접 관리)
if echo "$file_path" | grep -qE "\.env(\.local|\.production|\.development\.local|\.production\.local)?$"; then
  echo "BLOCKED: .env 파일 편집 금지 (사용자 직접 관리)" >&2
  echo "키는 본인이 텍스트 에디터로 .env.local 또는 .my 에 입력하세요." >&2
  exit 2
fi
if echo "$file_path" | grep -qE "(^|/)\.my(\..*)?$|\.my$"; then
  echo "BLOCKED: .my 파일 편집 금지 (비공개 API 키 보관소, 사용자 직접 관리)" >&2
  echo ".my 파일은 본인 PC 에서만, 본인이 텍스트 에디터로 직접 편집해야 합니다." >&2
  exit 2
fi
if echo "$file_path" | grep -qE "(^|/)secrets/|(^|/)credentials\.|service-account|\.pem$|\.key$"; then
  echo "BLOCKED: 시크릿 파일 편집 금지 — $file_path" >&2
  exit 2
fi

# 하드코딩된 시크릿 패턴 — 비타협 규칙: 절대 노출 금지
secret_patterns=(
  "sk-[a-zA-Z0-9]{32,}"                                # OpenAI / Anthropic
  "sk-ant-[a-zA-Z0-9_-]{32,}"                          # Anthropic Claude
  "ghp_[a-zA-Z0-9]{36,}"                                # GitHub PAT (classic)
  "github_pat_[a-zA-Z0-9_]{50,}"                        # GitHub PAT (fine-grained)
  "ghs_[a-zA-Z0-9]{36,}"                                # GitHub server token
  "xoxb-[a-zA-Z0-9-]+"                                  # Slack bot
  "xoxp-[a-zA-Z0-9-]+"                                  # Slack user
  "AIza[a-zA-Z0-9_-]{35}"                               # Google API
  "AKIA[A-Z0-9]{16}"                                    # AWS access key
  "ASIA[A-Z0-9]{16}"                                    # AWS temp
  "-----BEGIN (RSA |EC |DSA |OPENSSH |)PRIVATE KEY-----"
  "ca-pub-[0-9]{16,}"                                   # AdSense (공개 ID, 일부 위치만 허용)
  "G-[A-Z0-9]{10,}"                                     # GA4 ID (공개, 일부만 허용)
  "(api[_-]?key|secret|token|password|passwd|pwd)['\"]?\\s*[:=]\\s*['\"][A-Za-z0-9+/=_-]{16,}['\"]"
  "Bearer\\s+[A-Za-z0-9._-]{20,}"                       # Bearer token
  "Authorization:\\s*Basic\\s+[A-Za-z0-9+/=]{16,}"
  "(?i)(aws[_-]?secret|client[_-]?secret)['\"]?\\s*[:=]\\s*['\"][A-Za-z0-9+/=_-]{20,}"
)

# 공개 ID 허용 위치 (ads.txt, .env.example 만)
public_id_allowed_files="ads\\.txt$|\\.env\\.example$"

for pattern in "${secret_patterns[@]}"; do
  # `-----` 같은 패턴이 grep 옵션으로 인식되지 않도록 -- 사용
  if printf '%s' "$content" | grep -qE -- "$pattern"; then
    # 공개 ID 예외 (ads.txt / .env.example 등 의도된 노출 위치)
    if { [[ "$pattern" == "ca-pub-[0-9]{16,}" ]] || [[ "$pattern" == "G-[A-Z0-9]{10,}" ]]; } && [[ "$file_path" =~ $public_id_allowed_files ]]; then
      continue
    fi
    echo "BLOCKED: 시크릿 패턴 감지 — $pattern" >&2
    echo "파일: $file_path" >&2
    echo "환경변수(.env.local) 또는 Cloudflare Pages 대시보드로 이전하세요." >&2
    echo "문서/예시도 'YOUR_KEY_HERE' 같은 placeholder 만 사용." >&2
    exit 2
  fi
done

exit 0
