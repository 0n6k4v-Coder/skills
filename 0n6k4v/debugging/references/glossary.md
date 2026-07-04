# DEBUG SKILL — Glossary

## APPENDIX A — Glossary

### Core concepts

**Root cause**
The deepest, directly fixable reason a bug exists. Has no further "why" beneath it.
A root cause is always one of: missing config, wrong value, absent code, or incorrect logic.
"Error 404" and "function returns null" are observations, not root causes.

**Delta**
The single technical difference between a passing scenario (✅) and a failing scenario (❌).
Every valid hypothesis must explain the delta. If it doesn't, it's not a hypothesis — it's noise.

**Symptom Matrix**
A two-axis table mapping all known scenario combinations to pass/fail/unknown status.
Used to find the delta and prevent premature diagnosis.

**System Layer Map**
A table listing every layer a request passes through, with confirmation status for each.
Never shrunk. Never discarded. Updated after every fix.

**Runtime evidence**
Output produced when the failing scenario actually runs.
Includes: log lines, stack traces, network responses, test results, database query output.
NOT: code reading, "this line looks like it could", intuition, user confidence.

**Hypothesis**
A candidate explanation, formed after observing the delta, naming a layer and a root cause.
Must remain labelled as hypothesis until runtime evidence confirms it.

**Piecemeal fix (P1)**
Applying a fix to one file while knowingly leaving related callers or dependents broken.
Forbidden. All items in the Impact Perimeter Map must be fixed in the same session.

**Premature close (P2)**
Closing a debug session after the original symptom resolves, without running the Root Cause
Scope Check (Gate 10B). Misses silent data corruption, related paths, and extended scope.

**Shotgun fix (P3)**
Bundling multiple unrelated changes into a single fix cycle.
Destroys attribution — cannot determine which change resolved the bug, or caused a regression.

**File provenance**
The chain of evidence confirming a file is actually in the failing request path at runtime.
A file mentioned by the user or found during code reading is a SUSPECT, not a culprit,
until runtime evidence confirms it executed during the failure.

**5-Why drill**
Iterative technique: ask "why does that happen?" repeatedly until reaching bedrock.
Bedrock = an answer that is directly fixable with no deeper cause beneath it.

**Bedrock**
The bottom of a 5-Why drill. A cause is at bedrock when "it was never written / set /
configured" and there is no further reason to ask why.

**Impact Perimeter**
All callers, dependents, shared state, and related paths that will be affected by modifying
a confirmed file. Mapped via grep/search before any modification. Never assumed.

**Debug Thread Register**
A log of new errors or unrelated symptoms discovered mid-session.
Items are classified (RELATED / UNRELATED / BLOCKING) and either folded into the current
thread or deferred — never chased immediately at the cost of the current thread.

---

### Status symbols

| Symbol | Meaning |
|--------|---------|
| ✅ | Works as expected in this scenario |
| ❌ | Fails in this scenario |
| ⚠️ | Ambiguous / intermittent — do not treat as ✅ or ❌ |
| ? | Unknown — not yet tested |
| `? uninspected` | Layer exists in system map but not yet examined |
| `✓ verified OK` | Layer confirmed working by runtime evidence |
| `✗ confirmed issue` | Layer confirmed as part of the failure by runtime evidence |
| `~ partially fixed` | Fix applied to this layer but symptom not fully resolved |

---

### Gate reference

| Gate | Name | Trigger |
|------|------|---------|
| 0 | Bug report check | Always — activate skill only if criteria met |
| 1 | Backend/container check | Bug involves API, DB, server logic, or auth |
| 1A | Project file inspection | Gate 1 activated |
| 1B | User confirmation | After ENV DETECTION RESULT is filled |
| 1C | Container command rules | Before any docker exec or DB query |
| 2 | Evidence collection | Bug has a visible UI symptom |
| 3 | Symptom Matrix | After evidence collected |
| 4 | Fill unknown cells | Any cell is ? |
| 5 | Delta analysis | Matrix has ≥1 ✅ and ≥1 ❌ |
| 6 | System Layer Map | Before hypotheses |
| 6B | File Provenance Check | Every file, every time, before reading or modifying |
| 6C | Impact Perimeter Map | Before modifying any confirmed file |
| 7 | Hypotheses | After Layer Map is complete |
| 8 | Diagnose | After hypotheses — runtime only |
| 8B | Root Cause Drill (5-Why) | After hypothesis confirmed |
| 8C | Debug Thread Register | New error appears mid-session |
| 9 | Fix + Checkpoint | After root cause identified |
| 9A | Change Log | Before touching any file |
| 9B | Fix Checkpoint | Immediately after every fix |
| 9C | Zoom Out | Still failing after a fix |
| 10 | Integration Verification + Scope Check | After all scenarios pass |
| 10A | Integration Verification | Gate 10 |
| 10B | Root Cause Scope Check | After 10A passes |

---

## APPENDIX B — Anti-Patterns Catalog

Each anti-pattern has: a name, a description, how to recognize it mid-session, and the correct action.

---

### P1 — Piecemeal Fix

**Description:**
Fixing one file while leaving known callers, dependents, or related paths broken.
Often rationalized as "I'll fix the others in a follow-up."

**How to recognize it:**
- Gate 6C Impact Perimeter shows dependents but fix only touches one file
- Grep found callers but they were not included in the Change Log
- User says "let's fix the rest later"