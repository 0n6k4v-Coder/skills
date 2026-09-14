# Hypothesis Taxonomy

Use these classes to normalize observations.

## Friction

- wrong_initial_approach
- premature_implementation
- missing_context
- repeated_clarification
- environment_confusion
- unnecessary_exploration
- insufficient_verification
- repeated_correction
- premature_interruption
- agent_drift
- tool_failure
- configuration_mismatch
- unclear_task_boundary
- duplicate_guidance

## Strengths

- effective_task_scoping
- strong_initial_context
- staged_workflow
- efficient_tool_use
- productive_delegation
- early_verification
- successful_skill_use
- useful_project_instructions
- fast_recovery_from_failure
- effective_human_intervention

## Attribution classes

Every notable behavior should be attributable to one of:

- user
- primary_agent
- subagent
- tool_or_environment
- project_constraint
- mixed_or_unknown

When attribution is mixed, do not force a single actor without evidence.

## Pattern threshold

A pattern can be labeled `recurring` only when it appears across multiple independent observations. The default threshold is 3 sessions, but the Skill may raise or lower the threshold when the corpus is very small or very large; any deviation must be explained.
