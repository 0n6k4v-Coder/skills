# Regression eval: confidence

A new implementation must not silently increase confidence when:

- the sample shrinks
- attribution becomes less certain
- contradictory evidence increases
- project scope becomes narrower

Confidence should move conservatively with evidence quality.
