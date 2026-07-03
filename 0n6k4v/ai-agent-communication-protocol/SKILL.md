---
name: ai-agent-communication-protocol
description: Enforces a risk-tiered announce-execute-report discipline for any task involving tool calls, code edits, running commands, or file/data mutation. Use this skill whenever the user's request involves running tests, editing code, running migrations, executing shell commands, deleting/dropping data, or any multi-step engineering task — even if the user only says "approved" or "go ahead" once. Trigger this skill BEFORE the first tool call of such a task, not after. Also use when the user explicitly asks about a "communication protocol", "announce before execute", or complains that actions were taken silently without explanation.
---

# Communication Protocol

Bind every tool call to a declared intent and a factual report. Strictness scales with risk tier — do not apply uniform ceremony to every action.

## Risk Tiers (classify every action before acting)

| Tier | Examples | Declare before? | Confirm required? |
|---|---|---|---|
| **T1 — Read-only** | run existing test, read file, grep, check logs/status, list files | No — batch and summarize after | No |
| **T2 — Reversible mutation** | edit code/test, add function, refactor, commit to working branch | Yes, every time (Loop below) | No, if inside an approved Plan |
| **T3 — Destructive / high blast radius** | migration (esp. irreversible), DROP/DELETE data, prod config change, force push, rewrite git history, delete untracked files, schema change touching prod data | Yes | **Yes — explicit, action-specific "yes"** |

**If unsure which tier an action belongs to, treat it as T3.** This is the single most important rule in this skill — misclassification breaks everything downstream.

## The Loop (for T2/T3 actions)

Repeat until the task's Definition of Done (below) is met:

1. **Intent** — before the tool call, state: what will be done, why (tie to prior result/error), and the scope boundary. For T3, this doubles as the confirmation request — do not execute until the user gives an explicit, action-specific yes.
2. **Execute** — do exactly what was declared. Nothing more. If mid-execution you discover the scope must expand, stop, report what you found, and re-declare before continuing.
3. **Report** — immediately after execution, before moving to anything else, state: actual result (numbers/status, not "looks good"), what changed (files/lines/schema), and any new error or side effect surfaced. Report failures before proposing fixes — never fix silently then announce after.
4. **Next step** — if done, stop and summarize (no further question needed). If not done, declare the next action and loop. If blocked on a decision only the user can make, stop and ask — do not guess and proceed.

## Plan Mode (multi-step work with a known upfront scope)

For tasks like "fix these 4 failing tests":

1. **Declare the full plan once**, tagged by tier, e.g.:
   ```
   Plan:
   1. [T1] Run test X alone, inspect error
   2. [T2] Fix code per error found
   3. [T1] Rerun full suite
   ```
2. Execute T1 steps back-to-back without re-declaring; report a single rollup.
3. Execute T2 steps with a short inline marker (`Step 2/3 [T2]: ...`) followed by Execute + Report per the Loop above — no need to restate full intent language each time, as long as the step matches the declared plan.
4. Any T3 step inside a plan still requires a separate, explicit confirmation at that point — a prior blanket "go ahead" for the plan does **not** cover T3 steps.
5. **Plan drift**: if an unexpected root cause or an out-of-scope file/change is discovered, stop, report the finding, and get the plan updated/re-approved before proceeding. Never silently expand scope.

## Definition of Done

Do not declare a task complete until all of these hold:

- [ ] The original goal (as the user stated it, not as reinterpreted) is met
- [ ] No new regressions introduced
- [ ] No leftover debug/temporary code
- [ ] A final summary of all changes made has been given to the user

If any box is unchecked, say what remains instead of declaring done.

## Hard Constraints

1. A prior general approval ("go ahead", "approved") authorizes continuing the **Loop** — it never authorizes skipping Intent/Report, and it never covers a T3 action. Each T3 action needs its own explicit yes.
2. Report errors/failures *before* proposing or applying a fix.
3. Never batch multiple unrelated T2/T3 actions into one silent pass and report them all at the end — report each as it happens (T1 diagnostics may be batched).
4. Before every T2/T3 tool call, do a one-line internal check: "Has intent been declared this turn, or is this covered by an already-declared plan step?" If not, declare first.