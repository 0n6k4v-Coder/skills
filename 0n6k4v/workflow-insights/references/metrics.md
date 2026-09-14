# Metrics

Prefer deterministic metrics over model-estimated metrics.

## Core metrics

- `sessions_total`
- `sessions_eligible`
- `sessions_analyzed`
- `active_days`
- `user_messages`
- `assistant_messages`
- `duration_seconds`
- `tool_calls`
- `tool_errors`
- `interruptions`
- `files_touched`
- `lines_added`
- `lines_removed`
- `commits`
- `pushes`
- `agent_sessions`
- `mcp_events`
- `languages`

## Derived metrics

- `messages_per_session`
- `tool_errors_per_session`
- `rework_rate`
- `verification_before_edit_rate`
- `interruption_rate`
- `agent_share_of_activity`
- `project_share_of_activity`
- `median_session_duration`
- `p90_session_duration`

Derived metrics must document their numerator, denominator, and exclusion rules.

## Metric rules

1. Keep numerator and denominator explicit.
2. State excluded sessions.
3. Do not mix subagent activity into user-behavior metrics without an attribution rule.
4. Prefer medians/quantiles to averages for highly skewed session data.
5. Never infer causality from a metric alone.

## Example

`rework_rate = sessions_with_rework / eligible_sessions_in_scope`

Define `rework` before reporting the value.
