---
name: workflow-insights
description: Analyze Claude Code session history to identify evidence-backed workflow patterns, recurring friction, successful interaction strategies, and concrete improvements to the human-agent system. Use when the user explicitly requests a retrospective, workflow analysis, Claude Code usage analysis, session analysis, or /workflow-insights. Do not use for ordinary coding tasks or one-off debugging unless the user explicitly asks for a retrospective.
---

# Workflow Insights

Turn Claude Code history into evidence-backed hypotheses about how the user and agent work together.

## Core principle

Treat session history as evidence, not unquestionable truth.

Separate important conclusions into:

1. **Observed fact** — directly supported by session data.
2. **Pattern** — appears across multiple independent sessions.
3. **Hypothesis** — plausible interpretation of the pattern.
4. **Recommendation** — proposed workflow or system change.

Never present a hypothesis as an observed fact.

## Workflow

Follow this sequence.

### 1. Establish scope

Determine the available session corpus before interpreting it. Report:

- sessions discovered and eligible
- date range
- projects represented
- sampling strategy and sample size
- presence of subagent/agent sessions
- whether analysis is global or project-scoped
- known data limitations

Do not imply complete coverage when sampling occurred.

### 2. Build the quantitative baseline

Prefer deterministic calculations for sessions, active days, user/assistant messages, duration, tool calls, tool errors, interruptions, edits, files touched, languages, commits, pushes, agents/subagents, MCP usage, and response-time distributions.

### 3. Build a representative sample

Prefer stratification across project, time, session size, session type, success/failure characteristics, and tool/agent usage. Avoid allowing one unusual session to dominate the narrative.

### 4. Analyze individual sessions

Extract underlying goal, goal category, session type, outcome, apparent satisfaction, apparent helpfulness, friction events, successful interventions, notable workflow behavior, and concise evidence summary.

### 5. Aggregate cautiously

A recurring pattern requires multiple independent observations. Distinguish isolated events, repeated events, recurring patterns, and high-confidence patterns.

### 6. Separate human behavior from agent behavior

Distinguish user behavior, primary-agent behavior, subagent behavior, tool/environment effects, and project-specific constraints. Do not attribute subagent activity to the user without evidence.

### 7. Detect friction

Look for recurring classes such as wrong initial approach, missing context, repeated clarification, environment confusion, unnecessary exploration, premature implementation, insufficient verification, repeated correction, excessive interruption, tool failure, agent drift, unclear task boundaries, and configuration mismatch.

### 8. Identify successful patterns

Look for efficient task completion, effective context, strong tool usage, high-leverage Skills, helpful CLAUDE.md rules, staged workflows, and early verification.

### 9. Generate hypotheses

For each major hypothesis provide: hypothesis, supporting evidence, contradictory evidence if any, confidence, affected projects, and a recommended next test. Prefer falsifiable hypotheses.

### 10. Recommend the smallest effective intervention

Prefer, in order:

1. delete unnecessary process
2. clarify existing instructions
3. add a focused CLAUDE.md rule
4. add or refine a Skill
5. add a hook or automated check
6. add tooling/MCP
7. introduce a larger workflow

Before recommending CLAUDE.md changes, check CLAUDE.md, AGENTS.md, referenced instruction files, existing Skills, and relevant project documentation for equivalent guidance.

Do not recommend a Skill when a one-line instruction or deterministic automated check would solve the problem.

### 11. Produce the retrospective

Use this structure:

## Scope
Corpus, dates, projects, sampling, limitations.

## What the evidence says
Important quantitative observations.

## Recurring strengths
Successful behaviors with evidence.

## Recurring friction
Repeated problems with evidence.

## Hypotheses
Interpretations with confidence and counterevidence.

## Highest-leverage changes
The smallest interventions likely to matter.

## Experiments
Concrete changes to test next.

## What not to change
Low-confidence or redundant recommendations.

## Appendix
Detailed metrics and sampled evidence when useful.

## Quality rules

Never:

- fabricate metrics
- imply complete coverage when sampling occurred
- treat one session as a population-level pattern
- attribute subagent actions to the user without evidence
- recommend duplicating existing project guidance
- optimize for report length
- confuse correlation with causation
- claim a workflow improvement without a before/after comparison

Prefer:

- fewer stronger findings
- explicit uncertainty
- representative evidence
- reproducible metrics
- concrete interventions
- testable experiments
- small changes
- human-controlled decisions

## Output objective

The goal is not to produce an impressive report. The goal is to improve the human-agent system measurably.

Every major recommendation should answer:

**What should change, why, and how will we know whether it helped?**

## References

Load only the reference needed for the current stage:

- `references/methodology.md` — overall operating model
- `references/evidence-model.md` — fact/pattern/hypothesis confidence model
- `references/metrics.md` — deterministic metric definitions
- `references/hypothesis-taxonomy.md` — recurring friction and strength classes
- `references/recommendation-map.md` — intervention selection
- `references/sampling-strategy.md` — representative sampling and attribution
- `references/invocation-design.md` — invocation and context-load guidance
- `references/report-schema.md` — Markdown/JSON report contract
