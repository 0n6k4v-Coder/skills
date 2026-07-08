# Skills Collection สำหรับ Hermes Agent

> **Last Updated:** 2026-07-08          \
> **Categories:** [Figma](#figma-skills) • [Railway](#railway-skills) • [Matt Pocock](#matt-pocock-skills) • [0n6k4v](#0n6k4v-skills) • [Playwright CLI](#playwright-cli-skills) • [Google](#google-skills) • [Next.js](#nextjs-skills)       \
> **Total Skills:** 48 (35 Figma + 1 Railway + 3 Matt Pocock + 3 0n6k4v + 1 Playwright CLI + 2 Google + 3 Next.js)

---

## แหลงที่มา

| แหล่ง | ลิงก์ | หมายเหตุ |
|--------|-------|----------|
| **Figma Community Skills** | <https://www.figma.com/community/skills> | รวม skills จากหลาย repository |
| **Figma Official (Code Connect)** | <https://github.com/figma/mcp-server-guide> | 11 official skills อยู่ใต้ `figma/ebentley-figma/skills/` |
| **GitHub Organizations** | Various (vercel/next.js, figma, mattpocock, railwayapp, microsoft, GoogleChrome) | ดูรายละเอียดในตารางด้านล่าง |
| **0n6k4v Project Skills** | <https://github.com/0n6k4v> | 3 skills (git-auto-commit-push, ai-agent-communication-protocol, debugging) |
| **Railway** | <https://github.com/railwayapp/railway-skills> | `use-railway` skill |
| **Matt Pocock** | <https://github.com/mattpocock/skills> | 3 skills (handoff, grill-me, teach) |
| **Playwright CLI** | <https://github.com/microsoft/playwright-cli/tree/main/skills/playwright-cli> | Browser automation CLI skills |
| **Google** | <https://github.com/GoogleChrome/modern-web-guidance> | Modern web development & Chrome extensions |
| **Next.js (Vercel)** | <https://github.com/vercel/next.js/tree/canary/skills> | 3 skills (canary branch) |

---

## โครงสร้างโฟลเดอร์

```
.agents/skills/
├── README.md              ← ไฟล์นี้
│
├── figma/                 ← 35 skills
│   ├── augment-multi-agent-figma/
│   ├── component-contracts-figma/
│   │    ├── cc-figma-component/
│   │    └── cc-figma-tokens/
│   ├── ebentley-figma/
│   │    ├── workflow-skills/
│   │    │    └── generate-project-plan/
│   │    └── skills/              ← 11 official Figma Code Connect skills
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
│   └── uSpec/              ← 13 skills (create-*/extract-*/firstrun)

├── google/                ← 2 skills
│   ├── chrome-extensions/
│   └── modern-web-guidance/
│
├── railway/               ← 1 skill
│   └── use-railway/
│
├── mattpocock/            ← 3 skills
│    ├── in-progress/
│    │   └── handoff/
│    └── productivity/
│        ├── grill-me/
│        └── teach/
│
├── 0n6k4v/               ← 3 skills
│    ├── git-auto-commit-push/
│    ├── ai-agent-communication-protocol/
│    └── debugging/
│
├── playwright-cli/        ← 1 skill
│    ├── SKILL.md
│    └── references/
│
└── next.js/               ← 3 skills
     ├── next-cache-components-adoption/
     │    ├── SKILL.md
     │    └── references/
     │         └── per-page-decisions.md
     ├── next-cache-components-optimizer/
     │    ├── SKILL.md
     │    ├── instant-nav-loop.md
     │    └── ppr-loop.md
     └── next-dev-loop/
          └── SKILL.md
```

---

## Figma Skills (35 skills)

### Community & External Skills (24 skills)

| Skill Directory | Source Repository | Skills Included |
|-----------------|-------------------|-----------------|
| `augment-multi-agent-figma/` | [AugmentedAJ/skills](https://github.com/AugmentedAJ/skills) | `augment-multi-agent-figma` |
| `component-contracts-figma/` | [nvillapiano/component-contracts-figma](https://github.com/nvillapiano/component-contracts-figma) | `cc-figma-component`, `cc-figma-tokens` |
| `ebentley-figma/workflow-skills/` | [figma/mcp-server-guide](https://github.com/figma/mcp-server-guide/tree/main/workflow-skills) | `generate-project-plan` |
| `edenspiekermann/` | [edenspiekermann/Skills](https://github.com/edenspiekermann/Skills/tree/main/skills) | `apply-design-system`, `audit-design-system`, `fix-design-system-finding` |
| `edit-figma-design/` | [warpdotdev/figma-skills](https://github.com/warpdotdev/figma-skills/tree/main/.agents/.skills/edit-figma-design) | `edit-figma-design` |
| `prototype-to-figma-skill/` | [alima-max/prototype-to-figma-skill](https://github.com/alima-max/prototype-to-figma-skill) | `prototype-to-figma-skill` |
| `rad-spacing/` | [nolanperk/rad-spacing](https://github.com/nolanperk/rad-spacing) | `rad-spacing` |
| `sync-figma-token/` | [firebenders/sync-figma-token-skill](https://github.com/firebenders/sync-figma-token-skill/tree/main/skills) | `sync-figma-token` |
| `uSpec/` | [redongreen/uSpec](https://github.com/redongreen/uSpec/tree/main/skills) | 13 skills (create-*/extract-*) |

### Official Figma Code Connect (11 skills from figma/mcp-server-guide)

| Skill Directory | Source |
|-----------------|--------|
| `figma-code-connect/` | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-create-new-file/` | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-generate-design/` | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-generate-diagram/` | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-generate-library/` | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-implement-motion/` | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-swiftui/` | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-use/` | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-use-figjam/` | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-use-motion/` | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |
| `figma-use-slides/` | [figma/mcp-server-guide/tree/main/skills](https://github.com/figma/mcp-server-guide/tree/main/skills) |

---

## Railway Skills (1 skill)

| Skill Directory | Source Repository | Skills Included |
|-----------------|-------------------|-----------------|
| `use-railway/` | [railwayapp/railway-skills](https://github.com/railwayapp/railway-skills/tree/main/plugins/railway/skills/use-railway) | `use-railway` |

---

## Matt Pocock Skills (3 skills)

Source: [mattpocock/skills](https://github.com/mattpocock/skills/tree/733d312884b3878a9a9cff693c5886943753a741)

| Category | Skill Directory | Source Path | Skills Included |
|----------|-----------------|-------------|-----------------|
| **In-Progress** | `handoff/` | `skills/in-progress/handoff/` | `handoff` |
| **Productivity** | `grill-me/` | `skills/productivity/grill-me/` | `grill-me` |
| **Productivity** | `teach/` | `skills/productivity/teach/` | `teach` |

---

## 0n6k4v Skills (3 skills)

| Category | Skill Directory | Source Path | Skills Included |
|----------|-----------------|-------------|-----------------|
| **Git Automation** | `git-auto-commit-push/` | | `git-auto-commit-push` |
| **AI Agent Communication** | `ai-agent-communication-protocol/` | | `ai-agent-communication-protocol` |
| **Debugging** | `debugging/` | | `debugging` |

---

## Playwright CLI Skills (1 skill)

Source: [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli/tree/main/skills/playwright-cli)

| Skill Directory | Source Path | Skills Included |
|-----------------|-------------|-----------------|
| `playwright-cli/` | `skills/playwright-cli/` | `playwright-cli` |

---

## Google Skills (2 skills)

Source: [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance)

| Skill Directory | Skills Included |
|-----------------|-----------------|
| `chrome-extensions/` | `chrome-extensions` - Build และ publish Chrome Extensions ด้วย Manifest V3 |
| `modern-web-guidance/` | `modern-web-guidance` - Search คำแนะนำ best practices สำหรับ web APIs สมัยใหม่ |

---

## Next.js Skills (3 skills)

Source: [vercel/next.js](https://github.com/vercel/next.js/tree/canary/skills) (canary branch)

| Skill Directory | Source Path | Skills Included |
|-----------------|-------------|-----------------|
| `next-cache-components-adoption/` | `skills/next-cache-components-adoption/` | `next-cache-components-adoption` - คำแนะนำการนำ Cache Components ไปใช้ต่อหน้า (per-page decisions) |
| `next-cache-components-optimizer/` | `skills/next-cache-components-optimizer/` | `next-cache-components-optimizer` - ปรับแต่ง Cache Components (instant-nav-loop, ppr-loop) |
| `next-dev-loop/` | `skills/next-dev-loop/` | `next-dev-loop` - Dev loop workflow สำหรับ Next.js |

---

## สรุปจำนวน Skills

| Category | Directories | Total Skills |
|----------|-------------|--------------|
| **Figma** | 11 | **35** |
| **Railway** | 1 | **1** |
| **Matt Pocock** | 3 | **3** |
| **0n6k4v** | 3 | **3** |
| **Playwright CLI** | 1 | **1** |
| **Google** | 2 | **2** |
| **Next.js** | 3 | **3** |
| **รวม** | **24** | **48** |

---

## วิธีใช้งาน (Usage)

แต่ละ skill เป็น standalone Hermes skill ที่มี `SKILL.md` manifest ของตัวเอง (อาจมี `references/`, `scripts/`, `agents/` subdirectories)

### โหลด Skill

```bash
# ผ่าน CLI flag
hermes -s figma-generate-design

# หรือใน session
/skill figma-generate-design
```

### โครงสร้าง Skill ทั่วไป

```
skill-name/
├── SKILL.md           ← Manifest (required)
├── references/        ← เอกสารอ้างอิง (optional)
├── scripts/           ← Scripts ช่วยเหลือ (optional)
└── agents/            ← Agent definitions (optional)
```

---

## หมายเหตุสำคัญ (Notes)

- **File Integrity:** ทุก `SKILL.md` เป็น exact copy จาก source repository
- **License:** ขึ้นอยู่กับแต่ละ repository ตรวจสอบใน `SKILL.md` แต่ละตัว
- **Maintenance:** อัปเดตโดยการ re-copy จาก source repository

---

## การเพิ่ม Category ใหม่ (Contributing)

```bash
# 1. สร้างโฟลเดอร์ category ใหม่
mkdir -p .agents/skills/<new-category>/

# 2. เพิ่ม skills ตามโครงสร้างเดิม
cp -r <source> .agents/skills/<new-category>/<skill-name>/

# 3. อัปเดต README.md นี้
# - เพิ่มในตาราง Directory Structure
# - เพิ่มตาราง Skills สำหรับ category ใหม่
# - อัปเดต Summary table
```