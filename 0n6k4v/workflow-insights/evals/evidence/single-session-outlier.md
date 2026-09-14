# Evidence eval: single-session outlier

Fixture concept: 1 unusual session contains repeated retries, while 49 ordinary sessions do not.

Expected:

- report the outlier as an observation
- do not label it a recurring user pattern
- confidence should remain low for population-level claims
- include the outlier only as a possible lead for follow-up
