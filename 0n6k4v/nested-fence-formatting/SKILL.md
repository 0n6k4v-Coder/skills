---
name: nested-fence-formatting
description: Apply dynamic Markdown fence formatting to any generated response containing nested fenced blocks, ensuring the outer fence is always strictly deeper than every inner fence.
---

# Nested Fence Formatting

## Purpose

Ensure every generated output containing nested Markdown fenced blocks remains syntactically safe, unambiguous, and copyable.

This Skill applies to **any generated response or artifact**, not only Prompts.

---

## Core Rule

Before rendering any output containing fenced blocks:

```text
GENERATE CONTENT
↓
DETECT ALL FENCE DEPTHS
↓
FIND MAXIMUM INNER FENCE
↓
CALCULATE OUTER FENCE
↓
VERIFY OUTER > EVERY INNER FENCE
↓
RENDER
```

The outer fence MUST always be strictly deeper than every nested fence.

---

## Fence Calculation

Use:

```text
OUTER_FENCE =
smallest multiple of 3
such that:

OUTER_FENCE > MAX_INNER_FENCE
```

Examples:

```text
MAX_INNER_FENCE = 3
OUTER_FENCE = 6
```

```text
MAX_INNER_FENCE = 6
OUTER_FENCE = 9
```

```text
MAX_INNER_FENCE = 9
OUTER_FENCE = 12
```

Never assume the outer fence is always 6.

---

## Applicability

Apply this rule whenever generated content contains nested fenced blocks, including:

- Prompts
- Markdown documents
- Meta-instructions
- Agent instructions
- Code
- Configuration
- Documentation
- Embedded examples
- Any other generated response containing nested fences

The Skill governs **fence formatting only**. It does not define the content, purpose, or semantics of the generated output.

---

## Mandatory Preflight

Before rendering:

```text
INSPECT COMPLETE OUTPUT
→ DETECT MAXIMUM FENCE DEPTH
→ CALCULATE REQUIRED OUTER FENCE
→ VERIFY OUTER > EVERY INNER FENCE
→ VERIFY OUTER FENCE CONSISTENCY
→ RENDER OUTPUT
```

Do not render the final output before this preflight is satisfied.

---

## Fence Integrity Requirements

The final output MUST satisfy:

- The outer fence is strictly deeper than every inner fence.
- Nested fences may use 3, 6, 9, 12, or more backticks.
- The outer fence must never equal an inner fence.
- No inner fence may terminate the outer fence.
- The complete generated content must remain inside the outer fence.
- The outer language identifier must be `text` when an outer language identifier is used.
- Fence depth must be calculated from the **actual generated content**, not assumed in advance.

If no nested fenced block exists, no artificial outer fence is required unless the surrounding output format explicitly requires one.

---

## Output Integrity Check

Before finalizing:

```text
CONTENT COMPLETE?
        ↓
FENCES DETECTED?
   ↙            ↘
 NO              YES
 ↓                ↓
RENDER       FIND MAX DEPTH
                  ↓
          CALCULATE OUTER DEPTH
                  ↓
          OUTER > ALL INNER?
             ↙         ↘
           NO           YES
           ↓              ↓
        CORRECT          RENDER
```

A response is not correctly formatted until the fence hierarchy has been verified.

---

## Fundamental Principle

> **The outer fence must always be strictly deeper than every fence nested inside it.**