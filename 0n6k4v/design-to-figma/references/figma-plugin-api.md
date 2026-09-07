# Figma Plugin API Reference

This reference is an implementation guide for the deterministic bridge. The latest official Figma Developer documentation and official Plugin API typings are the source of truth.

## Creation

Use the creation API that matches the resolved node type:

- Frame: `figma.createFrame()`
- Rectangle: `figma.createRectangle()`
- Ellipse: `figma.createEllipse()`
- Line: `figma.createLine()`
- Text: `figma.createText()`
- Component: `figma.createComponent()`
- SVG: `figma.createNodeFromSvg(svg)`
- Group: `figma.group(nodes, parent)`

An Instance is created from an actual Component or ComponentSet variant; it is not a generic independently-created scene node.

For component variants, create Component nodes first and use `figma.combineAsVariants(components, parent)` when the source explicitly requires a ComponentSet.

## Parenting

Use:

- `parent.appendChild(child)`
- `parent.insertChild(index, child)`

Do not assign `node.parent` directly. Parenting is performed through the parent node's child APIs.

For Group creation, use `figma.group(nodes, parent)` with the nodes that should belong to the group.

## Lookup

Prefer current asynchronous document and variable lookup APIs where available.

For document nodes:

- `figma.getNodeByIdAsync(id)`

For variables:

- `figma.variables.getLocalVariableCollectionsAsync()`
- `figma.variables.getLocalVariablesAsync()`
- `figma.variables.getVariableCollectionByIdAsync(id)`
- `figma.variables.getVariableByIdAsync(id)`

Do not build new code around deprecated synchronous lookup APIs when an official asynchronous equivalent exists.

## Auto Layout

Current Auto Layout mapping should use Figma's actual node properties rather than CSS property names:

- `layoutMode`
- `layoutSizingHorizontal`
- `layoutSizingVertical`
- `primaryAxisSizingMode`
- `counterAxisSizingMode`
- `primaryAxisAlignItems`
- `counterAxisAlignItems`
- `itemSpacing`
- `paddingTop`
- `paddingRight`
- `paddingBottom`
- `paddingLeft`
- `layoutWrap`
- `counterAxisSpacing`
- `strokesIncludedInLayout`

Do not use the deprecated aggregate padding properties when directional properties are available.

When the target requires wrapping, map it to `layoutWrap` and the corresponding current spacing behavior instead of simulating wrapping with manually positioned children.

`layoutSizingHorizontal` and `layoutSizingVertical` describe sizing behavior in Auto Layout. `FILL` is contextual and should only be assigned where the node is a valid Auto Layout child.

## Text

Create with `figma.createText()`.

Before changing `characters`, `fontName`, `fontSize`, or other font-dependent properties:

`await figma.loadFontAsync({ family, style })`

Preserve actual source text-layer boundaries. A single source text layer stays one TextNode even if its content contains multiple semantic tokens.

Relevant current properties include:

- `characters`
- `fontName`
- `fontSize`
- `lineHeight`
- `letterSpacing`
- `textAlignHorizontal`
- `textAlignVertical`
- `textCase`
- `textDecoration`
- `textAutoResize`

## Paints and fills

Figma paints are immutable values/arrays from the plugin's perspective. Build the desired paint array and assign it back to `node.fills` or `node.strokes`.

For solid colors, construct:

```js
{
  type: "SOLID",
  color: { r, g, b },
  opacity: 1
}
```

For a variable-backed paint, use the official variable paint binding helper and then assign the resulting paint back to the node.

Do not confuse a paint's `color` binding with a node property binding.

## Variables

Create variables with:

`figma.variables.createVariable(name, collection, resolvedType)`

The collection argument is a `VariableCollection` object.

Set mode values with:

`variable.setValueForMode(modeId, value)`

When resolving an existing variable, search the requested local collection and variable name before creating a duplicate.

Use the current async collection/variable lookup methods for discovery.

## Variable binding

Use the binding API appropriate to the property being bound.

For ordinary bindable node properties:

`node.setBoundVariable(field, variable)`

For paint values:

`figma.variables.setBoundVariableForPaint(paint, field, variable)`

For effects and layout grids, use the corresponding official variable binding helper when supported by the target property and current API.

The exact field name and supported property must come from current Figma typings/docs; do not infer that every node property accepts `setBoundVariable()`.

## Effects

Effects are assigned through the node's `effects` property using the current Effect type supported by the API. Preserve the source's effect type and values rather than approximating shadows with unrelated fills.

## Components and instances

A `ComponentNode` is created with `figma.createComponent()`.

A local instance is created from a real component using:

`component.createInstance()`

For variant systems, components can be combined into a ComponentSet with:

`figma.combineAsVariants(components, parent)`

Do not label a Frame as a Component unless the target actually requires a reusable component.

Do not fabricate an Instance without a real component source.

## SVG

When exact SVG source is available, use:

`figma.createNodeFromSvg(svg)`

The imported result should be reconciled with the target structure only when the source explicitly treats the SVG as one vector/asset representation. Do not hide separately required child UI inside SVG source.

## Images

Use the current Figma image APIs and actual source bytes for raster images. Prefer existing image resources when the source already provides them. Do not replace real source imagery with arbitrary placeholders when fidelity requires the supplied asset.

## Plugin data

For reconciliation, store the source's stable identity with:

`node.setPluginData("design-to-figma:id", id)`

Read it with:

`node.getPluginData("design-to-figma:id")`

Plugin data is an implementation detail of the bridge and must not be used as a substitute for Figma node IDs in Figma API calls.

## Reconciliation

For each target node:

1. resolve its stable bridge ID;
2. locate the existing node;
3. verify parent and sibling position;
4. create it if missing;
5. move it if the parent/order is wrong;
6. modify only represented properties that differ;
7. reconcile its children;
8. remove only bridge-owned children explicitly absent from the target.

Never rebuild an entire correct subtree to apply a local change.

## Validation

After mutation, read back the resulting nodes and verify:

- node type
- name
- parent
- child order
- geometry
- Auto Layout properties
- sizing modes
- fills/strokes/effects
- variable bindings
- text content and typography
- component/instance relationships
- asset attachment

The validator should report a mismatch rather than silently accepting an approximate result.
