# Figma Plugin API Reference

This reference captures the API rules used by the deterministic bridge.

The latest official Figma Developer documentation and current plugin typings are the source of truth.

## Node creation

Use the concrete creation API for the resolved node type.

```js
figma.createFrame()
figma.createRectangle()
figma.createEllipse()
figma.createLine()
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

## Async execution

Treat Figma API methods that return Promises as part of the active execution flow.

- Await every async Figma operation before continuing to dependent work or reporting completion.
- Keep async Figma calls inside the same awaited async flow when executing a generated script.
- Do not start detached async Figma work that can outlive the main execution flow.
- For Developer Console scripts, prefer one top-level async IIFE or an equivalent explicitly awaited entry point.
- Do not call `figma.closePlugin()` in Developer Console scripts.
- A successful synchronous `figma` reference does not by itself prove that the plugin execution context remains valid; Figma API access must occur while the active execution context is still alive.

Example:

```js
(async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  const variables = await figma.variables.getLocalVariablesAsync();
  // Continue dependent Figma operations here.
  console.log("Completed");
})();
```

## Document traversal

Use the narrowest traversal scope that satisfies the task.

- Prefer `figma.currentPage` or a known local subtree when the target is limited to the active page or local hierarchy.
- Do not call `figma.loadAllPagesAsync()` as generic initialization.
- Do not add document-wide traversal merely because a lookup or reconciliation operation is being performed.
- Use `figma.loadAllPagesAsync()` only when the implementation explicitly requires multi-page or document-wide traversal and the execution environment supports that behavior.
- Do not assume that document-wide traversal is required when local traversal is sufficient.

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

Apply contextual sizing only after the node has the required Auto Layout parent/context.

## Text

Always load the target font before changing font-dependent text properties or characters:

```js
await figma.loadFontAsync({ family: "Inter", style: "Regular" })
```

Relevant properties include `characters`, `fontName`, `fontSize`, `lineHeight`, `letterSpacing`, `textAlignHorizontal`, `textAlignVertical`, `textCase`, `textDecoration`, and `textAutoResize`.

Keep the font load in the same awaited execution flow as the text mutation.

## Paints

Paint arrays are values. Replace the resulting array rather than relying on in-place object mutation.

For variable-bound paints, use the paint-specific binding helper rather than a generic node binding:

```js
figma.variables.setBoundVariableForPaint(paint, "color", variable)
```

## Variables

Create variables with a collection object:

```js
figma.variables.createVariable(name, collection, resolvedType)
```

Set mode values with:

```js
variable.setValueForMode(modeId, value)
```

For local variable reads, prefer the current async APIs:

```js
await figma.variables.getLocalVariableCollectionsAsync()
await figma.variables.getLocalVariablesAsync()
```

Create or resolve variables before dependent bindings.

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
