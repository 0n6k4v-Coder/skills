---
name: design-to-figma
description: Converts structured UI/design specifications into faithful, editable Figma designs through the current Figma Plugin API. Use when an AI agent must inspect, plan, generate, execute, synchronize, or validate Figma nodes while preserving the source design's actual structure, semantics, layout, assets, components, and variables.
---

# Design to Figma

Turn a source design representation into a faithful, editable Figma document.

This skill is the **execution layer**. It can be used by Gemini, Claude, GPT, Codex, or another AI. It is not a UX recommendation planner and must not invent product or visual decisions that are absent from the source.

## Primary workflow

For a planning-to-execution workflow, produce both artifacts from the same analysis:

`SOURCE → INSPECT → DIFF → PLAN → DESIGN MODEL → SCRIPT → EXECUTE → CROSS-CHECK`

The two primary outputs are:

1. **Implementation Plan** — human-readable atomic specification used as the contract and post-execution checklist.
2. **Executable Figma Script** — runnable code that implements the same work in Figma.

The Plan and Script must describe the same target state. Neither is allowed to introduce work absent from the other.

## Planning rules

Preserve the existing planning behavior:

- Every distinct canvas/Figma node in the TARGET is one independent implementation step.
- Parent and child nodes are separate steps.
- Every missing target node has its own step.
- Atomize according to the TARGET's actual node structure, not the semantic complexity of its content.
- Do not merge structurally distinct target elements into one node.
- Do not split a single target text node unless the target clearly represents separate text nodes.
- Semantic role must match the actual node.
- Auto Layout is a property, never a substitute for node creation.
- Missing Variable is its own step and must precede dependent nodes.
- `MISSING → Create`.
- `INCORRECT → Modify only actual property deltas`.
- `COMPLETE → No step`.
- Required elements always exist. Optionality applies to their content, data, or user usage.
- Every step contains exactly one item with one resolved Node Type.
- Do not recreate correct nodes, group unrelated work, or leave required work implicit.

The planning artifact must contain:

- `Current State`
- `Target State Overview`
- `Implementation Steps`
- `Variable` details
- `Element` details
- `Validation`

## Step IDs and traceability

Assign every Implementation Step a stable ID such as `S001`, `S002`, `S003`.

Every generated design node that corresponds to a plan step should carry that same source identity in the normalized model and, when executing in Figma, in plugin data:

`design-to-figma:plan-step`

This lets the Plan act as a cross-check contract after execution.

Use a separate stable design identity for the node itself:

`design-to-figma:id`

A plan-step ID and a design-node ID are related but are not the same identifier.

## Design Model

Convert the planning result into the normalized design model defined by:

`references/design-model.md`

The Design Model is the machine-readable bridge between planning and execution.

It must preserve:

- node hierarchy;
- one object per distinct target node;
- sibling order;
- node type;
- geometry/sizing;
- layout;
- typography;
- paints/strokes/effects;
- assets;
- variables;
- component relationships;
- stable node identity;
- corresponding plan-step ID when applicable.

Do not use the Plan text itself as the runtime data structure if a normalized Design Model can represent the same information deterministically.

## Executable Script

Generate a Figma Plugin script that can be executed without requiring the AI to remain present.

The script must:

1. contain or import the required normalized Design Model;
2. use the `design-to-figma` execution contract;
3. resolve dependencies before dependent operations;
4. create missing nodes;
5. reuse correct existing nodes;
6. modify only actual deltas;
7. preserve hierarchy and sibling order;
8. apply required properties;
9. apply variable bindings after variables are available;
10. create real Components/Instances and Component Sets when required;
11. load fonts before text mutations;
12. validate the resulting document;
13. report enough information to map execution results back to Plan Step IDs.

For a standalone generated script, prefer this structure:

```js
const DESIGN_MODEL = /* generated normalized design model */;

async function run() {
  // deterministic execution
}

run().catch((error) => {
  console.error(error);
  figma.notify(`Design-to-Figma failed: ${error.message}`);
});
```

When the repository bridge script `scripts/figma.js` is available to the execution environment, reuse its deterministic helpers rather than duplicating them. When the execution environment cannot import repository files, generate a self-contained equivalent implementation using the same contract.

## Plan ↔ Script consistency

The Script is generated **from the same Plan / Design Model**, not from a second independent interpretation.

For every plan step:

- the target node or variable must be present in the Design Model;
- the Script must contain the corresponding operation;
- the operation must preserve the step's Node Type;
- the operation must use the step's parent and ordering information;
- the operation must implement only the specified property changes.

For every Script-created target node:

- there must be a corresponding Design Model node;
- there must be a corresponding Plan Step unless the operation is purely mechanical and does not represent a target change;
- there must be a stable `design-to-figma:id`;
- there should be a `design-to-figma:plan-step` when a Plan Step exists.

Never let the Script silently add an unplanned UI element.

## Cross-check after execution

After running the Script, compare the resulting Figma document against the Plan and Design Model.

Verify:

- every Plan Step is satisfied;
- every required target node exists;
- every plan node has the correct Node Type;
- parent-child relationships match;
- sibling order matches;
- no separate target nodes were merged;
- no single target TextNode was unnecessarily split;
- required elements exist even when content is optional;
- Variables exist and bindings resolve;
- existing correct nodes were preserved;
- modifications contain only intended deltas;
- no unplanned target node was created;
- no target node was left without a corresponding execution operation.

A useful result format is:

```text
S001  PASS
S002  PASS
S003  PASS
S004  FAIL — expected TEXT, found FRAME
```

The Plan is therefore both the implementation specification and the audit checklist.

## Fidelity rules

- Figma structure must reflect the source structure.
- Every structurally distinct source element remains a distinct Figma node.
- Do not merge separate controls, fields, icons, images, labels, or metadata into one node.
- Do not split one visual text layer into multiple text nodes merely because its content contains multiple semantic pieces.
- Optional content or user input does not make a required UI element optional.
- Auto Layout is a property of a node; it is never a substitute for creating the node.
- Reuse a correct existing node. Modify only actual deltas.
- Never silently replace an unsupported target node with a visually similar placeholder. Record the limitation or use the closest editable representation.

## Delegation

Keep `SKILL.md` focused on workflow and rules. Use companion references for the normalized design model and current Figma API rules. Use `scripts/figma.js` for deterministic execution where available.

- `references/design-model.md` — input/output contract and normalization rules.
- `references/figma-plugin-api.md` — current API mapping and constraints.
- `scripts/figma.js` — deterministic executor for normalized design data.

## Figma API

Use the current Figma Plugin API and current official typings.

Use direct node creation APIs corresponding to the actual target type. Groups use `figma.group()`, Component Sets use `figma.combineAsVariants()` with real Components, Instances come from real Components, SVG assets may use `figma.createNodeFromSvg()`, and current async lookup APIs should be preferred where applicable. citeturn264046search1turn264046search3

For variables, resolve actual `VariableCollection` / `Variable` objects and use the current variable binding helpers. Paint, effect, and layout-grid bindings operate through their corresponding helpers and immutable arrays. citeturn264046search0turn264046search7

For text, load fonts before changing properties that can affect text rendering, including characters, font size, line height, letter spacing, and related text properties. citeturn298971search0turn298971search1turn298971search11

Do not use deprecated ID-passing patterns when the current API expects object references. Current `setBoundVariable()` expects a `Variable` object or null rather than a variable ID. citeturn264046search6

## Existing Figma state

When a target document already exists:

- identify nodes by stable bridge identity and structural context rather than generated IDs;
- compare actual properties before writing;
- preserve hierarchy, geometry, styles, variables, and components that are already correct;
- create only missing nodes;
- change only incorrect properties;
- avoid destructive reconstruction when a local patch is sufficient.

## Validation

Before completing execution, validate both the artifact and the cross-check contract.

Verify:

- every required source node exists;
- every Plan Step has a corresponding result;
- parent/child relationships and sibling order match;
- distinct source elements were not merged;
- single text layers were not unnecessarily split;
- node types match structural/semantic roles;
- typography and fonts are valid;
- Auto Layout and sizing behavior match the source;
- variables and bindings resolve correctly;
- components and instances use real Figma component relationships;
- vectors/images/assets remain editable and attached to intended nodes;
- existing correct nodes were preserved;
- no fallback placeholder hides unsupported or unresolved mapping;
- the final Figma result does not contain unplanned target UI.

## Source of truth

The source design and target-state structure are authoritative for what should exist.

The normalized Design Model is authoritative for execution.

The Implementation Plan is authoritative for human-readable intent and cross-checking.

The latest official Figma Developer / Plugin API documentation and official typings are authoritative for Figma API behavior, supported properties, variables, component properties, and deprecations. citeturn298971search4turn264046search2
