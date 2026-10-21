# Claude Code Harness Configuration

@AGENTS.md
@docs/STANDARDS.md
@docs/SPECS.md

## Claude-Specific Orchestration & Subagents
- **Automated Hooks:** Native hooks in `.claude/settings.json` run `tsc --noEmit` after every `.ts`/`.tsx` file edit (`PostToolUse`, skipped for other file types) and enforce the full `npm run validate` suite before any `git commit` invocation, including flagged variants like `git --no-pager commit` (`PreToolUse`). A non-zero hook exit is a failed quality gate — fix the root cause, don't route around it.
- **QA Subagent Delegation:** Whenever a task implementation is ready for verification, delegate the validation run to the `qa-validator` subagent (Haiku model) to preserve main-context tokens. The `/next-task` fix→reverify loop is capped at 3 automated attempts; if still failing after the 3rd, it stops and reports the blocker to the operator instead of looping indefinitely.
- **Context Hygiene:** Complete one task via `/next-task`, commit the verified changes, and halt so the operator can reset session context via `/clear`.