#!/usr/bin/env bash
# PostToolUse(Write|Edit): fail fast on type errors after every TypeScript file edit.
# A no-op until the scaffold task creates tsconfig.json + node_modules, and skipped
# entirely for non-TypeScript files to avoid redundant project-wide checks.
# Exit 2 blocks the tool call and feeds stderr back to Claude (Claude Code hook contract).

input="$(cat)"
file_path="$(printf '%s' "$input" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | head -n1 | sed -E 's/.*:[[:space:]]*"(.*)"/\1/')"

case "$file_path" in
  *.ts|*.tsx) ;;
  *) exit 0 ;;
esac

if [ -f tsconfig.json ] && [ -d node_modules ]; then
  output="$(npx tsc --noEmit 2>&1)"
  status=$?
  if [ "$status" -ne 0 ]; then
    echo "$output" >&2
    exit 2
  fi
fi

exit 0
