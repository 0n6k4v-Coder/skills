# DEBUG SKILL — Anti-Patterns Catalog

**What happens:**
- Bug reappears from an unfixed caller
- Regression is blamed on the fix rather than the untouched caller
- Future developer fixes the same root cause twice without realizing it

**Correct action:**
Run Gate 6C. Fix ALL items in the perimeter in the same session.
If scope is too large for one session, document every remaining item explicitly and hand off a list — do not silently leave them.

---

### P2 — Premature Close

**Description:**
Closing the debug session as soon as the original symptom disappears, without checking
whether the root cause affects other paths, features, or stored data.

**How to recognize it:**
- Gate 9B Fix Checkpoint shows all ✅ but Gate 10B was skipped
- No Root Cause Scope Check was run
- "It works now, we're done"

**What happens:**
- Same root cause breaks a different feature next sprint
- Silent data corruption goes undetected
- Related paths fail in production while passing in dev

**Correct action:**
Never close without Gate 10B.
Run all four scope questions. If EXTENDED or DATA IMPACT: address before closing.

---

### P3 — Shotgun Fix

**Description:**
Bundling multiple changes — bug fix + refactor + logging + style tweaks — into a single
fix cycle, making it impossible to attribute which change resolved (or broke) something.

**How to recognize it:**
- Change Log lists files that are NOT in the Impact Perimeter
- Fix includes "while I'm here" improvements
- Commit message is "fix auth + clean up helpers + update error messages"

**What happens:**
- Regression introduced by the "cleanup" is blamed on the bug fix
- Reverting the fix also reverts unrelated changes
- Future debugging cannot isolate which change caused what

**Correct action:**
One logical change per fix cycle. The attribution test: if this fix alone is reverted, does the symptom return? If no — the fix contains unrelated changes. Split them.

---

### P4 — Code Reading as Confirmation

**Description:**
Treating "I can see in the code that X happens" as proof that X actually happens at runtime.

**How to recognize it:**
- Phrases like "this confirms it" or "as we can see" after reading a file
- A hypothesis is marked confirmed without any runtime output
- Fix is applied immediately after code reading, skipping Gate 8

**What happens:**
- The "obvious" code path is not the one that executes at runtime
- A correct-looking function is never actually called
- The real bug is in a different layer that was never inspected

**Correct action:**
Code reading produces hypotheses, never evidence.
For every hypothesis: design a runtime check. Run it. Collect output. Then confirm or rule out.

---

### P5 — Tunnel Vision (Same-Layer Fixation)

**Description:**
Re-examining the same layer repeatedly after a fix fails, instead of zooming out to inspect
other layers.

**How to recognize it:**
- Two or more fixes applied to the same layer without resolving the symptom
- Next planned action is on a layer already marked `~ partially fixed`
- System Layer Map still has `? uninspected` rows that were never checked

**What happens:**
- Real bug is in a different layer (proxy, AppProvider, database) and is never found
- Increasing number of changes accumulate on the wrong layer
- P3 Shotgun Fix pattern develops as a side effect

**Correct action:**
Trigger: "I was about to re-examine [layer] again."
Hard stop. Mark that layer `~ partially fixed`. Choose the next `? uninspected` layer.
Generate a fresh hypothesis from that layer. Run Gate 8 there.

---

### P6 — Unverified "Everywhere" Claim

**Description:**
Accepting the user's claim that something "works everywhere except X" without verifying
the other scenarios in the Symptom Matrix.

**How to recognize it:**
- Matrix cells marked ✅ based on user assertion, not actual test results
- "It works fine on other pages" accepted without checking
- Delta is formed against unverified passing scenarios

**What happens:**
- The "working" scenario is also broken in a slightly different way
- Delta is wrong — it points to the wrong difference
- Hypothesis is built on a false baseline

**Correct action:**
"Everywhere" is unverified. Fill every matrix cell explicitly.
Ask user to test each scenario. Accept ✅ only from a test actually run, not from memory.

---

### P7 — Mid-Session Pivot

**Description:**
Abandoning the current debug thread to chase a new error or symptom that appeared
during investigation.

**How to recognize it:**
- A new console error appears and immediately becomes the new focus
- Current hypothesis is dropped without logging
- Gate 8C Debug Thread Register was never created

**What happens:**
- Original bug is unresolved and forgotten
- New error may be a side effect of the investigation, not a real bug
- Session ends with neither the original nor the new issue resolved

**Correct action:**
New error = Gate 8C. Classify: RELATED / UNRELATED / BLOCKING.
Log it. Stay on the current thread. The new item gets its own Gate 0–10 sequence later.

---

### P8 — User Confidence as Evidence

**Description:**
Treating the user's certainty about which file is broken as confirmation that the file is
in the failing path, skipping Gate 6B File Provenance Check.

**How to recognize it:**
- "The user said it's in auth.ts so let's fix auth.ts"
- Gate 6B was skipped because "the user seems confident"
- File modified without any runtime confirmation it executes during failure

**What happens:**
- The user is wrong (common) — correct file is in a different layer
- Changes accumulate on a file that is not in the failing path
- Real bug remains untouched

**Correct action:**
Run Gate 6B for every file, every time. User confidence is not evidence.
If Q1 and Q2 are both "not yet confirmed": add a log at the file's entry point,
reproduce the failure, confirm it appears. Then proceed.

---

### P9 — Hypothesis Skipping (Jumping to Fix)

**Description:**
Moving directly from symptom description to fix, skipping the Symptom Matrix, Delta,
Layer Map, and hypothesis generation entirely.

**How to recognize it:**
- "I know what this is" immediately after the user describes the bug
- Fix is proposed before Gate 3 is filled
- No matrix, no delta, no hypothesis list in the session

**What happens:**
- The "obvious" fix addresses a symptom, not the root cause
- Bug reappears under a slightly different scenario
- Because no matrix exists, the reappearance is harder to debug than the original

**Correct action:**
Every bug, no matter how familiar it looks, runs Gates 0–10.
"I've seen this before" is a hypothesis. It still needs runtime confirmation.

---

### P10 — Incomplete 5-Why (Stopping Too Early)

**Description:**
Declaring root cause found at an intermediate "why" level — one that still has a deeper
cause beneath it.

**How to recognize it:**
- Root cause is stated as an observation: "the route is missing", "the token is null"
- Bedrock test not applied: "Is there a deeper reason why this exists?"
- Fix targets a symptom rather than the cause of the symptom

**What happens:**
- Fix treats the symptom — route gets re-added but the process that should have added it
  automatically is still broken
- Bug reappears the next time the same process runs

**Correct action:**
Apply bedrock test after every "why" answer.
Keep drilling until: "it was never written / set / configured" with no further why.
The fix target must be the thing that was missing or wrong — not its effect.

---

## APPENDIX C — Changelog

```
VERSION HISTORY
────────────────────────────────────────────────────────────────────
v1.0.0   Initial release