# Design Model

The Design-to-Figma bridge consumes a normalized design tree.

The model is independent of HTML, CSS, React, Vue, Tailwind, or any AI model.

## Node contract

Every distinct target Figma node is represented by one object.

Required:

- `type`
- `name`

Recommended:

- `id` — stable bridge identity, not a Figma node ID
- `children`

Optional properties describe only source facts that matter to the target:

- `x`, `y`, `width`, `height`
- `visible`, `opacity`, `rotation`, `blendMode`
- `fills`, `strokes`, `effects`, `radius`
- `layout`, `sizing`
- `typography`, `content`
- `svg`, `image`
- `variableBindings`
- `componentId`, `componentProperties`

## Node types

Supported normalized types:

- `FRAME`
- `GROUP`
- `RECTANGLE`
- `ELLIPSE`
- `LINE`
- `TEXT`
- `VECTOR`
- `COMPONENT`
- `COMPONENT_SET`
- `INSTANCE`

Resolve the type from actual source structure and semantics.

## Hierarchy

Every structurally distinct source node must appear explicitly in `children`.

Do not encode child nodes in a text string, asset field, SVG, or other opaque payload.

Parent and child nodes are separate nodes whenever the source represents them separately.

## Text boundaries

Atomicity follows the source node structure, not semantic complexity.

A single target text layer remains one `TEXT` node even when its characters contain multiple labels or inline semantic values.

Do not split one text node into multiple nodes unless the source actually contains multiple text nodes or separately styled/positioned text.

## Optional content

Optional content is not optional structure.

Example: a required banner component remains a required node even when its image content is empty or user-supplied later.

## Layout

Normalized layout values should describe intent rather than CSS syntax.

Example:

```json
{
  "layout": {
    "mode": "VERTICAL",
    "gap": 8,
    "padding": {"top": 12, "right": 12, "bottom": 12, "left": 12},
    "primaryAxisAlign": "MIN",
    "counterAxisAlign": "MIN",
    "primaryAxisSizing": "AUTO",
    "counterAxisSizing": "FIXED",
    "wrap": "NO_WRAP"
  }
}
```

Use `GRID` only when the source actually requires Figma Grid Auto Layout behavior.

## Sizing

Supported normalized values:

- `FIXED`
- `HUG`
- `FILL`

`FILL` is contextual Auto Layout sizing and must only be used where valid for the target node and parent.

## Typography

Example:

```json
{"typography":{"family":"Inter","style":"Regular","size":14,"lineHeight":{"unit":"AUTO"},"letterSpacing":{"unit":"PIXELS","value":0},"horizontalAlign":"LEFT","verticalAlign":"TOP","textCase":"ORIGINAL","textDecoration":"NONE","autoResize":"NONE"}}
```

Fonts are loaded by the executor before font-dependent text mutation.

## Paints

Solid paint example:

```json
{"type":"SOLID","color":"#F9F9F9","opacity":1}
```

For variable-backed colors, prefer `variableBindings` rather than duplicating a hard-coded value.

## Variables

Example:

```json
{"variableBindings":{"fills":{"collection":"Primitives","name":"color/background"}}}
```

Variables are resolved before dependent bindings.

## Components

Component:

```json
{"type":"COMPONENT","id":"button-default","name":"Button=Default","children":[]}
```

Component Set:

```json
{"type":"COMPONENT_SET","name":"Button","children":[{"type":"COMPONENT","id":"button-default","name":"Button=Default"},{"type":"COMPONENT","id":"button-disabled","name":"Button=Disabled"}]}
```

Instance:

```json
{"type":"INSTANCE","name":"Delete Button","componentId":"button-default"}
```

An Instance must resolve to a real Figma Component.

## Bridge identity

Use plugin data key: `design-to-figma:id`

The value is the source model's stable ID.

Never use the generated Figma node ID as the source identity.
