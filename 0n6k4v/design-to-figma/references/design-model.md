# Design Model

The bridge consumes a normalized design tree. Keep this representation independent of HTML, React, Vue, CSS, Tailwind, or any AI model.

## Node contract

Each target Figma node is represented by one object:

```json
{
  "id": "screen",
  "type": "FRAME",
  "name": "Screen",
  "children": []
}
```

`id` is a stable bridge identity, not a Figma node ID.

## Supported types

The executor recognizes the following normalized types:

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

Use a type only when the source actually calls for that node semantics.

## Common fields

Optional fields may include:

- `id`
- `type`
- `name`
- `children`
- `visible`
- `opacity`
- `x`
- `y`
- `width`
- `height`
- `sizing`
- `layout`
- `fills`
- `strokes`
- `strokeWeight`
- `radius`
- `effects`
- `typography`
- `content`
- `svg`
- `image`
- `variableBindings`
- `component`

Do not put child elements into `content`, `svg`, or an asset field. Children belong in `children` when they are distinct source nodes.

## Layout

Use normalized values that map directly to current Figma Auto Layout concepts:

```json
{
  "layout": {
    "mode": "VERTICAL",
    "gap": 8,
    "padding": {
      "top": 12,
      "right": 12,
      "bottom": 12,
      "left": 12
    },
    "primaryAxisAlign": "MIN",
    "counterAxisAlign": "MIN",
    "primaryAxisSizing": "AUTO",
    "counterAxisSizing": "FIXED",
    "wrap": "NO_WRAP"
  }
}
```

Supported normalized layout modes:

- `NONE`
- `HORIZONTAL`
- `VERTICAL`
- `GRID`

Do not translate CSS layout names blindly. Resolve the behavior to the corresponding Figma property before execution.

## Sizing

Use:

- `FIXED`
- `HUG`
- `FILL`

Only use sizing values valid for the node and its parent context. In particular, `FILL` is an Auto Layout child sizing behavior, not a generic width keyword.

## Typography

Example:

```json
{
  "typography": {
    "family": "Inter",
    "style": "Regular",
    "size": 14,
    "lineHeight": { "unit": "AUTO" },
    "letterSpacing": { "unit": "PIXELS", "value": 0 },
    "horizontalAlign": "LEFT",
    "verticalAlign": "TOP"
  }
}
```

Font-dependent text writes require font loading before mutation.

## Paints

Represent a solid paint as:

```json
{
  "type": "SOLID",
  "color": "#F9F9F9",
  "opacity": 1
}
```

The executor may support additional paint representations as it evolves. When a variable binding is supplied, prefer the variable binding over duplicating the token value as a hard-coded paint.

## Variables

Use:

```json
{
  "variableBindings": {
    "fills": {
      "collection": "salacinefy",
      "name": "surface/subtle"
    }
  }
}
```

The collection/name pair is the logical reference. Resolve it to a real local `Variable` object before binding.

## Assets

For SVG source, use:

```json
{
  "type": "VECTOR",
  "svg": "<svg ...>...</svg>"
}
```

For raster content, represent the source image separately from the node's paint configuration so the executor can attach image data without pretending that an image is a child text/vector node.

## Components and instances

A reusable component is represented explicitly:

```json
{
  "type": "COMPONENT",
  "name": "Button"
}
```

An instance must reference a real component:

```json
{
  "type": "INSTANCE",
  "name": "DeleteButton",
  "componentId": "button-component-id"
}
```

A component set is a real Figma component set containing component children. Do not encode a component set as a generic frame.

## Reconciliation identity

Store the stable source identity as plugin data under:

`design-to-figma:id`

Figma's own node ID is not the source identity.

When an update supplies the same bridge ID, reconcile that node instead of creating a duplicate.
