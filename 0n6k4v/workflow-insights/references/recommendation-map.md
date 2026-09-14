# Recommendation Map

Choose the smallest effective intervention.

| Observation | Prefer | Avoid first |
|---|---|---|
| Deterministic rule | hook / automated check | prose-only Skill |
| One repeated fact | CLAUDE.md clarification | new Skill |
| Reusable multi-step workflow | Skill | global CLAUDE.md sprawl |
| User decides when to start a workflow | user-invoked Skill | model-invoked router |
| Agent should recognize a recurring situation | model-invoked Skill | requiring manual invocation |
| External system is the bottleneck | MCP/tool integration | giant instruction block |
| Existing instruction already covers it | enforcement or cleanup | duplicate rule |
| One-off issue | local task guidance | persistent Skill |
| Unclear whether intervention helps | experiment first | permanent configuration |

## Intervention ladder

1. Delete
2. Clarify
3. Configure
4. Enforce with a hook/check
5. Create or refine a Skill
6. Add a tool/MCP integration
7. Build a larger workflow

## No-op test

Before recommending any new instruction, ask: **what observable behavior will change because of this sentence or artifact?**

If the answer is unclear, the recommendation is probably a no-op.

## Existing-rule test

Before proposing persistent guidance, inspect the relevant CLAUDE.md, AGENTS.md, referenced instruction files, Skills, and project documentation. Prefer fixing discoverability, enforcement, or contradiction over duplication.
