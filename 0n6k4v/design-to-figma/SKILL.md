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
- Preserve explicit transparency and no-fill states exactly. Do not invent a fill because a node is a Frame, container, card, input, or Auto Layout wrapper.

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

## Script generation contract

The normalized design model is the source of truth for generated Figma code. Once the model has resolved a property, the generated script must implement that property; it must not reinterpret the design decision into a merely similar-looking API configuration.

### Sizing is an explicit contract

When normalized `sizing` contains `horizontal` or `vertical`, map it directly to the corresponding Figma sizing property:

```text
sizing.horizontal = FIXED → node.layoutSizingHorizontal = "FIXED"
sizing.horizontal = HUG   → node.layoutSizingHorizontal = "HUG"
sizing.horizontal = FILL  → node.layoutSizingHorizontal = "FILL"

sizing.vertical = FIXED → node.layoutSizingVertical = "FIXED"
sizing.vertical = HUG   → node.layoutSizingVertical = "HUG"
sizing.vertical = FILL  → node.layoutSizingVertical = "FILL"
```

These are implementation mappings, not design suggestions. Do not replace an explicit `FILL`, `HUG`, or `FIXED` sizing decision with `layoutAlign`, `layoutGrow`, `primaryAxisSizingMode`, `counterAxisSizingMode`, explicit `resize()`, hard-coded width/height, or another inferred combination merely because it may produce a similar visual result.

Prefer the deterministic executor's `applySizing(node, spec.sizing)` when it is available. Do not bypass the executor's sizing contract with ad-hoc property assignments unless the target API requires a documented exception.

If a requested sizing value is invalid for the target node or parent context, do not silently substitute another sizing mode. Surface the incompatibility and resolve it explicitly before claiming the node is implemented.

### Layout properties are not substitutes for sizing

Keep these concepts separate in generated code:

- `layoutSizingHorizontal` / `layoutSizingVertical` = the node's resolved horizontal/vertical sizing mode.
- `layoutAlign` = the node's alignment behavior within its parent's counter axis.
- `layoutGrow` = growth behavior within the parent's primary axis.
- `primaryAxisSizingMode` / `counterAxisSizingMode` = sizing modes of an Auto Layout container itself.
- `resize()` / explicit width and height = concrete geometry, not a replacement for an explicit normalized sizing mode.

A script may set more than one of these properties when the normalized model requires them, but one property must not be used to erase or silently stand in for another resolved property.

### Auto Layout child positioning

For children governed by Auto Layout, do not manually assign `x`/`y` to simulate spacing, alignment, or distribution that the parent Auto Layout properties already define. Use the normalized parent layout, child sizing, alignment, order, gap, padding, and wrap configuration. Use explicit position only when the source model explicitly represents absolute/manual positioning or the target API requires it for that node.

### Auto Layout wrap, including vertical wrap

Figma Auto Layout supports wrapping in both horizontal and vertical flows. `layoutWrap = "WRAP"` is not limited to horizontal Auto Layout.

Map the normalized wrap model directly:

```text
layout.wrap = NO_WRAP → node.layoutWrap = "NO_WRAP"
layout.wrap = WRAP    → node.layoutWrap = "WRAP"
```

For a **horizontal** flow (`layoutMode = "HORIZONTAL"`):

- children fill left-to-right along the primary axis;
- when the available width is exhausted, children continue on the next row;
- the frame needs a constrained/fixed primary-axis size for wrapping to have a boundary.

For a **vertical** flow (`layoutMode = "VERTICAL"`) with wrapping enabled:

- children fill top-to-bottom along the primary axis;
- when the available height is exhausted, children continue at the top of the next column;
- a constrained/fixed height is therefore normally required to produce multiple columns;
- sibling order remains the source order; vertical wrap is not masonry and must not be modeled as shortest-column packing or gap filling.

Use `counterAxisSpacing` for the distance between wrapped rows/columns when the source explicitly defines it. `itemSpacing` controls spacing between consecutive items along the primary axis. Keep these separate:

```text
layout.itemSpacing        → node.itemSpacing
layout.counterAxisSpacing → node.counterAxisSpacing
layout.wrap               → node.layoutWrap
```

When the source specifies wrapped-track alignment, map `counterAxisAlignContent` directly. Current supported values are `"AUTO"` and `"SPACE_BETWEEN"`. Do not emulate wrapped-track distribution by inserting spacer nodes or manually positioning children.

Vertical wrap is particularly important for fixed-height lists, multi-column option lists, cards/blurb columns, and similar layouts where the intended reading order is top-to-bottom before advancing to the next column.

Do not use the old rotate/flip workaround for vertical wrapping when the target Figma API supports `layoutMode = "VERTICAL"` plus `layoutWrap = "WRAP"`. Preserve the source's real Auto Layout semantics instead of encoding the workaround's transformed geometry.

### Structure before geometry

Generated code must establish the required parent/child hierarchy before applying contextual Auto Layout sizing, alignment, and wrapping. A visual grouping is not sufficient: if the source contains a parent node, the script must create or reuse that parent and append the corresponding child nodes to it.

### No semantic downgrades during code generation

Do not claim a normalized property was implemented when the script only approximates its visual effect. If the generated code cannot represent the resolved property with the available target API, fail visibly or surface the limitation rather than silently changing the model.

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
- Keep all Figma API calls that return Promises inside the same awaited async execution flow.
- Await every async Figma operation before continuing to dependent work or reporting completion.
- Do not start detached async Figma work that can outlive the main execution flow.
- Do not close or terminate the execution context while asynchronous work is still pending.
- Finish by returning normally or logging completion with `console.log()`.
- Treat the Console as an interactive debugging environment; do not add plugin-lifecycle cleanup intended only for a standalone plugin command.

For a **standalone Figma Plugin command**:

- `figma.closePlugin()` may be used after all work and awaited asynchronous operations have completed, as required by the plugin lifecycle.
- Do not apply the Console rule blindly to a standalone plugin.

The execution target must be inferred from the requested output. When the user asks for a script to paste into the Developer Console, generate a Console-safe script.

## Document traversal

- Do not call `figma.loadAllPagesAsync()` as generic initialization.
- Do not add document-wide page loading or traversal merely as a familiar Figma pattern.
- Use the narrowest traversal scope that satisfies the task, such as `figma.currentPage` or a known local subtree.
- Use `figma.loadAllPagesAsync()` only when the implementation explicitly requires multi-page or document-wide traversal and the execution environment supports that behavior.
- Do not infer a need for document-wide traversal merely because lookup or reconciliation is being performed.

## Transparency and fills

- Treat `fills` as an explicit visual property, not an inferred default.
- Target/source **no fill or transparent fill** → `fills = []`.
- Do not synthesize white, near-white, or any default fill when the target does not explicitly define one.
- A node being a Frame, container, card, input, or Auto Layout wrapper does not imply a background fill.
- Preserve an explicitly defined fill exactly, including its paint type, color, opacity, and variable binding where represented.
- Do not add a fill merely to make a structural container visually distinct.
- During synchronization, preserve an existing correct `fills = []` state and do not overwrite it with a fallback paint.

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
- wrap direction matches the source: horizontal wrap advances to a new row, vertical wrap advances to a new column;
- `layoutWrap` is set explicitly when wrapping is part of the normalized model;
- vertical wrap uses `layoutMode = "VERTICAL"` and a height boundary when the source expects columns;
- vertical wrap preserves source order and is not incorrectly implemented as masonry/shortest-column packing;
- `counterAxisSpacing` matches the source's wrapped-track spacing when specified;
- `counterAxisAlignContent` matches the source when specified;
- every explicitly resolved normalized sizing value was actually materialized in the script using the corresponding Figma sizing property or the deterministic executor's canonical sizing helper;
- `FILL` was not silently replaced by `STRETCH`, `layoutGrow`, `AUTO`, explicit dimensions, or another inferred approximation;
- fills and transparency match the source exactly, including explicit no-fill states;
- variables and bindings resolve correctly;
- components and instances use real Figma component relationships;
- vectors/images/assets remain editable and attached to the intended nodes;
- existing correct nodes were preserved;
- no fallback placeholder hides an unsupported or unresolved mapping;
- Auto Layout children are not manually positioned with `x`/`y` when layout properties are the source of the position;
- all async Figma operations were awaited and remain within the active execution flow;
- document-wide traversal was not introduced unless required by the target;
- execution lifecycle matches the target environment;
- Console-targeted scripts do not call `figma.closePlugin()`.

## Source of truth

Use the latest official Figma Developer / Plugin API documentation and official typings as the authority for node types, creation APIs, properties, variables, component properties, deprecations, and migration behavior. In particular, treat `layoutWrap` as supported for both `HORIZONTAL` and `VERTICAL` Auto Layout flows, and use the current API definitions for `counterAxisSpacing` and `counterAxisAlignContent`.

Third-party examples and historical code are secondary references only.
