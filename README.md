# AI Agent Skills Collection

> **Last Updated:** 2026-08-18          
> **Purpose:** A curated collection of reusable `SKILL.md` definitions for AI agents and agentic coding systems.        
> **Compatibility:** Framework-agnostic — designed to be usable across Hermes Agent, Claude Code, Codex, OpenCode, Cursor, and other AI agent runtimes that support `SKILL.md`-style skills.       
> **Categories:** [Figma](#figma-skills) • [Railway](#railway-skills) • [Matt Pocock](#matt-pocock-skills) • [0n6k4v](#0n6k4v-skills) • [Playwright CLI](#playwright-cli-skills) • [Google](#google-skills) • [Next.js](#nextjs-skills)         
> **Total Skills:** 51 (35 Figma + 1 Railway + 3 Matt Pocock + 6 0n6k4v + 1 Playwright CLI + 2 Google + 3 Next.js)

---

## About This Collection

This repository is a curated collection of reusable skills for AI agents.

A skill is a self-contained capability definition centered around a `SKILL.md` manifest. Depending on the source project, a skill may also contain supporting materials such as:

* `references/`
* `scripts/`
* `agents/`
* additional documentation or templates

The collection is intended to make useful agent behaviors, workflows, domain guidance, and operational protocols available in one place while preserving the structure and intent of each source skill.

The collection includes both:

* **Domain-specific skills** — such as Figma, Next.js, Chrome Extensions, and Railway
* **General-purpose agent skills** — such as debugging, action execution, output control, Markdown formatting, and Git workflows

---

## Sources

| Source                               | Link                                                                        | Notes                                                      |
| ------------------------------------ | --------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Figma Community Skills**           | https://www.figma.com/community/skills                                      | Skills collected from multiple repositories                |
| **Figma Official (Code Connect)**    | https://github.com/figma/mcp-server-guide                                   | Official Figma skills under `figma/ebentley-figma/skills/` |
| **0n6k4v Project Skills**            | https://github.com/0n6k4v-Coder/skills/tree/master/0n6k4v                   | 6 general-purpose AI agent skills                          |
| **Railway**                          | https://github.com/railwayapp/railway-skills                                | `use-railway` skill                                        |
| **Matt Pocock**                      | https://github.com/mattpocock/skills                                        | 3 productivity / workflow skills                           |
| **Playwright CLI**                   | https://github.com/microsoft/playwright-cli/tree/main/skills/playwright-cli | Browser automation CLI skill                               |
| **Google**                           | https://github.com/GoogleChrome/modern-web-guidance                         | Modern web development and Chrome extension guidance       |
| **Next.js (Vercel)**                 | https://github.com/vercel/next.js/tree/canary/skills                        | 3 skills from the Next.js canary branch                    |
| **Additional Upstream Repositories** | Various                                                                     | See individual category tables for exact source locations  |

---

## Directory Structure

```text
skills/
├── README.md
│
├── figma/                  ← 35 skills
│   ├── augment-multi-agent-figma/
│   ├── component-contracts-figma/
│   │    ├── cc-figma-component/
│   │    └── cc-figma-tokens/
│   ├── ebentley-figma/
│   │    ├── workflow-skills/
│   │    │    └── generate-project-plan/
│   │    └── skills/
│   │         ├── figma-code-connect/
│   │         ├── figma-create-new-file/
│   │         ├── figma-generate-design/
│   │         ├── figma-generate-diagram/
│   │         ├── figma-generate-library/
│   │         ├── figma-implement-motion/
│   │         ├── figma-swiftui/
│   │         ├── figma-use/
│   │         ├── figma-use-figjam/
│   │         ├── figma-use-motion/
│   │         └── figma-use-slides/
│   ├── edenspiekermann/
│   │    ├── apply-design-system/
│   │    ├── audit-design-system/
│   │    └── fix-design-system-finding/
│   ├── edit-figma-design/
│   ├── prototype-to-figma-skill/
│   ├── rad-spacing/
│   ├── sync-figma-token/
│   └── uSpec/
│
├── google/                 ← 2 skills
│   ├── chrome-extensions/
│   └── modern-web-guidance/
│
├── railway/                ← 1 skill
│   └── use-railway/
│
├── mattpocock/             ← 3 skills
│   ├── in-progress/
│   │   └── handoff/
│   └── productivity/
│        ├── grill-me/
│        └── teach/
│
├── 0n6k4v/                 ← 6 skills
│   ├── action-after-recognition/
│   ├── ai-agent-communication-protocol/
│   ├── debugging/
│   ├── git-auto-commit-push/
│   ├── nested-fence-formatting/
│   └── raw-content-only/
│
├── playwright-cli/         ← 1 skill
│   ├── SKILL.md
│   └── references/
│
└── next.js/                ← 3 skills
     ├── next-cache-components-adoption/
     │   ├── SKILL.md
     │   └── references/
     │        └── per-page-decisions.md
     ├── next-cache-components-optimizer/
     │   ├── SKILL.md
     │   ├── instant-nav-loop.md
     │   └── ppr-loop.md
     └── next-dev-loop/
          └── SKILL.md
```

---

## Figma Skills (35 skills)

### Community & External Skills (24 skills)

| Skill Directory                   | Source Repository                                                                                                 | Skills Included                                                           |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `augment-multi-agent-figma/`      | [AugmentedAJ/skills](https://github.com/AugmentedAJ/skills)                                                       | `augment-multi-agent-figma`                                               |
| `component-contracts-figma/`      | [nvillapiano/component-contracts-figma](https://github.com/nvillapiano/component-contracts-figma)                 | `cc-figma-component`, `cc-figma-tokens`                                   |
| `ebentley-figma/workflow-skills/` | [figma/mcp-server-guide](https://github.com/figma/mcp-server-guide/tree/main/workflow-skills)                     | `generate-project-plan`                                                   |
| `edenspiekermann/`                | [edenspiekermann/Skills](https://github.com/edenspiekermann/Skills/tree/main/skills)                              | `apply-design-system`, `audit-design-system`, `fix-design-system-finding` |
| `edit-figma-design/`              | [warpdotdev/figma-skills](https://github.com/warpdotdev/figma-skills/tree/main/.agents/.skills/edit-figma-design) | `edit-figma-design`                                                       |
| `prototype-to-figma-skill/`       | [alima-max/prototype-to-figma-skill](https://github.com/alima-max/prototype-to-figma-skill)                       | `prototype-to-figma-skill`                                                |
| `rad-spacing/`                    | [nolanperk/rad-spacing](https://github.com/nolanperk/rad-spacing)                                                 | `rad-spacing`                                                             |
| `sync-figma-token/`               | [firebenders/sync-figma-token-skill](https://github.com/firebenders/sync-figma-token-skill/tree/main/skills)      | `sync-figma-token`                                                        |
| `uSpec/`                          | [redongreen/uSpec](https://github.com/redongreen/uSpec/tree/main/skills)                                          | 13 skills (create-*/extract-*)                                            |

### Official Figma Skills (11 skills)

| Skill Directory           | Source                                                                                                |
| ------------------------- | ----------------------------------------------------------------------------------------------------- |
| `figma-code-connect/`     | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-create-new-file/`  | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-generate-design/`  | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-generate-diagram/` | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-generate-library/` | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-implement-motion/` | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-swiftui/`          | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-use/`              | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-use-figjam/`       | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-use-motion/`       | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-use-slides/`       | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |

---

## Railway Skills (1 skill)

| Skill Directory | Source Repository                                                                                                      | Skills Included |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------- |
| `use-railway/`  | [railwayapp/railway-skills](https://github.com/railwayapp/railway-skills/tree/main/plugins/railway/skills/use-railway) | `use-railway`   |

---

## Matt Pocock Skills (3 skills)

Source: [mattpocock/skills](https://github.com/mattpocock/skills/tree/733d312884b3878a9a9cff693c5886943753a741)

| Category         | Skill Directory | Source Path                     | Skills Included |
| ---------------- | --------------- | ------------------------------- | --------------- |
| **In-Progress**  | `handoff/`      | `skills/in-progress/handoff/`   | `handoff`       |
| **Productivity** | `grill-me/`     | `skills/productivity/grill-me/` | `grill-me`      |
| **Productivity** | `teach/`        | `skills/productivity/teach/`    | `teach`         |

---

## 0n6k4v Skills (6 skills)

Source: [0n6k4v-Coder/skills](https://github.com/0n6k4v-Coder/skills/tree/master/0n6k4v)

| Skill                                                                                                                                   | Category            | Description                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [`action-after-recognition`](https://github.com/0n6k4v-Coder/skills/blob/master/0n6k4v/action-after-recognition/SKILL.md)               | Action Execution    | Execute a sufficiently clear, authorized, safe, and executable action immediately instead of stopping at explanation.                  |
| [`ai-agent-communication-protocol`](https://github.com/0n6k4v-Coder/skills/blob/master/0n6k4v/ai-agent-communication-protocol/SKILL.md) | Agent Operations    | Applies risk-tiered announce → execute → report discipline to tool calls, code changes, commands, and mutations.                       |
| [`debugging`](https://github.com/0n6k4v-Coder/skills/blob/master/0n6k4v/debugging/SKILL.md)                                             | Debugging & Audit   | Provides structured FIX MODE and AUDIT MODE workflows for runtime diagnosis, root-cause analysis, codebase tracing, and verification.  |
| [`git-auto-commit-push`](https://github.com/0n6k4v-Coder/skills/blob/master/0n6k4v/git-auto-commit-push/SKILL.md)                       | Git Workflow        | Automates status inspection, diff review, Conventional Commit generation, confirmation, commit, push, and verification.                |
| [`nested-fence-formatting`](https://github.com/0n6k4v-Coder/skills/blob/master/0n6k4v/nested-fence-formatting/SKILL.md)                 | Markdown Formatting | Dynamically calculates and validates Markdown fence depth so outer fences remain strictly deeper than nested fences.                   |
| [`raw-content-only`](https://github.com/0n6k4v-Coder/skills/blob/master/0n6k4v/raw-content-only/SKILL.md)                               | Output Control      | Returns only the explicitly requested content without unnecessary introduction, explanation, commentary, framing, or surrounding text. |

---

## Playwright CLI Skills (1 skill)

Source: [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli/tree/main/skills/playwright-cli)

| Skill Directory   | Source Path              | Skills Included  |
| ----------------- | ------------------------ | ---------------- |
| `playwright-cli/` | `skills/playwright-cli/` | `playwright-cli` |

---

## Google Skills (2 skills)

Source: [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance)

| Skill Directory        | Skills Included                                                             |
| ---------------------- | --------------------------------------------------------------------------- |
| `chrome-extensions/`   | `chrome-extensions` — Build and publish Chrome Extensions using Manifest V3 |
| `modern-web-guidance/` | `modern-web-guidance` — Search best-practice guidance for modern Web APIs   |

---

## Next.js Skills (3 skills)

Source: [vercel/next.js](https://github.com/vercel/next.js/tree/canary/skills) (canary branch)

| Skill Directory                    | Source Path                               | Skills Included                                                                               |
| ---------------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------- |
| `next-cache-components-adoption/`  | `skills/next-cache-components-adoption/`  | `next-cache-components-adoption` — Guidance for adopting Cache Components on a per-page basis |
| `next-cache-components-optimizer/` | `skills/next-cache-components-optimizer/` | `next-cache-components-optimizer` — Cache Components optimization workflows                   |
| `next-dev-loop/`                   | `skills/next-dev-loop/`                   | `next-dev-loop` — Development workflow guidance for Next.js                                   |

---

## Skill Design Principles

The collection intentionally contains skills with different scopes.

### General-Purpose Agent Skills

These skills affect how an agent behaves regardless of the underlying technology or project.

Examples include:

* action execution
* communication protocols
* debugging
* output control
* Markdown formatting
* Git workflows

### Domain-Specific Skills

These skills provide specialized guidance for particular technologies, platforms, or workflows.

Examples include:

* Figma
* Next.js
* Playwright
* Railway
* Chrome Extensions

A skill should remain focused on its own responsibility. Domain knowledge, workflow behavior, formatting rules, and operational protocols should remain separable whenever practical.

---

## Skill Structure

A typical standalone skill follows this structure:

```text
skill-name/
├── SKILL.md           ← Skill manifest (required)
├── references/        ← Supporting references (optional)
├── scripts/           ← Helper scripts (optional)
└── agents/            ← Agent definitions (optional)
```

`SKILL.md` is the primary definition of the skill.

Supporting files should only be included when they are part of the source skill or required by the skill itself.

---

## Using the Skills

The exact command or loading mechanism depends on the AI agent runtime.

A runtime may load a skill by:

* skill name
* skill directory
* configuration
* slash command
* CLI flag
* automatic skill discovery
* another runtime-specific mechanism

The collection does **not** require a single agent runtime or a single invocation interface.

For example, a runtime may expose an interface similar to:

```text
/skill <skill-name>
```

or:

```text
<agent-runtime> --skill <skill-name>
```

The exact invocation syntax should be determined by the runtime consuming the collection.

---

## Source and File Integrity

The collection may contain skills originating from different repositories and authors.

For each skill:

* Preserve the source skill's intended semantics.
* Do not silently rewrite upstream skills while copying them.
* Keep supporting files required by the skill.
* Record or retain source information where practical.
* Verify licensing and attribution requirements for the originating repository.
* Treat locally authored skills and upstream skills differently when maintaining provenance.

Where a skill is maintained as an exact copy of an upstream source, its contents should remain synchronized with that source unless an intentional fork is being maintained.

---

## Maintenance

The collection should be reconciled periodically against its actual codebase.

When adding or removing a skill, update:

* Directory Structure
* Category tables
* Skill counts
* Total count
* Source information
* Any relevant README references

The README should describe the **actual contents of the repository**, not an intended or historical state.

The codebase is the source of truth for inventory counts.

---

## Adding a New Skill

```text
1. Create or copy the skill directory.

2. Ensure the directory contains SKILL.md.

3. Preserve required supporting files.

4. Add the skill to the appropriate category.

5. Update the Directory Structure.

6. Update the relevant category table.

7. Update the summary counts.

8. Update source and attribution information.

9. Reconcile README.md against the actual repository tree.

10. Verify that the README inventory matches the codebase.
```

---

## Summary

| Category           | Skills |
| ------------------ | -----: |
| **Figma**          | **35** |
| **Railway**        |  **1** |
| **Matt Pocock**    |  **3** |
| **0n6k4v**         |  **6** |
| **Playwright CLI** |  **1** |
| **Google**         |  **2** |
| **Next.js**        |  **3** |
| **Total**          | **51** |

---

## Collection Scope

This repository is **not limited to Hermes Agent**.

It is a general-purpose **AI Agent Skills Collection** intended to gather reusable skills that can be consumed, adapted, or integrated by different AI agent runtimes and tooling ecosystems.

The collection therefore treats `SKILL.md` as the reusable capability boundary rather than tying the repository itself to one particular agent implementation.
