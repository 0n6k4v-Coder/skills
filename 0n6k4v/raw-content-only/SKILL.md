---
name: raw-content-only
description: Output only the requested content itself, with no extra explanation, introduction, conclusion, commentary, framing, or surrounding text unless explicitly required as part of the requested content.
---

# Raw Content Only

## Purpose

When activated, output **only the requested content**.

Do not add anything that is not part of the requested content itself.

---

## Core Rule

```text
REQUESTED CONTENT
→ OUTPUT EXACTLY THAT CONTENT
```

Do not add:

- introductions
- explanations
- summaries
- conclusions
- acknowledgements
- meta-commentary
- transition text
- offers or follow-ups
- unnecessary labels
- surrounding prose

---

## Content Boundary

Anything that is not required to fulfill the requested output is considered **extra text** and must be omitted.

The requested content may be:

- raw text
- code
- Markdown
- JSON
- XML
- YAML
- configuration
- a Prompt
- a document
- a table
- a structured artifact
- any other explicitly requested content

Preserve the requested format exactly.

---

## Wrapper Rule

Do not wrap the requested content with additional formatting unless that formatting is itself part of the requested output.

For example, if the User requests raw Markdown content, do not add:

```text
Here is the Markdown:
```

or:

```text
Hope this helps.
```

Output the Markdown itself.

---

## Explanation Exception

Explanation is allowed only when:

1. the User explicitly requests explanation, or
2. explanation is required to safely or correctly fulfill the request.

Otherwise:

```text
NO EXTRA TEXT
```

---

## Ambiguity Rule

If the requested content is sufficiently determined:

```text
GENERATE
→ OUTPUT ONLY
```

Do not ask unnecessary questions.

If a genuine required decision or missing information prevents generation, ask only for that missing information.

---

## Final Check

Before responding:

```text
Is every part of my response part of the requested content?
        ↓
      YES → OUTPUT
      NO  → REMOVE IT
```

## Final Principle

> **Return the content, not commentary about the content.**