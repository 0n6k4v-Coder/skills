# Report Schema

## Markdown report

Required sections:

1. Scope
2. What the evidence says
3. Recurring strengths
4. Recurring friction
5. Hypotheses
6. Highest-leverage changes
7. Experiments
8. What not to change
9. Appendix

## JSON top-level object

```json
{
  "schema_version": "1.0",
  "generated_at": "ISO-8601",
  "scope": {},
  "metrics": {},
  "findings": [],
  "hypotheses": [],
  "recommendations": [],
  "experiments": [],
  "limitations": []
}
```

## Finding

```json
{
  "id": "finding-001",
  "type": "strength|friction",
  "name": "premature_implementation",
  "observed_count": 7,
  "population": 19,
  "confidence": "medium",
  "supporting_evidence": [],
  "counterevidence": [],
  "attribution": "user|primary_agent|subagent|tool_or_environment|mixed_or_unknown"
}
```

## Recommendation

```json
{
  "id": "rec-001",
  "target": "claude_md|skill|hook|mcp|workflow|none",
  "action": "...",
  "reason": "...",
  "expected_behavior_change": "...",
  "confidence": "high|medium|low",
  "experiment_id": "exp-001"
}
```

The JSON is a durable machine-readable artifact. The Markdown is the human-facing summary.
