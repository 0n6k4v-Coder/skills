# Regression eval: report schema

The generated JSON must contain:

- schema_version
- generated_at
- scope
- metrics
- findings
- hypotheses
- recommendations
- experiments
- limitations

`schema_version` must remain compatible with `references/report-schema.md` unless explicitly bumped.
