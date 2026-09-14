# Sampling Strategy

The purpose of sampling is representativeness, not convenience.

## Default stratification

When the corpus is large, sample across:

- time periods
- projects
- session sizes
- session outcomes
- tool-heavy vs tool-light sessions
- agent/subagent participation

Do not sample only the newest, longest, or easiest-to-parse sessions.

## Recommended default

For corpora above 200 eligible sessions, target roughly 60–120 analyzed sessions when practical. Balance strata instead of taking the first N records.

For smaller corpora, analyze the whole eligible set when cost is reasonable.

## Subagent attribution

Track agent/subagent sessions separately. When subagent records cannot be confidently linked to the primary user's behavior, exclude them from user-behavior claims and report the limitation.

## Cross-project analysis

Global reports may identify cross-project patterns. Project-specific claims require project-specific evidence.

Never generalize a project-local behavior into a global user trait without support from additional projects.

## Sparse-data rule

If fewer than 10 relevant sessions exist for a claim, default to `Low` confidence unless the evidence is direct and unambiguous.

## Outlier rule

Investigate unusually long, unusually successful, or unusually problematic sessions separately. An outlier may be valuable evidence, but it should not silently redefine the population.
