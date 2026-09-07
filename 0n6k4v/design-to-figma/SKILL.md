---
name: design-to-figma
description: Converts structured UI/design specifications or source code into accurate Figma designs through the Figma Plugin API. Use when an AI agent must create, reconstruct, synchronize, or refine Figma nodes from a design representation. Prefer direct Figma node operations and verified properties over visual approximation, and preserve the source design's actual structure and semantics.
---

# Design to Figma

## Purpose

Turn a source design representation into a faithful, editable Figma document.

The source may be HTML/CSS, JSON, a component specification, or another structured representation of an existing UI. The goal is not to invent a new design. The goal is to reproduce the source design in Figma with the smallest necessary set of node operations while preserving visual and structural fidelity.

## Core workflow

1. Inspect the source representation and identify its actual visual and structural hierarchy.
2. Inspect the target Figma document, when one exists, before creating or modifying anything.
3. Compute the source-to-Figma delta.
4. Resolve the Figma node type for each source element from its semantic and visual role.
5. Create or modify nodes in dependency order: resources and variables → containers → children → visual/content properties → bindings → final layout adjustments.
6. Validate the resulting Figma tree against the source representation.

## Fidelity rules

- Preserve the source hierarchy. Do not flatten structurally distinct elements merely because they can be rendered by one node.
- Do not invent child nodes that are not visually or structurally present in the source.
- Do not merge distinct source elements into one Figma node.
- Text that is visually one text layer should remain one TextNode even when its string contains multiple inline pieces.
- Separate controls, fields, icons, images, labels, and metadata remain separate only when they are separate in the source.
- Match semantic roles to appropriate Figma node types. An interactive button should not be represented as a decorative vector merely because its visible content is an icon.
- A required UI container must exist even when its content is empty or optional for the user.
- Optionality describes content, data, or usage; it does not make a required UI element optional.
- Reuse an existing node when it is already correct. Modify only properties that differ.
- Never use Auto Layout as a replacement for node creation.

## Figma implementation

Use the current Figma Plugin API and its current typings. Do not rely on deprecated properties or ID-passing patterns when the current API requires object references.

### Node creation

Use the node type that corresponds to the actual target structure, then set the properties needed for faithful rendering.

Common mappings include:

- Frame → `figma.createFrame()`
- Component → `figma.createComponent()`
- Instance → create from a real component with `createInstance()`
- Rectangle → `figma.createRectangle()`
- Ellipse → `figma.createEllipse()`
- Line → `figma.createLine()`
- Text → `figma.createText()`
- Vector/SVG artwork → an appropriate vector node or `figma.createNodeFromSvg()` when SVG is the source representation
- Image content → an appropriate image-capable paint/fill on the target node

Append each created child to its resolved parent explicitly. Do not encode hidden children inside a content string.

### Auto Layout

When the source requires Auto Layout, map it to the current Figma properties rather than CSS names alone.

Use current properties such as:

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

Prefer the current directional padding properties (`paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`) rather than deprecated `horizontalPadding` or `verticalPadding`.

### Text

Before creating or modifying text, load the required font with `figma.loadFontAsync()`.

Preserve the source's actual text-layer boundaries, characters, font family, style, size, line height, letter spacing, alignment, and sizing behavior where those values are represented by the source.

Do not split a single visual text layer merely because it contains multiple semantic tokens. Split text only when the source actually represents separate text nodes or separately styled/positioned content.

### Variables

When the source specifies design tokens or variables:

1. Resolve the required collection.
2. Reuse an existing variable when it matches.
3. Create a missing variable before creating dependent bindings.
4. Set the appropriate mode values.
5. Bind the variable to the supported node property.

Use the current `figma.variables` API. Prefer `VariableCollection` and `Variable` objects when calling APIs that require object references.

For paint bindings, use the current variable paint helpers rather than assuming paint arrays are mutable in place.

### Existing design state

When modifying an existing Figma document:

- Identify nodes by stable context and name, not by assumptions about generated IDs.
- Compare actual properties before changing them.
- Preserve correct geometry, styles, variables, and hierarchy.
- Avoid recreating correct nodes.
- If a node is missing, create it at the correct hierarchy position.
- If a node is incorrect, change only the properties required by the source.

## Accuracy over approximation

Prefer deterministic property mapping over screenshot-style approximation.

For each source element, resolve:

- node type
- parent
- order
- dimensions and sizing behavior
- position/constraints when applicable
- layout behavior
- spacing and padding
- fills and strokes
- corner radius
- effects
- typography
- variable/style bindings
- content/assets
- component/instance semantics
- interaction-related properties represented by Figma

If a source property has no direct Figma equivalent, preserve the closest editable representation and record the limitation rather than silently dropping it.

## Validation

After construction, validate both structure and appearance.

Check:

- Every required source element has a corresponding Figma node.
- No distinct source element was merged unintentionally.
- No invented child node was introduced without structural or visual justification.
- Parent-child relationships and sibling order match the source.
- Node types match semantic roles.
- Text boundaries and fonts are correct.
- Auto Layout behavior matches the source.
- Variable bindings and mode values are correct.
- Images, vectors, and other assets are attached to the intended nodes.
- Existing correct nodes were preserved.
- The final result remains editable rather than being reduced to a screenshot-like surface.

## API source of truth

Use the latest official Figma Plugin API documentation and official Figma Developer documentation as the authority for API names, supported node properties, variable APIs, deprecations, and migration requirements.

Do not treat third-party tutorials, generated typings, or historical examples as authoritative when they conflict with current Figma documentation.
