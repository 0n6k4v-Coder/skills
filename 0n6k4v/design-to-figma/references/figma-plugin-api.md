# Figma Plugin API Reference

This reference captures the API rules used by the deterministic bridge.

The latest official Figma Developer documentation and current plugin typings are the source of truth.

## Node creation

Use the concrete creation API for the resolved node type.

```js
figma.createFrame()
figma.createRectangle()
figma.createEllipse()
figma.createText()
figma.createComponent()
figma.createNodeFromSvg(svg)
```

Groups are created with `figma.group(nodes, parent)`; there is no `createGroup()` API.

Component Sets are created by combining Component nodes with `figma.combineAsVariants(components, parent)`; there is no empty `createComponentSet()` API.

Instances come from a real Component via `component.createInstance()`.

## Lookup

Prefer async lookup APIs in current plugin code:

```js
await figma.getNodeByIdAsync(id)
await figma.variables.getLocalVariablesAsync()
await figma.variables.getLocalVariableCollectionsAsync()
await figma.variables.getVariableByIdAsync(id)
await figma.variables.getVariableCollectionByIdAsync(id)
```

Avoid deprecated synchronous lookup APIs when the current async API is available.

## Parenting

Use `parent.appendChild(child)` or `parent.insertChild(index, child)`. Do not assign `node.parent` directly.

## Auto Layout

Map normalized layout intent to current Figma properties:

```text
layoutMode
layoutSizingHorizontal
layoutSizingVertical
primaryAxisSizingMode
counterAxisSizingMode
primaryAxisAlignItems
counterAxisAlignItems
itemSpacing
paddingTop
paddingRight
paddingBottom
paddingLeft
layoutWrap
counterAxisSpacing
strokesIncludedInLayout
```

Do not use Auto Layout to hide missing nodes.

## Text

Always load the target font before changing font-dependent text properties or characters:

```js
await figma.loadFontAsync({ family: "Inter", style: "Regular" })
```

Relevant properties include `characters`, `fontName`, `fontSize`, `lineHeight`, `letterSpacing`, `textAlignHorizontal`, `textAlignVertical`, `textCase`, `textDecoration`, and `textAutoResize`.

## Paints

Paint arrays are values. Replace the resulting array rather than relying on in-place object mutation.

## Variables

Create variables with a collection object:

```js
figma.variables.createVariable(name, collection, resolvedType)
```

Set mode values with:

```js
variable.setValueForMode(modeId, value)
```

For solid paint bindings use:

```js
figma.variables.setBoundVariableForPaint(paint, "color", variable)
```

Equivalent helpers exist for supported effects and layout grids.

## Components

Create a Component with `figma.createComponent()`.

Create an Instance from the Component with `component.createInstance()`.

Create a Component Set from Component nodes with `figma.combineAsVariants(components, parent)`.

## SVG

For supplied SVG source use `figma.createNodeFromSvg(svg)`. Do not use an SVG asset as a substitute for child nodes that the source explicitly represents as separate Figma nodes.

## Plugin data

Use a stable bridge key:

```js
node.setPluginData("design-to-figma:id", sourceId)
```

Use plugin data for reconciliation, not as a replacement for native Figma node IDs.

## Source of truth

When current Figma docs and older examples conflict, use the current official docs.
