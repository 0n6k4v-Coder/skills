---
name: chatgpt-open-pdf-editor-via-adobe-acrobat
description: Open a PDF in Adobe Acrobat's interactive editor through browser-based ChatGPT. Use when the user asks ChatGPT to open, edit, annotate, or directly interact with a PDF using Adobe Acrobat.
---

# ChatGPT Open PDF Editor via Adobe Acrobat

## Open

Open the target PDF in Adobe Acrobat's interactive editor.

```text
Target → Asset → Open → Completion
```

### 1. Target

Identify the target PDF in this order:

1. The PDF explicitly identified by the user.
2. An unambiguous PDF referenced in the current conversation.
3. The most recently generated or discussed PDF, when unambiguous.
4. A supported PDF URL or uploaded PDF.

If exactly one PDF is identifiable, use it without asking the user to identify it again.

If multiple PDFs could be the target, ask only which PDF the user means.

**Complete when:** the intended PDF is uniquely identified.

### 2. Asset

Reuse the exact valid asset reference associated with the target PDF.

Prefer an existing Adobe asset reference when available.

Never fabricate, guess, modify, shorten, or reconstruct an asset reference.

If no usable PDF or supported asset reference exists, request only the missing input.

**Complete when:** the target PDF has a reference accepted by the available Adobe Acrobat tool.

### 3. Open

Invoke the available Adobe Acrobat PDF editing UI using its actual tool schema and the resolved asset reference.

Conceptually:

```text
pdf_edit_ui(
    asset_url_or_urn = EXACT_ASSET_REFERENCE
)
```

The conceptual example does not assert that this is the actual connected tool name or parameter schema.

Do not substitute a preview, download instructions, or a manual workaround when the Acrobat editor is available.

For a newly generated PDF, reuse its returned asset reference instead of requiring the user to download and re-upload it.

**Complete when:** the Adobe Acrobat editor successfully opens the identified PDF.

### 4. Completion

Opening the editor does not mean the PDF was edited.

Claim an edit only when an actual editing operation was performed and verified.

If the editor invocation fails, report the failure and do not claim that the PDF was opened.