---
description: Implement the next incomplete task from docs/TASKS.md using subagents, validate it, and commit.
---

Review `docs/ARCHITECTURE.md` and `docs/TASKS.md` (remember that `CLAUDE.md`, `STANDARDS.md`, and `SPECS.md` are already loaded in your root context).
1. Identify the first incomplete task marked with `[ ]` in `docs/TASKS.md`.
2. Formulate a concise **Context Slice** for that task (exact file paths to create, TypeScript interfaces from `ARCHITECTURE.md`, and required `data-testid` / `aria-label` attributes from `SPECS.md`) and delegate implementation to the `task-implementer` subagent.
3. Once `task-implementer` finishes, delegate verification to the `qa-validator` subagent.
4. Run the fix-and-reverify loop with a hard cap of 3 attempts:
   a. Pass `qa-validator`'s exact failure output to `task-implementer` to fix.
   b. Re-run `qa-validator`.
   c. If it reports `VALIDATION PASSED`, proceed to step 5.
   d. If it still fails after the 3rd attempt, STOP immediately — do not mark the task `[x]` and do not commit. Report to the operator: the task ID, the exact failing `qa-validator` output from the final attempt, and that the task is blocked pending human review after 3 automated fix attempts.
5. Update `docs/TASKS.md` by marking the completed task as `[x]`.
6. Stage all changes and create a clean Conventional Commit describing the completed task.
7. Stop immediately after committing and report completion so the operator can `/clear` context.