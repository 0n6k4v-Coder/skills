# Invocation Design

Workflow Insights is intentionally user-invoked.

## Why user-invoked

Retrospective analysis is expensive, historical, and consequential. Automatic discovery can add persistent context cost and can interrupt ordinary development with unsolicited behavioral advice.

## Skill description design

The description should answer two questions:

1. What does the Skill do?
2. In which user requests should it be used?

Keep the description specific enough to route retrospective requests while avoiding vague triggers like `productivity`, `coding`, or `improve`.

## Context-load discipline

Keep `SKILL.md` focused on orchestration and behavioral rules. Move detailed methodology to references and deterministic computation to scripts.

Only load the reference needed for the current stage.

## Cognitive-load discipline

Do not create many manual subcommands that users must memorize. Prefer one entry point with clear operating modes documented in the report or help text.

## Persistent mutation

Analysis and recommendation are separate from application. Never silently modify project guidance or automation.
