---
name: design-to-figma
description: Converts structured UI/design specifications into faithful, editable Figma designs through the current Figma Plugin API. Use when an AI agent must create, reconstruct, synchronize, or refine Figma nodes while preserving the source design's actual structure, semantics, layout, assets, components, and variables.
---

# Design to Figma

Turn a source design representation into a faithful, editable Figma document.

This skill is the execution layer. It is not a UX recommendation planner and must not invent product or visual decisions that are absent from the source.

The source may be JSON, HTML/CSS, a component specification, a design-token representation, or another structured UI description.

## Operating model

Use this sequence:

`SOURCE → INSPECT → DIFF → RESOLVE → ORDER → BUILD → VALIDATE`

1. Inspect the source and identify the actual node hierarchy.
2. Inspect the existing Figma document when synchronizing or refining.
3. Compute the source-to-Figma delta.
4. Resolve one unambiguous Figma node type for every source node.
5. Order work by dependency: variables/assets → containers → children → properties → bindings → final layout adjustments.
6. Execute deterministic node operations.
7. Validate structure, properties, and editability against the source.

## Non-negotiable fidelity rules

- Figma structure must reflect the source structure.
- Every structurally distinct source element remains a distinct Figma node.
- Do not merge separate controls, fields, icons, images, labels, or metadata into one node.
- Do not split one visual text layer into multiple text nodes merely because its content contains multiple semantic pieces.
- Optional content or user input does not make a required UI element optional.
- Auto Layout is a property of a node; it is never a substitute for creating the node.
- Reuse a correct existing node. Modify only actual deltas.
- Never silently replace an unsupported target node with a visually similar placeholder. Record the limitation or use the closest editable representation.

## Delegation

Keep `SKILL.md` concise. Use the companion references for the normalized design model and current Figma API rules. Use the deterministic bridge script for mechanical construction.

- `references/design-model.md` — input contract and normalization rules.
- `references/figma-plugin-api.md` — current API mapping and constraints.
- `scripts/figma.js` — deterministic executor for normalized design data.

## Build contract

The normalized design model should describe, at minimum:

- `type`
- `name`
- `children`
- parent/order
- geometry or sizing behavior
- layout / Auto Layout
- fills / strokes / effects
- corner radius
- typography
- content/assets
- variables/tokens
- component/instance semantics
- stable bridge identity

When a property has no direct Figma equivalent, preserve the closest editable representation and surface the limitation.

## Existing Figma state

When a target document already exists:

- identify nodes by stable bridge identity and structural context rather than generated IDs;
- compare actual properties before writing;
- preserve hierarchy, geometry, styles, variables, and components that are already correct;
- create only missing nodes;
- change only incorrect properties;
- avoid destructive reconstruction when a local patch is sufficient.

## Execution environment and lifecycle

Generated scripts may be pasted directly into the Figma Developer Console for interactive execution and debugging.

For **Figma Developer Console execution**:

- Do not call `figma.closePlugin()`.
- Do not close or terminate the execution context while asynchronous work is still pending.
- Finish by returning normally or logging completion with `console.log()`.
- Treat the Console as an interactive debugging environment; do not add plugin-lifecycle cleanup intended only for a standalone plugin command.

For a **standalone Figma Plugin command**:

- `figma.closePlugin()` may be used after all work and awaited asynchronous operations have completed, as required by the plugin lifecycle.
- Do not apply the Console rule blindly to a standalone plugin.

The execution target must be inferred from the requested output. When the user asks for a script to paste into the Developer Console, generate a Console-safe script.

## Text

A text node represents a real text-layer boundary in the source. Load its font before setting characters or typography. Preserve font family/style, size, line height, letter spacing, alignment, sizing behavior, and text content where represented.

## Variables

Create or resolve variables before dependent bindings. Prefer current `figma.variables` async lookup methods for reads and pass `Variable` / `VariableCollection` objects to APIs that require objects. Use the official helper methods for paint/effect/layout-grid bindings rather than mutating immutable arrays in place.

## Validation

Before completing a build, verify:

- every required source node exists;
- parent/child relationships and sibling order match;
- distinct source elements were not merged;
- single text layers were not unnecessarily split;
- node types match structural/semantic roles;
- typography and fonts are valid;
- Auto Layout and sizing behavior match the source;
- variables and bindings resolve correctly;
- components and instances use real Figma component relationships;
- vectors/images/assets remain editable and attached to the intended nodes;
- existing correct nodes were preserved;
- no fallback placeholder hides an unsupported or unresolved mapping;
- execution lifecycle matches the target environment;
- Console-targeted scripts do not call `figma.closePlugin()`.

## Source of truth

Use the latest official Figma Developer / Plugin API documentation and official typings as the authority for node types, creation APIs, properties, variables, component properties, deprecations, and migration behavior.

Third-party examples and historical code are secondary references only.
