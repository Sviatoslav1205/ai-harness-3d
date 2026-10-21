#!/usr/bin/env bash
# PreToolUse(Bash): block `git commit` unless `npm run validate` is green.

input="$(cat)"

if printf '%s' "$input" | grep -Eq '\bgit\b([[:space:]]+[A-Za-z0-9._/:=-]+){0,6}[[:space:]]+commit\b' && [ -f package.json ]; then
  output="$(npm run validate 2>&1)"
  status=$?
  if [ "$status" -ne 0 ]; then
    echo "$output" >&2
    exit 2
  fi
fi

exit 0