# Evidence Model

## Four layers

### Observed fact
Directly measured or directly visible in session evidence.

Example: `12 of 40 sampled sessions contained a second attempt after an initial implementation.`

### Pattern
A repeated observation across independent sessions.

Example: `The second-attempt pattern appears in debugging, deployment, and refactoring work.`

### Hypothesis
An interpretation that explains the pattern.

Example: `The user-agent loop may be entering implementation before failure boundaries are explicit.`

### Recommendation
A proposed intervention that should be tested.

Example: `Add a short diagnosis gate to debugging workflows and compare rework rate.`

## Confidence

Use four levels:

- **High** — strong repeated evidence across contexts with little contradictory evidence.
- **Medium** — repeated evidence, but limited scope, sampling, or meaningful counterevidence.
- **Low** — plausible signal from sparse or narrow evidence.
- **Unknown** — insufficient evidence to justify interpretation.

Confidence is about the claim, not the model's writing quality.

## Counterevidence

For each major hypothesis, actively search for sessions that contradict it. Record both support and contradiction.

## Language rules

Prefer:

- `observed`
- `appears in`
- `suggests`
- `consistent with`
- `evidence is limited`

Avoid:

- `you always`
- `you never`
- `you are bad at`
- `Claude knows that`
- `this proves`

unless the evidence genuinely supports such absolutes.
