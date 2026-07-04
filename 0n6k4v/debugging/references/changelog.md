# DEBUG SKILL — Changelog

v1.4.0   LITE/FULL tiering + structured fix-proposal template
           • Added Gate 0B: classify LITE (≤2 files, one layer, reproducible,
             low-stakes) vs FULL right after confirming it's a bug — decides
             ceremony level, never touches evidence discipline
           • Added a LITE GATE REPORT format (one line: FOUND → NEXT) alongside
             the existing FULL block; added "LITE:" condensed variants to
             Gates 3/4, 6, 6B, 6C, 7, 9, 10 — same checks, less paperwork
           • Clarified 5-Why: bedrock reached in 1-2 whys is a correctly-run
             drill, not a shortened one — 5 is a ceiling, not a quota
           • Tightened the bilingual rule to name exactly the 3 things that
             need Thai+English (Gate 8B root cause, Gate 9 proposal, AUDIT
             MODE report) — everything else stays single-language
           • Added `references/fix-proposal-template.md`: structured
             multi-service/multi-file fix-proposal format (services table →
             files-and-layers table per service → unified-diff code changes
             with inline notes) for Gate 9A on large fixes
           • Motivated by external review feedback that the merged skill had
             become too heavy for everyday bugs — this keeps the full rigor
             available for hard/cross-layer/production bugs while making the
             common case fast

v1.3.0   Live-tooling + approval-gate update
           • Gate 2 now prefers Chrome DevTools MCP (Network/Console/DOM inspection
             on a real browser) over Playwright, falling back to a manual script
           • Added Gate 2C: escalate to the `use-railway` skill for infra/deploy
             evidence (logs, service status, env vars) when live-test + Docker
             evidence is still insufficient
           • Added GLOBAL RULES: bilingual (Thai + English) root-cause and
             fix-proposal reporting; never modify code before explicit approval;
             never run `git restore`/`checkout --`/`reset --hard` without asking
             in the moment, even mid-fix
           • Gate 9 renamed to Propose → Approve → Apply → Fix Checkpoint, with
             an explicit stop-and-wait before any file is touched

v1.2.0   Merge release
           • Merged `codebase-audit` and `comprehensive-audit-debugging` skills into this one
           • Added AUDIT MODE (file-discovery → forensic depth tiers) for pure
             investigation/tracing requests that don't need a fix
           • Added MODE SELECTION section to route FIX vs AUDIT before Gate 0
           • Added Quick-Route symptom shortcut table and Live/Temporal bug
             classification (folded in at Gate 5)
           • Added `references/patterns.md`: root-cause pattern library (A–E),
             common gotchas, and keyword banks by domain — previously duplicated
             across the three source skills
           • Dropped the "continuous improvement / usage log" meta-process from
             `comprehensive-audit-debugging` — no debugging value, pure overhead

           • Gates 0–10 defined
           • Evidence Standard (Laws 1–3)
           • Quick Reference cheat sheet
           • Partial example walkthrough (auth redirect bug, Gates 0–8)

v1.1.0   Completion release
           • Example walkthrough completed: Gates 8–10 with full output blocks
             (DIAGNOSTIC RESULT, 5-Why, Provenance, Perimeter, Change Log,
              Checkpoint, Integration Verification, Scope Check)
           • Added APPENDIX A: Glossary
               – 14 core concept definitions
               – Status symbol reference table
               – Gate reference table (all 20 gates/sub-gates)
           • Added APPENDIX B: Anti-Patterns Catalog
               – P1  Piecemeal Fix
               – P2  Premature Close
               – P3  Shotgun Fix
               – P4  Code Reading as Confirmation
               – P5  Tunnel Vision / Same-Layer Fixation
               – P6  Unverified "Everywhere" Claim
               – P7  Mid-Session Pivot
               – P8  User Confidence as Evidence
               – P9  Hypothesis Skipping
               – P10 Incomplete 5-Why
           • Added APPENDIX C: Changelog (this section)
           • Merged into single complete SKILL.md file

────────────────────────────────────────────────────────────────────
PLANNED (v1.2.0)
  • Language-specific command variants
      (Python/pip vs Node/npm vs Go/cargo vs Ruby/bundler)
  • Kubernetes / remote environment variant for Gate 1
  • Template library: pre-filled matrices for common bug archetypes
      – Auth redirect (covered in example)
      – Race condition / timing bug
      – CORS / preflight failure
      – Stale cache (CDN or browser)
      – N+1 query / performance regression
  • Playwright PATH A: worked examples with screenshot annotations
  • Gate 8 diagnostic recipes by layer
      (what to log, where to look, cheapest confirmation method per layer)
────────────────────────────────────────────────────────────────────
```