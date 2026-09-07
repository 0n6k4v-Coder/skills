/**
 * Design → Figma deterministic bridge.
 *
 * Runs in a Figma Plugin context.
 * Input is the normalized tree described in ../references/design-model.md.
 *
 * The executor is deliberately model-agnostic: an AI, HTML converter, or
 * another program can produce the normalized JSON, while this file performs
 * deterministic Figma mutations and reconciliation.
 */

const PLUGIN_DATA_KEY = "design-to-figma:id";

async function main(design, options = {}) {
  validateDesign(design);

  const parent = options.parentId
    ? await figma.getNodeByIdAsync(options.parentId)
    : figma.currentPage;

  if (!parent || !("appendChild" in parent)) {
    throw new Error("Target parent does not exist or cannot contain children.");
  }

  const ctx = {
    nodeCache: new Map(),
    variableCache: new Map(),
    componentCache: new Map(),
  };

  indexOwnedNodes(parent, ctx.nodeCache);
  await indexLocalComponents(ctx.componentCache);

  return reconcileNode(design, parent, null, ctx);
}

function validateDesign(design) {
  if (!design || typeof design !== "object") {
    throw new Error("Design input must be an object.");
  }
  if (!design.type || !design.name) {
    throw new Error("Every design node requires type and name.");
  }
}

function indexOwnedNodes(root, cache) {
  if (!("findAll" in root)) return;
  for (const node of root.findAll(() => true)) {
    const id = node.getPluginData(PLUGIN_DATA_KEY);
    if (id) cache.set(id, node);
  }
}

async function indexLocalComponents(cache) {
  const components = figma.currentPage.findAllWithCriteria({ types: ["COMPONENT"] });
  for (const component of components) {
    cache.set(component.id, component);
    const sourceId = component.getPluginData(PLUGIN_DATA_KEY);
    if (sourceId) cache.set(sourceId, component);
  }
}

async function reconcileNode(spec, parent, index, ctx) {
  validateNodeSpec(spec);

  let node = spec.id ? ctx.nodeCache.get(spec.id) : null;

  if (!node || node.removed || !isCompatibleNode(node, spec)) {
    if (node && !node.removed && spec.id) node.remove();
    node = createNode(spec, ctx);
    insertAt(parent, node, index);
  } else if (node.parent !== parent) {
    insertAt(parent, node, index);
  } else if (index != null && parent.children.indexOf(node) !== index) {
    parent.insertChild(index, node);
  }

  if (spec.id) {
    node.setPluginData(PLUGIN_DATA_KEY, spec.id);
    ctx.nodeCache.set(spec.id, node);
  }

  await applyProperties(node, spec, ctx);

  if (Array.isArray(spec.children)) {
    await reconcileChildren(node, spec.children, ctx);
  }

  if (spec.type === "COMPONENT" && spec.component === false) {
    throw new Error(`COMPONENT node "${spec.name}" cannot set component=false.`);
  }

  return node;
}

function insertAt(parent, node, index) {
  if (index == null || index >= parent.children.length) parent.appendChild(node);
  else parent.insertChild(index, node);
}

function isCompatibleNode(node, spec) {
  const map = {
    FRAME: "FRAME",
    GROUP: "GROUP",
    RECTANGLE: "RECTANGLE",
    ELLIPSE: "ELLIPSE",
    LINE: "LINE",
    TEXT: "TEXT",
    VECTOR: "VECTOR",
    COMPONENT: "COMPONENT",
    COMPONENT_SET: "COMPONENT_SET",
    INSTANCE: "INSTANCE",
  };
  return node.type === map[spec.type];
}

function createNode(spec, ctx) {
  switch (spec.type) {
    case "FRAME": return figma.createFrame();
    case "RECTANGLE": return figma.createRectangle();
    case "ELLIPSE": return figma.createEllipse();
    case "LINE": return figma.createLine();
    case "TEXT": return figma.createText();
    case "COMPONENT": return figma.createComponent();
    case "VECTOR":
      if (typeof spec.svg !== "string") throw new Error(`VECTOR "${spec.name}" requires svg.`);
      return figma.createNodeFromSvg(spec.svg);
    case "INSTANCE": {
      const component = resolveComponent(spec, ctx);
      if (!component) throw new Error(`Component "${spec.componentId}" was not found.`);
      return component.createInstance();
    }
    case "GROUP":
      throw new Error("GROUP nodes require children and are created during reconciliation.");
    case "COMPONENT_SET":
      throw new Error("COMPONENT_SET nodes are created from Component children after reconciliation.");
    default:
      throw new Error(`Unsupported design node type: ${spec.type}`);
  }
}

function resolveComponent(spec, ctx) {
  return ctx.componentCache.get(spec.componentId) ||
    ctx.nodeCache.get(spec.componentId) ||
    null;
}

async function reconcileChildren(parent, childSpecs, ctx) {
  if (!("children" in parent)) {
    throw new Error(`Node "${parent.name}" cannot contain children.`);
  }

  for (let i = 0; i < childSpecs.length; i++) {
    await reconcileNode(childSpecs[i], parent, i, ctx);
  }

  const targetIds = new Set(childSpecs.filter(x => x.id).map(x => x.id));
  for (const child of [...parent.children]) {
    const id = child.getPluginData(PLUGIN_DATA_KEY);
    if (id && !targetIds.has(id)) child.remove();
  }
}

async function applyProperties(node, spec, ctx) {
  if (spec.name !== undefined) node.name = spec.name;
  if (spec.visible !== undefined) node.visible = Boolean(spec.visible);
  if (spec.opacity !== undefined) node.opacity = Number(spec.opacity);
  if (spec.rotation !== undefined) node.rotation = Number(spec.rotation);
  if (spec.blendMode !== undefined && "blendMode" in node) node.blendMode = spec.blendMode;

  if (spec.x !== undefined) node.x = Number(spec.x);
  if (spec.y !== undefined) node.y = Number(spec.y);
  if (spec.width !== undefined || spec.height !== undefined) {
    const w = spec.width === undefined ? node.width : Number(spec.width);
    const h = spec.height === undefined ? node.height : Number(spec.height);
    if (typeof node.resize === "function") node.resize(w, h);
  }

  if (spec.radius !== undefined && "cornerRadius" in node) {
    applyRadius(node, spec.radius);
  }

  if (spec.fills !== undefined && "fills" in node) {
    node.fills = await normalizePaints(spec.fills);
  }
  if (spec.strokes !== undefined && "strokes" in node) {
    node.strokes = await normalizePaints(spec.strokes);
  }
  if (spec.strokeWeight !== undefined && "strokeWeight" in node) {
    node.strokeWeight = Number(spec.strokeWeight);
  }

  if (spec.effects !== undefined && "effects" in node) {
    node.effects = spec.effects;
  }

  if (spec.layout) applyLayout(node, spec.layout);
  if (spec.sizing) applySizing(node, spec.sizing);

  if (node.type === "TEXT") {
    if (spec.typography) await applyTypography(node, spec.typography);
    if (spec.content !== undefined) node.characters = String(spec.content);
  }

  if (spec.variableBindings) {
    await applyVariableBindings(node, spec.variableBindings, ctx);
  }

  if (spec.componentProperties && node.type === "INSTANCE") {
    node.setProperties(spec.componentProperties);
  }
}

function applyRadius(node, radius) {
  if (typeof radius === "number") {
    node.cornerRadius = radius;
    return;
  }
  if (radius && typeof radius === "object") {
    if ("topLeft" in node) node.topLeftRadius = Number(radius.topLeft || 0);
    if ("topRight" in node) node.topRightRadius = Number(radius.topRight || 0);
    if ("bottomRight" in node) node.bottomRightRadius = Number(radius.bottomRight || 0);
    if ("bottomLeft" in node) node.bottomLeftRadius = Number(radius.bottomLeft || 0);
    return;
  }
  throw new Error("Invalid radius.");
}

function applyLayout(node, layout) {
  if (!("layoutMode" in node)) {
    throw new Error(`Node "${node.name}" does not support Auto Layout.`);
  }

  if (layout.mode !== undefined) node.layoutMode = layout.mode;
  if (layout.gap !== undefined) node.itemSpacing = Number(layout.gap);
  if (layout.padding) {
    if (layout.padding.top !== undefined) node.paddingTop = Number(layout.padding.top);
    if (layout.padding.right !== undefined) node.paddingRight = Number(layout.padding.right);
    if (layout.padding.bottom !== undefined) node.paddingBottom = Number(layout.padding.bottom);
    if (layout.padding.left !== undefined) node.paddingLeft = Number(layout.padding.left);
  }
  if (layout.primaryAxisAlign !== undefined) node.primaryAxisAlignItems = layout.primaryAxisAlign;
  if (layout.counterAxisAlign !== undefined) node.counterAxisAlignItems = layout.counterAxisAlign;
  if (layout.primaryAxisSizing !== undefined) node.primaryAxisSizingMode = layout.primaryAxisSizing;
  if (layout.counterAxisSizing !== undefined) node.counterAxisSizingMode = layout.counterAxisSizing;
  if (layout.wrap !== undefined && "layoutWrap" in node) node.layoutWrap = layout.wrap;
  if (layout.counterAxisSpacing !== undefined && "counterAxisSpacing" in node) node.counterAxisSpacing = Number(layout.counterAxisSpacing);
  if (layout.strokesIncludedInLayout !== undefined && "strokesIncludedInLayout" in node) node.strokesIncludedInLayout = Boolean(layout.strokesIncludedInLayout);
}

function applySizing(node, sizing) {
  if (sizing.horizontal !== undefined) {
    if (!("layoutSizingHorizontal" in node)) throw new Error(`Node "${node.name}" does not support horizontal Auto Layout sizing.`);
    node.layoutSizingHorizontal = sizing.horizontal;
  }
  if (sizing.vertical !== undefined) {
    if (!("layoutSizingVertical" in node)) throw new Error(`Node "${node.name}" does not support vertical Auto Layout sizing.`);
    node.layoutSizingVertical = sizing.vertical;
  }
}

async function applyTypography(node, typography) {
  if (typography.family && typography.style) {
    await figma.loadFontAsync({ family: typography.family, style: typography.style });
    node.fontName = { family: typography.family, style: typography.style };
  }
  if (typography.size !== undefined) node.fontSize = Number(typography.size);
  if (typography.lineHeight !== undefined) node.lineHeight = normalizeLineHeight(typography.lineHeight);
  if (typography.letterSpacing !== undefined) node.letterSpacing = normalizeLetterSpacing(typography.letterSpacing);
  if (typography.horizontalAlign !== undefined) node.textAlignHorizontal = typography.horizontalAlign;
  if (typography.verticalAlign !== undefined) node.textAlignVertical = typography.verticalAlign;
  if (typography.textCase !== undefined) node.textCase = typography.textCase;
  if (typography.textDecoration !== undefined) node.textDecoration = typography.textDecoration;
  if (typography.autoResize !== undefined) node.textAutoResize = typography.autoResize;
}

function normalizeLineHeight(value) {
  if (typeof value === "number") return { unit: "PIXELS", value };
  if (value.unit === "AUTO") return { unit: "AUTO" };
  if (value.unit === "PIXELS") return { unit: "PIXELS", value: Number(value.value) };
  if (value.unit === "INTRINSIC_%") return { unit: "INTRINSIC_%", value: Number(value.value) };
  return value;
}

function normalizeLetterSpacing(value) {
  if (typeof value === "number") return { unit: "PIXELS", value };
  return { unit: value.unit || "PIXELS", value: Number(value.value || 0) };
}

async function normalizePaints(paints) {
  return Promise.all(paints.map(async paint => {
    if (paint.type === "SOLID") {
      return {
        type: "SOLID",
        color: hexToRgb(paint.color),
        opacity: paint.opacity === undefined ? 1 : Number(paint.opacity),
      };
    }
    if (paint.type === "IMAGE") {
      if (!paint.bytes) throw new Error("IMAGE paint requires source bytes.");
      const image = figma.createImage(decodeBase64(paint.bytes));
      return { type: "IMAGE", imageHash: image.hash, scaleMode: paint.scaleMode || "FILL" };
    }
    throw new Error(`Unsupported paint type "${paint.type}".`);
  }));
}

function hexToRgb(hex) {
  const value = String(hex).replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(value)) throw new Error(`Expected 6-digit hex color, received "${hex}".`);
  return {
    r: parseInt(value.slice(0, 2), 16) / 255,
    g: parseInt(value.slice(2, 4), 16) / 255,
    b: parseInt(value.slice(4, 6), 16) / 255,
  };
}

function decodeBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function applyVariableBindings(node, bindings, ctx) {
  for (const [field, variableSpec] of Object.entries(bindings)) {
    const variable = await resolveVariable(variableSpec, ctx);
    if (!variable) throw new Error(`Variable "${formatVariableSpec(variableSpec)}" was not found.`);

    if (field === "fills" || field === "strokes") {
      const paints = field === "fills" ? node.fills : node.strokes;
      const updated = paints.map(paint => {
        if (paint.type !== "SOLID") return paint;
        return figma.variables.setBoundVariableForPaint(paint, "color", variable);
      });
      if (field === "fills") node.fills = updated;
      else node.strokes = updated;
      continue;
    }

    if (typeof node.setBoundVariable !== "function") {
      throw new Error(`Node "${node.name}" cannot bind variable field "${field}".`);
    }
    node.setBoundVariable(field, variable);
  }
}

async function resolveVariable(spec, ctx) {
  const collectionName = typeof spec === "string" ? null : spec.collection;
  const fullName = typeof spec === "string" ? spec : spec.name;
  const key = `${collectionName || ""}/${fullName}`;
  if (ctx.variableCache.has(key)) return ctx.variableCache.get(key);

  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  let collection = null;
  let variableName = fullName;

  if (collectionName) {
    collection = collections.find(c => c.name === collectionName) || null;
  } else if (fullName.includes("/")) {
    const slash = fullName.indexOf("/");
    collection = collections.find(c => c.name === fullName.slice(0, slash)) || null;
    variableName = fullName.slice(slash + 1);
  }

  if (!collection) return null;

  const variables = await figma.variables.getLocalVariablesAsync();
  const variable = variables.find(v => v.variableCollectionId === collection.id && v.name === variableName) || null;
  if (variable) ctx.variableCache.set(key, variable);
  return variable;
}

function formatVariableSpec(spec) {
  return typeof spec === "string" ? spec : `${spec.collection || "?"}/${spec.name || "?"}`;
}

function validateNodeSpec(spec) {
  const supported = new Set(["FRAME", "GROUP", "RECTANGLE", "ELLIPSE", "LINE", "TEXT", "VECTOR", "COMPONENT", "COMPONENT_SET", "INSTANCE"]);
  if (!supported.has(spec.type)) throw new Error(`Unsupported node type: ${spec.type}`);
  if (!spec.name) throw new Error("Every design node requires a name.");
  if (spec.type === "VECTOR" && typeof spec.svg !== "string") throw new Error(`VECTOR "${spec.name}" requires svg.`);
  if (spec.type === "INSTANCE" && !spec.componentId) throw new Error(`INSTANCE "${spec.name}" requires componentId.`);
}

if (typeof module !== "undefined") module.exports = { main };
