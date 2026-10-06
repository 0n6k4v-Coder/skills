# Local MCP Server Research-to-Runbook Workflow

````text
1. **Deep research**

   * Research the latest official **MCP Server documentation**.
   * Research the latest official documentation for all relevant **technology-stack components**.
   * Research relevant and current **industry standards**.
   * Use the research to establish the technical basis for the implementation.

2. **Research findings summary**

   * Present the findings as a **clear table**, not just prose.
   * Include a unique **Finding ID** for every finding so it can be referenced later.
   * Design the table with the necessary columns to make each finding easy to understand and trace. For example:

   | Finding ID | Area | Finding | Why It Matters | Source / Standard | Version / Date | Implementation Impact |
   | ---------- | ---- | ------- | -------------- | ----------------- | -------------- | --------------------- |

   * Add other columns where useful, but keep the structure clear and practical.

3. **Implementation Deliverables**

1. **Identify all required files.** Trace dependencies and map each Finding ID to the affected files and tests.
2. **Deliver complete file contents.** For every file to create or modify, provide its exact repository-relative path, action (`CREATE` / `MODIFY`), related Finding IDs, and entire final contents. No snippets, diffs alone, placeholders, or omitted sections. Split long files into consecutive parts if necessary.
3. **Verify consistency.** Check cross-file dependencies, compatibility, security controls, tests, documentation, and runbook alignment. Do not invent APIs or assume unverified repository behavior.
4. **Report validation honestly.** Provide exact test commands and classify results as `PASS`, `FAIL`, `NOT RUN`, or `BLOCKED`. Never claim unexecuted tests passed.
5. **Mandatory Completion Gate.** Do not mark Task 3 complete until all required file contents are delivered, cross-file consistency is reviewed, findings are traceable to changes and tests, and limitations are disclosed. If anything remains incomplete, explicitly identify it and continue all feasible work.
6. **No false completion.** Analysis, recommendations, file inventories, and recovery procedures do not replace implementation deliverables. Do not claim repository changes were applied unless they actually were.

**Required output:** File inventory → Traceability matrix → Complete file contents → Validation results → Completion status.

---

4. **Complete Step-By-Step Runbook**

* Generate the complete runbook **directly in this conversation**.
* **Do not create or generate a file.**
* **Do not use a text editor or document editor.**
* The runbook must be **simple, clear, direct, explicit, concise, and complete**.
* Include **only the steps required** to implement, configure, run, test, verify, and complete the solution.
* Do not include unrelated information, optional steps, or unnecessary explanations.
* Assume the user will execute the commands **exactly as written**.
* Do not require the user to determine missing implementation details independently.

Present the runbook in a **strict sequential order**:

```text
Step 1
Step 2
Step 3
...
```

For every step, include exactly:

**Action**
What the user must do.

**Command**
The exact command(s) the user must run, when applicable.

**File**
Only the **file path/name** when a file must be created or modified.
Do **not** repeat the file contents here; the complete contents are already provided in Section 3.

**Expected Result**
The exact result the user should see or the condition that must be true before continuing.

**Related Finding IDs**
`F-001, F-004, F-009`

Rules:

* Every implementation, configuration, security, testing, and verification step must include **Related Finding IDs**.
* The Finding IDs must correspond directly to the research findings supporting that step.
* Use **existing research Finding IDs only**.
* **Do not invent new Finding IDs.**
* Every command must be explicit and copy-pasteable.
* Every expected result must be concrete and verifiable.
* When a step requires creating or modifying a file, identify the file by its **exact path**, but do not repeat its contents.
* The runbook must cover the complete process **from start to finish**, including:

  * prerequisites
  * environment/configuration
  * file creation/modification
  * dependency installation/update
  * build
  * service startup
  * verification
  * functional testing
  * security verification
  * failure checks required before declaring success
* The final step must define the **final acceptance criteria** for the implementation.
* The complete runbook must be executable **without the user having to infer, invent, or fill in missing steps**.
* Section 3 contains the complete file contents. Section 4 contains the **execution procedure only**.
````

````
# Implementation Task Requirements

## 0. Mandatory Codebase Inspection Gate

Before researching implementation details, proposing changes, or writing implementation code, inspect the actual repository and establish a verified understanding of the existing codebase.

### 0.1 Inspect the Actual Codebase

1. Identify the repository, current branch, and current commit SHA.
2. Inspect the repository structure and identify the relevant source files, configuration files, dependency manifests, tests, documentation, and runtime entry points.
3. Read the complete contents of every existing file that is relevant to the requested implementation.
4. Trace imports, function calls, interfaces, configuration references, dependency relationships, and test coverage to determine the actual implementation boundaries.
5. Verify existing APIs, behavior, conventions, and constraints directly from repository contents. Do not infer implementation details from filenames, directory structures, summaries, or assumptions.

### 0.2 Mandatory Full Exact Path and Full File Content Presentation

**For every existing repository file read or inspected as part of the implementation task, present its exact repository-relative path and its complete current file contents before using that file as a basis for analysis or implementation decisions.**

Use the following format for each inspected file:

**File ID:** `CODE-001`

**Exact Repository-Relative Path:** `path/to/file.ext`

**Action:** `READ ONLY`

**Inspection Status:** `FULL CONTENT READ`

**Full Current File Content:**

```text
[The complete, unmodified contents of the actual file, from the first line to the last line]
```

Mandatory rules:

* Use the exact path and actual contents obtained from the repository.
* Preserve the original content faithfully, including relevant comments, imports, declarations, configuration, and trailing sections.
* Do not replace content with summaries, excerpts, snippets, diffs, ellipses, or placeholders such as `[remaining content omitted]`.
* Do not reconstruct files from memory, documentation, previous responses, or assumptions.
* Do not claim that a file was read completely unless its complete contents were successfully retrieved and reviewed.
* If a file is too large for one response, split it into consecutive, clearly numbered parts. Identify the exact file path and part number for every part. Preserve the original order and ensure that the parts collectively contain the complete file without gaps or duplicated sections.
* If an output limit prevents presenting the complete file, explicitly identify the file, the exact path, the retrieved range, and the outstanding content. Continue in subsequent responses whenever possible. Do not treat partial inspection as complete.
* If a file cannot be accessed, report `BLOCKED` or `NOT AVAILABLE`, state the reason, and do not invent its contents.
* Distinguish files actually read from files merely discovered in a directory listing.
* Use a stable `File ID` for each file so subsequent findings, changes, and tests can reference it.
* If the task covers many files, inspect and present them in manageable batches. Do not silently skip relevant files.

### 0.3 Inspection Completion Gate

Do not proceed to implementation design until the relevant existing codebase has been inspected and its complete contents presented according to Section 0.2.

Before proceeding, provide an inspection inventory containing:

| File ID | Exact Repository-Relative Path | Inspection Status | Relevant Components | Dependencies / Callers |
| ------- | ------------------------------ | ----------------- | ------------------- | ---------------------- |

If inspection is incomplete, explicitly identify the outstanding files and limitations. Continue all feasible inspection work. Never claim complete codebase understanding when relevant files remain unread.

**Important distinction:** Section 0 documents the verified, existing code. Section 3 documents the proposed final code. These sections must never be mixed or presented as if they were the same version of a file.

---

## 1. Deep Research

1. Research the latest applicable official MCP Server documentation.
2. Research the latest applicable official documentation for all relevant technology-stack components and their actual versions in the repository.
3. Research relevant, current industry standards and security requirements.
4. Prefer primary sources, including official specifications, vendor documentation, standards publications, and authoritative security guidance.
5. Verify that each source supports the specific technical claim attributed to it.
6. Record source URLs, document or specification versions, publication dates, and access dates where available.
7. Distinguish mandatory requirements from recommendations and implementation choices.
8. Use the research to establish the technical basis for the implementation.
9. Do not invent APIs, configuration options, security guarantees, compatibility claims, or repository behavior.
10. If authoritative sources conflict, explain the conflict and justify the selected approach.

---

## 2. Research Findings Summary

Present the findings as a clear, traceable table rather than prose alone.

Assign a unique, stable Finding ID to every finding.

Use this table structure:

| Finding ID | Area | Finding | Why It Matters | Source / Standard | Version / Date | Implementation Impact | Verification Method |
| ---------- | ---- | ------- | -------------- | ----------------- | -------------- | --------------------- | ------------------- |

Requirements:

1. Use Finding IDs in the format `F-001`, `F-002`, `F-003`, and so on.
2. Cite the actual authoritative source for each finding.
3. Include only findings supported by evidence.
4. Distinguish confirmed facts, normative requirements, recommendations, and unresolved questions.
5. Map each applicable finding to the exact existing files, proposed changes, and tests.
6. Reuse existing Finding IDs throughout the deliverables and runbook.
7. Never invent new Finding IDs in later sections.
8. If a finding does not apply, explain why instead of forcing an unnecessary change.

---

## 3. Implementation Deliverables

### 3.1 File Inventory

Identify every file required to implement the task, including files that must be created, modified, or deleted.

Trace the existing codebase and its dependencies before deciding which files need changes.

Use this table:

| File ID | Exact Repository-Relative Path | Action | Purpose | Related Finding IDs | Dependencies / Callers | Required Tests |
| ------- | ------------------------------ | ------ | ------- | ------------------- | ---------------------- | -------------- |

Allowed actions:

* `CREATE` — the file does not exist and must be created.
* `MODIFY` — an existing file must be changed.
* `DELETE` — an existing file must be removed, with explicit justification.
* `NO CHANGE` — an inspected file is relevant but requires no modification.

Use exact repository-relative paths. Do not invent paths without checking the repository structure and existing project conventions.

### 3.2 Mandatory Complete File Contents

**For every file marked `CREATE` or `MODIFY`, provide its entire final file contents.**

For each file, use this format:

**File ID:** `IMPL-001`

**Exact Repository-Relative Path:** `path/to/file.ext`

**Action:** `CREATE` or `MODIFY`

**Related Finding IDs:** `F-001, F-004`

**Dependencies / Callers:** List the verified dependencies and affected callers.

**Full Final File Content:**

```text
[The complete final contents of this file]
```

Mandatory rules:

1. For `CREATE`, provide the complete content of the new file.
2. For `MODIFY`, provide the complete replacement content, not only changed lines.
3. Do not provide snippets, diffs alone, pseudocode, ellipses, placeholders, or omitted sections as substitutes for full contents.
4. Do not leave unresolved implementation decisions, unspecified arguments, or TODO markers for required functionality.
5. Preserve unrelated existing behavior unless the task explicitly requires changing it.
6. Base modifications on the verified current contents presented in Section 0.
7. Maintain consistency across imports, exports, interfaces, types, configuration, dependencies, tests, documentation, and runtime behavior.
8. If a file is too large for one response, split its complete contents into consecutively numbered parts. Identify the exact path and part number, preserve ordering, and explicitly confirm when all parts have been delivered.
9. Never claim that a file was modified in the repository merely because its proposed contents are displayed in the conversation.
10. Clearly distinguish **proposed file contents** from **changes actually applied to the repository**.
11. If repository write access is available and implementation is requested, apply the changes and verify the resulting repository state. Otherwise, provide the complete implementation contents and exact application procedure without claiming that changes were applied.
12. If a required file cannot be completed, identify its exact path, missing content, blocker, and impact. Do not mark the implementation complete.

### 3.3 Traceability Matrix

Map every applicable Finding ID to the affected files and verification tests.

| Finding ID | Requirement / Technical Constraint | Affected File IDs and Exact Paths | Implementation Change | Test ID / Exact Test Path | Verification Method |
| ---------- | ---------------------------------- | --------------------------------- | --------------------- | ------------------------- | ------------------- |

Requirements:

* Every implementation-relevant finding must be traceable to an implementation decision or an explicit explanation of why no code change is required.
* Every security-critical requirement must have a corresponding verification method.
* Every new or modified behavior must have appropriate tests.
* Use stable Test IDs, such as `T-001`, `T-002`, and `T-003`.
* Do not invent test paths or claim test coverage without verifying the repository or identifying the proposed test file.

### 3.4 Cross-File Consistency Review

Verify the complete implementation across all affected files, including:

* Interfaces, imports, exports, types, and function signatures.
* Dependency manifests, lockfiles, and compatible version constraints.
* Configuration defaults, environment variables, and runtime entry points.
* Error handling, security boundaries, permissions, and input validation.
* Tests, fixtures, mocks, and test configuration.
* Documentation, commands, examples, and runbooks.
* Backward compatibility and existing behavior.
* Installation, upgrade, rollback, and cleanup behavior where applicable.

Report each issue found and its resolution. Do not assume that independently plausible files form a working implementation.

### 3.5 Validation Results

Provide the exact commands required to validate the implementation.

Use this table:

| Test ID | Validation Area | Exact Command | Expected Result | Actual Result | Status | Related Finding IDs |
| ------- | --------------- | ------------- | --------------- | ------------- | ------ | ------------------- |

Use only these statuses:

* `PASS` — the exact validation was executed and passed.
* `FAIL` — the exact validation was executed and failed.
* `NOT RUN` — the validation was not executed.
* `BLOCKED` — the validation could not be executed because of an explicit blocker.

Rules:

1. Never claim an unexecuted test passed.
2. Do not fabricate command output, test results, build results, coverage, or security scan results.
3. Distinguish commands that were executed from commands the user must execute.
4. Record relevant environment requirements, prerequisites, and blockers.
5. If a test fails, report the actual failure and the required corrective action.
6. If the environment prevents validation, identify exactly what remains unverified.

### 3.6 Mandatory Completion Gate

Do not mark Section 3 complete until all applicable conditions below are satisfied:

* [ ] Relevant existing codebase files have been inspected, with exact paths and complete current contents presented as required by Section 0.
* [ ] The complete file inventory is provided.
* [ ] Every required `CREATE` and `MODIFY` file has its complete final contents.
* [ ] All implementation-relevant Finding IDs are traceable to files and tests.
* [ ] Cross-file dependencies and compatibility have been reviewed.
* [ ] Required functional and security tests are identified.
* [ ] Validation results are reported honestly.
* [ ] Limitations, blockers, and unresolved items are explicitly disclosed.
* [ ] Repository changes are claimed only if they were actually applied and verified.

If any applicable condition remains incomplete, explicitly list the outstanding item, its exact file path or requirement, its impact, and the next feasible action. Continue all feasible work.

**Analysis, recommendations, file inventories, partial code, diffs, and recovery procedures do not substitute for complete implementation deliverables.**

---

## 4. Complete Step-by-Step Runbook

### 4.1 Runbook Requirements

* Generate the complete runbook directly in this conversation.
* Do not create or generate a runbook file.
* Do not use a text editor or document editor to produce the runbook.
* Keep the runbook simple, direct, concise, explicit, and complete.
* Include only the steps required to implement, configure, run, test, verify, and complete the solution.
* Assume the user will execute the commands exactly as written.
* Do not require the user to invent missing implementation details.
* Use the exact paths, versions, commands, configuration values, and prerequisites verified in the repository or explicitly established by the implementation.
* Section 3 contains the complete final file contents. Section 4 contains the execution procedure only.

### 4.2 Strict Sequential Format

Present the runbook in this order:

```text
Step 1
Step 2
Step 3
...
```

For every step, include exactly these fields:

**Action**

What the user must do.

**Command**

The exact command or commands the user must run, when applicable. If no command is required, state `N/A`.

**File**

Only the exact file path or filename when a file must be created or modified. Do not repeat file contents here. If no file is involved, state `N/A`.

**Expected Result**

The concrete output or verifiable condition that must be true before continuing.

**Related Finding IDs**

Use only existing Finding IDs established in Section 2, for example `F-001, F-004, F-009`. If a step genuinely has no applicable research finding, state `N/A` and explain why.

### 4.3 Runbook Coverage

Include all steps necessary for the actual implementation, in dependency order:

1. Prerequisites and environment checks.
2. Repository and branch verification.
3. Configuration and required environment variables.
4. File creation or modification using the complete contents in Section 3.
5. Dependency installation or update.
6. Build and static checks.
7. Service startup or runtime execution, where applicable.
8. Functional tests.
9. Security verification.
10. Required failure-path checks.
11. Final state and acceptance verification.

Do not include irrelevant or optional steps. If a category does not apply to the actual implementation, explicitly state why it is not required rather than adding unnecessary commands.

### 4.4 Runbook Safety and Accuracy

* Every implementation, configuration, security, testing, and verification step must include the applicable existing Finding IDs.
* Do not invent Finding IDs.
* Every command must be explicit and copy-pasteable.
* Do not use unexplained placeholders or ask the user to determine unspecified values.
* Identify exact file paths for all file operations.
* Do not repeat file contents in the runbook.
* Ensure that commands are compatible with the actual project tooling and supported environment.
* State expected output or a concrete pass condition for every step.
* Include cleanup, rollback, or failure checks when they are required for safe completion.
* Never claim that a command was executed when it was only provided for the user.

### 4.5 Final Acceptance Criteria

The final runbook step must define explicit acceptance criteria covering:

* Required files and repository state.
* Configuration and runtime readiness.
* Build and test results.
* Security-critical requirements.
* Traceability from findings to implementation and tests.
* Required documentation and runbook consistency.
* Outstanding failures, blockers, and limitations.

The implementation may be marked `COMPLETE` only when every mandatory acceptance criterion has been verified. Otherwise, report `INCOMPLETE` or `BLOCKED`, identify each unmet criterion, and state the next required action.

---

## Required Final Output Order

1. **Codebase Inspection** — inspection inventory followed by the exact paths and complete current contents of all relevant files inspected.
2. **Research Findings Summary** — findings table with stable Finding IDs and authoritative sources.
3. **Implementation Deliverables** — file inventory, traceability matrix, complete final file contents, cross-file consistency review, and validation results.
4. **Complete Step-by-Step Runbook** — execution procedure only, in strict sequential order.
5. **Completion Status** — `COMPLETE`, `INCOMPLETE`, or `BLOCKED`, supported by the mandatory completion and acceptance gates.

**Non-negotiable rule:** Never substitute an inventory, summary, snippet, diff, assumption, or statement of completion for the required exact paths and complete file contents. Report what was actually inspected, what was actually implemented, what was actually tested, and what remains outstanding.
````

---

# Create PR

````text
1. Pull/update `main` and use it as the base branch.

2. Create a dedicated branch:

   ```text
   fix/<short-description>
   ```

3. Make only the bug-related changes on that branch.

4. Add/update regression tests.

5. Compare the branch against `main` and review the diff.

6. Create a PR:

   ```text
   base: main
   head: fix/<short-description>
   ```

7. Write the PR with:

   ```text
   Summary
   Root cause
   Changes
   Validation
   ```

8. Keep **one bug = one focused branch = one PR**.
````


---

````text
# Internal Code Review

Perform an **Internal Code Review** of the code you generated in the previous round.

## Primary Artifact and Repository Role

**Important:** The **code generated in the previous round is the PRIMARY ARTIFACT being reviewed, corrected, and improved.**

The GitHub repository is **REFERENCE-ONLY**.

The repository must be used only to:

* validate compatibility with the existing codebase;
* verify imports, functions, classes, APIs, dependencies, versions, configuration, file paths, naming, and project conventions;
* verify integration points;
* verify that proposed corrections do not conflict with the actual codebase.

The repository is **NOT** the primary artifact being rewritten.

Do **not** redesign the project based solely on the repository.

Do **not** modify the GitHub repository.

---

# Required Inputs

You must review all of the following:

### 1. Previous Deep Research Findings

Read and use the **Previous Deep Research Findings** as the security, architecture, and design reference.

### 2. Current Codebase Repository

Use the **GitHub Connector** to open and read the repository:

https://github.com/0n6k4v-Coder/openai-secure-mcp-tunnel

**Mandatory requirement:**

* You MUST use the **GitHub Connector** to read the repository.
* Do not rely only on memory, prior conversation context, or assumptions about repository contents.
* Read the actual repository files needed for compatibility validation.
* Treat the GitHub repository as **reference-only**.

### 3. Previously Generated Code

Read the **complete code generated in the previous round**.

The previously generated code is the primary artifact under review.

### 4. Cross-Check

Compare:

1. Previous Deep Research Findings
2. Actual GitHub repository contents
3. Previously generated code

Then perform a complete internal review of the previously generated code.

### 5. Improve

Correct every defect, inconsistency, incompatibility, security issue, missing requirement, or implementation mistake found in the previously generated code.

---

# Mandatory Review Sequence

Perform the review in this order:

## Sequence 1 — Research Validation

Read the Previous Deep Research Findings.

Identify which findings are relevant to the reviewed code.

Do not invent new research findings unless additional verification is necessary.

---

## Sequence 2 — Repository Validation

Use the **GitHub Connector** to inspect the actual repository.

Validate:

* repository structure;
* relevant source files;
* relevant tests;
* `pyproject.toml`;
* configuration files;
* existing APIs;
* existing functions/classes;
* dependency versions;
* naming conventions;
* integration points;
* security boundaries.

Do not assume that repository files match previously generated code.

---

## Sequence 3 — Generated-Code Review

Review the **previously generated code first**.

Check for:

* incorrect imports;
* nonexistent APIs;
* nonexistent functions;
* wrong file paths;
* incorrect dependency assumptions;
* incorrect versions;
* incompatible function signatures;
* invalid CLI behavior;
* incorrect security boundaries;
* unsafe privilege assumptions;
* incorrect filesystem behavior;
* incorrect lifecycle behavior;
* incorrect error handling;
* missing rollback behavior;
* missing validation;
* missing tests;
* incorrect integration behavior;
* mismatch with the research findings;
* mismatch with the actual repository.

---

## Sequence 4 — Defect Classification

Classify every discovered issue.

Do not omit minor issues if they affect correctness, compatibility, security, maintainability, or the requested design.

Every issue must have:

* unique ID;
* severity;
* file/area;
* exact problem;
* impact;
* resolution.

---

## Sequence 5 — Correction

Correct the previously generated code.

The correction must:

* preserve the original design and intent wherever possible;
* preserve existing correct security controls;
* make only changes necessary to correct defects or incompatibilities;
* remain compatible with the actual repository;
* remain consistent with the research findings.

Do not silently replace the entire design with an unrelated architecture.

---

## Sequence 6 — Final File Classification

After corrections, classify **EVERY reviewed file** into exactly one of these two categories:

### A. Resolved Code

The file was generated previously and must be changed.

### B. Previous Correct Code

The file was generated previously and does not require any change.

**Every reviewed file MUST appear in exactly one of these two sections.**

No reviewed file may:

* appear in both sections;
* be omitted from both sections;
* appear only in the mistake table;
* appear only as a filename without its complete contents.

---

# Expected Results

## 1. Research Findings

Provide the relevant research findings used for this review.

For each finding, explain briefly why it matters to the reviewed code.

---

# 2. Mistake Summary Table

Provide a table containing **EVERY** mistake, inconsistency, missing requirement, security issue, compatibility issue, or implementation defect found in the **previously generated code**.

Use exactly this structure:

| ID | Severity | File / Area | Mistake | Impact | Resolution |
| -- | -------- | ----------- | ------- | ------ | ---------- |

Severity should use:

* Critical
* High
* Medium
* Low

Each mistake must reference the relevant file or area precisely.

---

# 3. Resolved Code

This section contains **EVERY previously generated file that must be changed**.

## Mandatory File Presentation Format

For **EVERY file**, present the files in an explicit sequential order.

Use:

### Sequence N

```text
Exact File Path:
<exact repository-relative path>
```

```<language>
<COMPLETE FINAL FILE CONTENT>
```

### Mandatory Requirements

For every file in **Resolved Code**:

1. Provide a **Sequence Number**.
2. Provide the **Exact File Path**.
3. Provide **ONE COMPLETE FULL CODE BLOCK**.
4. Provide the **entire final file contents**.
5. Do not provide snippets.
6. Do not provide patches.
7. Do not use `...`.
8. Do not omit unchanged sections.
9. Do not replace sections with comments such as:

   * `# existing code`
   * `# unchanged`
   * `# rest of file`
   * `// existing code`
   * `...`
10. The code block must represent the **complete final file** that should exist after applying the review.
11. The final file must be validated against the actual repository.
12. The file path must be exact and repository-relative.

### Example

### Sequence 1

```text
Exact File Path:
src/local_mcp_server/cli.py
```

```python
<ENTIRE FINAL FILE CONTENTS>
```

---

# 4. Previous Correct Code

This section contains **EVERY previously generated file that is already correct and requires no changes**.

## Mandatory File Presentation Format

The format for **Previous Correct Code MUST be EXACTLY as complete as Resolved Code**.

Do NOT provide only filenames.

Do NOT provide summaries.

Do NOT provide excerpts.

Do NOT provide snippets.

For **EVERY correct file**, present:

### Sequence N

```text
Exact File Path:
<exact repository-relative path>
```

```<language>
<COMPLETE CURRENT FILE CONTENT>
```

### Mandatory Requirements

For every file in **Previous Correct Code**:

1. Provide a **Sequence Number**.
2. Provide the **Exact File Path**.
3. Provide **ONE COMPLETE FULL CODE BLOCK**.
4. Provide the **entire current file contents**.
5. Do not provide snippets.
6. Do not provide patches.
7. Do not use `...`.
8. Do not omit any section of the file.
9. Do not replace any section with comments such as:

   * `# unchanged`
   * `# existing code`
   * `# rest of file`
   * `...`
10. The file must be the **actual current repository-compatible file contents**.
11. The path must be exact and repository-relative.

### Example

### Sequence 5

```text
Exact File Path:
src/local_mcp_server/server.py
```

```python
<ENTIRE CURRENT FILE CONTENTS>
```

---

# 5. File Sequence Order

The final code presentation must use a **deterministic sequence order**.

Use the following ordering rule:

1. Files that must be changed first, under **Resolved Code**.
2. Within Resolved Code, order files by dependency/integration order:

   * foundational/shared modules;
   * security/authorization modules;
   * core implementation;
   * CLI/interface modules;
   * tests;
   * configuration/project metadata.
3. Then present all unchanged files under **Previous Correct Code**.
4. Within Previous Correct Code, use the same dependency/integration ordering.

Every file must have a unique sequence number across the complete code presentation.

Example:

```text
Sequence 1 — Resolved Code
Sequence 2 — Resolved Code
Sequence 3 — Resolved Code
Sequence 4 — Resolved Code

Sequence 5 — Previous Correct Code
Sequence 6 — Previous Correct Code
Sequence 7 — Previous Correct Code
```

Do not reset numbering between sections.

---

# Mandatory Completeness Rule

This rule is strict.

For **EVERY file included in Resolved Code OR Previous Correct Code**, you MUST provide:

1. Exact File Path
2. Sequence Number
3. One complete code block
4. Entire file contents

There must be **zero partial files**.

There must be **zero omitted sections**.

There must be **zero patch/diff representations**.

There must be **zero ellipses**.

There must be **zero placeholder sections**.

---

# Mandatory File Accounting Rule

Before finishing the response, verify that:

> **Every reviewed/generated file appears exactly once in the final code presentation.**

Each file must satisfy exactly one of these:

```text
Resolved Code
```

or

```text
Previous Correct Code
```

A file MUST NOT:

* appear in both;
* be missing;
* be listed without full contents;
* be mentioned as changed without its full final contents;
* be mentioned as correct without its full current contents.

---

# Mandatory Consistency Rule

The following three things must be consistent:

1. Mistake Summary Table
2. Resolved Code
3. Previous Correct Code

For every mistake that requires a code change:

* the affected file must appear in **Resolved Code**;
* the final contents must contain the correction.

For every file stated to be correct:

* it must appear in **Previous Correct Code**;
* the provided contents must be the complete current file contents.

Do not claim that a file is correct while modifying it elsewhere.

---

# Review Rules

* Do not guess.
* Use the **GitHub Connector** to inspect the actual repository.
* Use actual repository contents as the compatibility reference.
* The previously generated code remains the **primary artifact** under review.
* Do not assume that previously generated code is correct.
* Validate every proposed correction against the research findings.
* Identify even a single defect.
* Check security boundaries, API compatibility, lifecycle behavior, error handling, tests, and integration points.
* Preserve existing correct security controls.
* Check imports, file paths, existing functions/classes, APIs, dependencies, versions, configuration, naming, and project conventions.
* Do not invent files, APIs, imports, commands, or architecture that do not exist in the repository unless explicitly required by the reviewed design.
* Do not redesign unrelated parts of the project.
* Do not silently change requirements.
* Do not modify the GitHub repository.
* Do not commit.
* Do not push.
* Do not create branches.
* Do not create pull requests.
* Do not make any GitHub-side changes.
* The repository is **reference-only**.
* The previously generated code is what must be corrected.
* If a file is modified, return the **entire final file**.
* If a file is correct, return the **entire existing file** under **Previous Correct Code**.
* Do not return partial files.

---

# Final Validation Checklist

Before producing the final answer, perform this checklist:

### Research

* [ ] Relevant Previous Deep Research Findings were reviewed.
* [ ] Research findings used in the review are identified.

### Repository

* [ ] GitHub Connector was used.
* [ ] Actual repository files were inspected.
* [ ] Compatibility was checked against the real repository.
* [ ] No GitHub repository modifications were made.

### Review

* [ ] Previously generated code was treated as the primary artifact.
* [ ] Every previously generated file was reviewed.
* [ ] Every defect was recorded in the Mistake Summary Table.
* [ ] Security boundaries were reviewed.
* [ ] API compatibility was reviewed.
* [ ] Lifecycle behavior was reviewed.
* [ ] Error handling was reviewed.
* [ ] Tests and integration points were reviewed.

### Code Output

* [ ] Every changed file appears in Resolved Code.
* [ ] Every changed file has an exact path.
* [ ] Every changed file has complete final contents.
* [ ] Every unchanged correct file appears in Previous Correct Code.
* [ ] Every unchanged correct file has an exact path.
* [ ] Every unchanged correct file has complete current contents.
* [ ] Every file has a Sequence Number.
* [ ] Sequence Numbers are globally unique.
* [ ] Sequence order is deterministic.
* [ ] No file appears in both sections.
* [ ] No reviewed file is omitted.
* [ ] No snippets are used.
* [ ] No patches are used.
* [ ] No ellipses are used.
* [ ] No placeholder text is used.
* [ ] No partial files are used.

---

# Verified Runtime Capabilities

| Capability                                                        | Verified |
| ----------------------------------------------------------------- | -------- |
| Read GitHub repositories                                          | ✅        |
| Read repository files                                             | ✅        |
| Read multiple source files for code review                        | ✅        |
| Inspect GitHub repository metadata                                | ✅        |
| Search GitHub code and resources                                  | ✅        |
| Review GitHub diffs, commits, and pull requests                   | ✅        |
| Analyze application architecture                                  | ✅        |
| Analyze security architecture and boundaries                      | ✅        |
| Run Python code                                                   | ✅        |
| Run shell commands                                                | ✅        |
| Run Git commands                                                  | ✅        |
| Create and modify files in the current runtime                    | ✅        |
| Run scripts and static-analysis commands available in the runtime | ✅        |
| Read user-uploaded files                                          | ✅        |
| Perform web research and verify current documentation             | ✅        |
| Generate exact full-file code changes                             | ✅        |
| Design and generate test cases                                    | ✅        |
| Analyze test results and diagnose failures                        | ✅        |
````

---

# Autonomous Execution Contract

````text
You are operating as an autonomous senior software engineer.

Your job is not to provide guidance, suggestions, or progress updates.
Your job is to complete the engineering task.

EXECUTION RULES:

1. Start executing immediately.
2. Do not describe what you are going to do.
3. Do not provide progress reports.
4. Do not stop after partial investigation.
5. Do not ask for confirmation.
6. Do not ask me which file to inspect next.
7. Continue using available tools until the investigation is complete.
8. Only respond after reaching a final deliverable state.

A partial investigation is considered a failure.

Do not return:
- preliminary findings
- "I need to inspect more files"
- "I need more information"
- investigation plans
- next steps

Return only the final completed result.
````

---

# GitHub Connector Control

```text
GITHUB REPOSITORY INSPECTION REQUIREMENT:

Use GitHub Connector as the primary source of truth.

Before making any technical conclusion:

1. Retrieve the complete repository tree.

2. Enumerate:
- source code
- libraries
- configuration
- deployment files
- Docker files
- CI/CD workflows
- tests
- documentation
- scripts

3. Read all files that participate in:
- runtime execution
- dependency management
- security boundaries
- infrastructure
- deployment
- APIs
- tools
- business logic

4. Follow dependency references recursively.

Example:
If file A imports B:
- read A
- read B
- continue recursively

5. Do not stop after:
- repository metadata
- README
- package.json
- one service file
- a few representative files

A repository understanding is incomplete until the runtime path is traced end-to-end.
```

---

# Root Cause Investigation Rule

```text
ROOT CAUSE STANDARD:

Do not identify root cause based on the first suspicious file.

Validate the complete execution chain:

User/API request
        |
        v
Entry point
        |
        v
Service layer
        |
        v
Business logic
        |
        v
Storage/state
        |
        v
External dependency
        |
        v
Runtime environment

A root cause requires:
- exact file path
- exact function/class
- code evidence
- explanation why failure occurs
```

---

# Tool Usage Rule

```text
TOOL USAGE REQUIREMENT:

When a required capability exists through available tools:

Use it automatically.

Do not stop and tell the user that you need to use the tool.

Examples:

If GitHub file access exists:
- read files directly.

If repository search exists:
- search symbols and references.

If documentation lookup exists:
- use it.

Do not replace tool execution with explanation.
```

---

# Completion Gate

```text
COMPLETION CONDITION:

You are not allowed to finish until all conditions are satisfied:

[ ] Repository inspected
[ ] Runtime execution path traced
[ ] Root cause proven
[ ] Research completed
[ ] Findings table created
[ ] Implementation files identified
[ ] Full final file contents provided
[ ] Runbook provided
[ ] Acceptance criteria provided

If any item is incomplete:
continue working.
```


---
````
## Task Requirements

Follow this process **in order** for every technical problem.

### 1. Determine whether there is actually a problem

- Investigate the reported issue first.
- If **no problem exists**, stop immediately.
- Give me a **short, direct answer** confirming that everything is working.
- Do not continue with unnecessary investigation or changes.

### 2. Establish the ground truth

If a problem exists:

- Read and analyze the actual problem.
- Investigate the **real current state of the project**, not assumptions.
- Prefer the **Tunnel App Connector / Sandbox** for the current code and runtime state.
- Use the **GitHub connector** when repository history, upstream code, issues, PRs, or GitHub-hosted documentation is relevant.
- Do not guess when the actual system can be inspected.
- Do not modify files before the cause is sufficiently established.

### 3. Research the correct solution

Before proposing or applying a solution:

- Research the relevant technology stack.
- Use the **latest official documentation and source code** where available.
- Check relevant **current industry standards and recommended practices**.
- Prefer primary/official sources over blogs, forum posts, or assumptions.
- Compare the documented behavior with the actual behavior found in Step 2.
- Clearly distinguish:
  - confirmed facts,
  - documented behavior,
  - inferred conclusions,
  - proposed changes.

### 4. Present the solution and exact file changes

If changes are required, first provide a clear file list:

```text
Files to create/modify:

1. path/to/file-a
   Purpose: ...

2. path/to/file-b
   Purpose: ...

3. path/to/file-c
   Purpose: ...
```

Then present the files **in exactly the same sequence**:

#### File 1 — `path/to/file-a`

Provide the **complete final file contents**.

#### File 2 — `path/to/file-b`

Provide the **complete final file contents**.

#### File 3 — `path/to/file-c`

Provide the **complete final file contents**.

Rules:

- No snippets.
- No diffs.
- No placeholders such as `...`.
- No omitted sections.
- Every file must be complete and directly usable.
- Keep the file order consistent between the file list and the detailed contents.
- Do not include unrelated changes.
- Preserve existing working functionality unless there is a specific reason to change it.

### 5. Provide verification commands

Provide a **complete sequential verification procedure**:

```text
Step 1 — ...
command

Expected result:
...

Step 2 — ...
command

Expected result:
...

Step 3 — ...
command

Expected result:
...
```

Requirements:

- Commands must be in execution order.
- Use the actual project paths and environment.
- Include expected results.
- Verify both the specific fix and any important existing functionality affected by the change.
- For Docker Compose commands, always use:

```bash
docker compose --env-file .env -f deploy/compose.yaml ...
```

### Overall rule

**Investigate first → establish ground truth → research official/current sources → propose the minimal correct solution → provide complete files → verify sequentially.**

Do **not** use trial-and-error configuration changes when the actual system, source code, or official documentation can establish the correct answer.
````

---

```
Rule: 
- Never end an unfinished task with a dead-end answer. 
- Always state the exact next step. 
- If results are needed, provide the exact command to execute. 
- If code changes are required, explicitly identify the files and changes needed.

Source Code Convention:
- Use https://github.com/0n6k4v-Coder/openai-secure-mcp-tunnel as the single source of truth for repository source code and file contents.
- If a file is needed, read it directly from the GitHub repository; never ask the user to send or paste it.
- Prefer the current repository contents over information from earlier conversation context.

Deep research
- Research the latest official **MCP Server documentation**.
- Research the latest official documentation for all relevant **technology-stack components**.
- Research relevant and current **industry standards**.
- Use the research to establish the technical basis for the implementation.
```

```
Rule: 
- Never end an unfinished task with a dead-end answer. 
- Always state the exact next step. 
- If results are needed, provide the exact command to execute. 
- If code changes are required, explicitly identify the files and changes needed.

**Source Code Convention:**
- Use the `openai-tunnel` sandbox via **OpenAI Secure MCP Tunnel** as the single source of truth for repository source code and file contents.
- When repository files are needed, read them directly from the `/workspace/project` checkout in the `openai-tunnel` sandbox.
- Prefer the current repository contents in the `openai-tunnel` sandbox over information from earlier conversation context.
- Do not ask the user to send or paste repository files.
- Do not infer repository structure, file contents, APIs, or implementation details from memory or previous conversation context when the current repository can be inspected directly.
- Before proposing or applying code changes, inspect the relevant current files in the `openai-tunnel` sandbox first.
- When GitHub and the `openai-tunnel` sandbox differ, treat the current `openai-tunnel` checkout as the authoritative source for the working codebase.

Deep research
- Research the latest official **MCP Server documentation**.
- Research the latest official documentation for all relevant **technology-stack components**.
- Research relevant and current **industry standards**.
- Use the research to establish the technical basis for the implementation.
```

```text
Please provide the commit command, along with a simple, clear, direct, explicit, and concise commit message and an extended description.
```

```text
# Continuous Debug / Fix Execution Prompt

When I assign you a **Debug / Fix** task, treat it as a **continuous task**. Continue working autonomously until the task reaches **DONE / VERIFIED** status.

## 1. Core Execution Rules

1. **Do not stop at an initial root cause.**
   Finding a plausible root cause is not the same as fixing the problem.

2. **Do not stop to announce what you are going to investigate next.**
   If you can investigate or act, do it first and report the result afterward.

3. **Use available tools immediately.**
   If you have access to source code, GitHub, web research, files, logs, connected systems, or other relevant tools, use them without waiting for permission.

4. Continuously execute this loop:

   **Inspect → Gather Evidence → Determine Cause → Fix → Verify → If Failed, Investigate Further → Fix → Verify Again**

5. Continue autonomously until one of these conditions is met:
   - The problem is actually fixed.
   - Verification passes.
   - A genuine blocker prevents further progress and requires an action that only I can perform.

6. If the task has multiple steps, complete **all steps you can perform yourself** before asking me to do anything.

7. **Do not ask me to run commands merely to collect information that you can obtain yourself** through available tools or source inspection.

8. If a command genuinely must be executed on my machine:
   - Stop only at that point.
   - Give me **exactly one command**, the most necessary command at that moment.
   - Make it immediately copy/pasteable.
   - Do not give multiple diagnostic commands at once.

9. When I provide the command result, **continue the task immediately** from the current state.
   Do not restart the workflow or re-explain the process.

10. **Do not repeat checks that have already been proven**, unless new evidence makes the previous conclusion questionable.

11. If any previous recommendation from you was incorrect, explicitly state:

   **“The previous recommendation was incorrect and is now cancelled.”**

   Then continue from the current state. Do not keep building on the incorrect recommendation.

12. **Do not present multiple alternatives while there is still a primary hypothesis that can be directly tested.**

13. **Change one isolated configuration point at a time** whenever the root cause can still be isolated.

14. **Never commit changes unless I explicitly ask you to commit.**

15. When modifying a file:
   - Use the repository I specify as the **single source of truth**.
   - Read the relevant file directly from that repository.
   - Make only the changes proven to be necessary.
   - Always provide the **complete Full File** after the change.
   - Never provide only a snippet or diff when presenting the modified file.

---

# 2. Source Code and Research Rules

When the task involves a repository, use the repository I specify as the authoritative source for source code and file contents.

Do not ask me to paste files that you can retrieve through available tools.

For technical debugging, research the relevant current documentation before making architectural or configuration decisions, including:

- Official MCP Server documentation.
- Official documentation for the relevant technology-stack components.
- Current official project documentation and source code.
- Relevant current industry standards where applicable.

Use this research as the technical basis for implementation and verification.

Prefer **current upstream/source documentation** over assumptions, memory, or outdated examples.

---

# 3. Evidence Standards

Separate the following clearly:

### Proven
Facts directly established by:
- Source code
- Logs
- Command output
- Official documentation
- Reproducible tests
- Successful verification

### Hypothesis
A technically plausible explanation that has not yet been verified.

If the root cause is not yet proven, explicitly state:

**“Not yet confirmed.”**

Then continue investigating instead of stopping.

Never present a hypothesis as a confirmed root cause.

---

# 4. Debugging Response Structure

Use the following structure **only when there is a meaningful debugging result to report**.

## Root Cause

- State what has been proven.
- Clearly separate the **root cause** from its symptoms.
- If it is not yet confirmed, say:
  **“Not yet confirmed.”**
- Continue investigating instead of ending the task.

## What Has Been Done

- Report only actions that were actually performed.
- Include the relevant results/evidence.
- Do not report future plans as completed work.
- Do not fill this section with actions that have not happened yet.

## What Needs to Be Changed

- Identify the exact files that must be changed.
- Describe only changes proven to be necessary.
- If no file changes are required, state:
  **“No changes required.”**

## What I Need to Do Now

Include this section **only when an action genuinely must be performed on my machine**.

- Provide exactly one copy/pasteable command.
- Give only the single next step required.
- Do not give a list of commands.
- After I return the result, immediately continue debugging from that state.

## Verification

- State what has already been verified.
- State the expected result.
- State the actual result.
- If verification fails, **continue debugging instead of ending the response**.

## DONE

Declare **DONE** only when all of the following are true:

- The root cause has been fixed.
- Verification passes.
- There are no known unresolved blockers.
- The system behaves according to the original requirement.

---

# 5. Execution Priority

When debugging, prioritize actions in this order:

1. **Inspect the actual current state.**
2. **Gather objective evidence.**
3. **Identify the smallest testable root cause.**
4. **Make the smallest necessary change.**
5. **Verify the change.**
6. If verification fails, use the new evidence to continue debugging.
7. Repeat until **VERIFIED / DONE**.

Do not make broad architectural changes when a narrow fix can be tested.

Do not modify multiple unrelated configuration points at once.

Do not declare success based only on a theoretical explanation.

---

# 6. Most Important Rule

**Do the work before reporting the work.**

Do not primarily tell me what you *are going to do*.

Instead:

**Inspect → Act → Verify → Report the actual result.**

Do not end a task merely because you found a theoretical answer.

Your responsibility is to **drive the task all the way to VERIFIED / DONE**, not merely tell me what I should do next.

The goal is not to provide advice.

The goal is to **solve, verify, and complete the task**.
```

---

# Verify Command Prompt

```text
# Verify Command Prompt
- Inspect the actual source before giving any command.
- Verify exact syntax, arguments, flags, paths, and env vars.
- Never guess or infer CLI syntax.
- If unverified, do not provide the command.
- Give only commands confirmed by source or official docs.
```

---
Autonomous Execute Prompt
```text
Autonomous Execute Prompt
- Execute the task **end-to-end autonomously**.
- Do **not** stop after each step or hand me a “next step”.
- After every result: **analyze → decide → act → verify → continue**.
- Use all available tools, source code, documentation, logs, and diagnostics before asking me for anything.
- If something fails, **debug and continue automatically**; do not stop at the first failure.
- Do not ask me to run commands unless you genuinely cannot perform the action yourself.
- Make changes only when supported by evidence; do not guess or redesign unnecessarily.
- After making changes, **test and verify the actual result**.
- If a previous assumption/recommendation was wrong, explicitly cancel it and continue from the corrected understanding.
- Keep working until:
  - **Completed and verified**, or
  - **A genuine blocker remains** that only I can resolve.
- If blocked, state **one exact blocker + one exact action** required from me, then continue immediately once resolved.
- **Do the work, don't just describe the work.**
```

---

# Perform audit

```text
Use [$openai-secure-mcp-tunnel](app://asdk_app_6abbd7185ee48191ac256e105d47128e) to access the `openai-tunnel` sandbox.

- Perform the most comprehensive and in-depth codebase audit possible.
- Use the actual source at `/workspace/project` as the single source of truth.
- Do not rely on assumptions, GitHub, or previous context when the source can be inspected.
```

---

````
Using [@OpenAI Secure MCP Tunnel](plugin://dev-6abbd7185ee48191ac256e105d47128e@created-by-me-remote) access openai-tunnel sandbox and use it codebase as a SSOT

My Request:
I like to see a complete, step-by-step runbook for implementing 
- 7.1 Create and List
- 7.2 Status and Logs
- 7.3 Start, Stop, Restart, Repair, Recreate, and Delete
- 7.4 Execute Commands
e2e comprehensive test files.
Each file must be able to proceed an autonomous update test status in test item table at tests/e2e/reports/mcp.md. It will update item by item

Our Conventions:
Use [$openai-secure-mcp-tunnel](app://asdk_app_6abbd7185ee48191ac256e105d47128e) to access the `openai-tunnel` sandbox.

- Perform the most comprehensive and in-depth codebase audit possible.
- Use the actual source at `/workspace/project` as the single source of truth.
- Do not rely on assumptions, GitHub, or previous context when the source can be inspected.

# Verify MCP Host Executable Command
- Inspect the actual source before giving any MCP Host Executable Command. 
- Verify exact syntax, arguments, flags, paths, and env vars. 
- Never guess or infer MCP Host Executable Command syntax. 
- If unverified, do not provide the MCP Host Executable Command. 
- Give only MCP Host Executable Command confirmed by source or official docs.

Your Task:
1. **Deep research**

   * Research the latest official **MCP Server documentation**.
   * Research the latest official documentation for all relevant **technology-stack components**.
   * Research relevant and current **industry standards**.
   * Use the research to establish the technical basis for the implementation.

2. **Research findings summary**

   * Present the findings as a **clear table**, not just prose.
   * Include a unique **Finding ID** for every finding so it can be referenced later.
   * Design the table with the necessary columns to make each finding easy to understand and trace. For example:

   | Finding ID | Area | Finding | Why It Matters | Source / Standard | Version / Date | Implementation Impact |
   | ---------- | ---- | ------- | -------------- | ----------------- | -------------- | --------------------- |

   * Add other columns where useful, but keep the structure clear and practical.

### 3. **Exact Files and Full Code**

* Generate the complete implementation files **directly in this conversation**.
* **Do not create or generate files outside the conversation.**
* **Do not use a text editor or document editor.**
* For **every file that must be created or modified**, provide:

  * The **exact file path**
  * The **complete final file contents**
* **Do not provide snippets, patches, diffs, partial files, placeholders, ellipses, or “unchanged” sections.**
* Include **only files that must actually be created or modified**.
* Do not omit any required file.
* The files must be sufficient to implement the complete solution without requiring the user to reconstruct missing code.
* Do not invent files, APIs, configuration, schema, or implementation details that are not required by the established design and research findings.

---

### 4. **Complete Step-By-Step Runbook**

* Generate the complete runbook **directly in this conversation**.
* **Do not create or generate a file.**
* **Do not use a text editor or document editor.**
* The runbook must be **simple, clear, direct, explicit, concise, and complete**.
* Include **only the steps required** to implement, configure, run, test, verify, and complete the solution.
* Do not include unrelated information, optional steps, or unnecessary explanations.
* Assume the user will execute the commands **exactly as written**.
* Do not require the user to determine missing implementation details independently.

Present the runbook in a **strict sequential order**:

```text
Step 1
Step 2
Step 3
...
```

For every step, include exactly:

**Action**
What the user must do.

**Command**
The exact command(s) the user must run, when applicable.

**File**
Only the **file path/name** when a file must be created or modified.
Do **not** repeat the file contents here; the complete contents are already provided in Section 3.

**Expected Result**
The exact result the user should see or the condition that must be true before continuing.

**Related Finding IDs**
`F-001, F-004, F-009`

Rules:

* Every implementation, configuration, security, testing, and verification step must include **Related Finding IDs**.
* The Finding IDs must correspond directly to the research findings supporting that step.
* Use **existing research Finding IDs only**.
* **Do not invent new Finding IDs.**
* Every command must be explicit and copy-pasteable.
* Every expected result must be concrete and verifiable.
* When a step requires creating or modifying a file, identify the file by its **exact path**, but do not repeat its contents.
* The runbook must cover the complete process **from start to finish**, including:

  * prerequisites
  * environment/configuration
  * file creation/modification
  * dependency installation/update
  * build
  * service startup
  * verification
  * functional testing
  * security verification
  * failure checks required before declaring success
* The final step must define the **final acceptance criteria** for the implementation.
* The complete runbook must be executable **without the user having to infer, invent, or fill in missing steps**.
* Section 3 contains the complete file contents. Section 4 contains the **execution procedure only**.
````

---

```
Using OpenAI Secure MCP Tunnel access openai-tunnel sandbox. Apply all of these files direct to my codebase and leave test execute command for me right here.
```

```
using OpenAI Secure MCP Tunnel access to openai-tunnel sandbox.

Execute git diff command direct to sandbox terminal and inspect every single change on my codebase and present the commit command, along with a simple, clear, direct, explicit, and concise commit message and an extended description to me here.
```

---

```
## Task: Comprehensive Repository Audit

**Target Repository:** <url>
Use the [$github](app://connector_76869538009648d5b282a4bb21c3d157) to access and audit the entire target repository.

### Audit Requirements
1. **Inspect the entire repository.** Examine all accessible files, not just documentation, metadata, or selected source files.
2. **Trace code and dependencies.** Follow imports, function calls, entry points, dependencies, and execution paths across the codebase.
3. **Map end-to-end flows.** Trace initialization, configuration, runtime behavior, component interactions, errors, shutdown, and cleanup.
4. **Inspect implementation and infrastructure.** Review source code, configuration, dependencies, build files, Docker, Compose, scripts, tests, CI, TLS, lifecycle management, and uninstall procedures.
5. **Audit security and reliability.** Identify vulnerabilities, failure modes, resource leaks, unsafe assumptions, configuration risks, concurrency issues, and dependency risks.
6. **Verify actual behavior.** Compare documentation with implementation. Separate confirmed facts, inferences, and unresolved questions.
7. **Track inspection coverage.** Record inspected and uninspected files, traced components, investigated execution paths, and remaining gaps.
8. **Support findings with evidence.** Reference file paths, symbols, line numbers, and relevant code relationships. Explain the evidence behind each finding.
9. **Analyze component interactions.** Trace data flow, control flow, configuration, process boundaries, external interfaces, and resource ownership across components.
10. **Evaluate tests and validation.** Examine test coverage, test cases, CI, build checks, and validation scripts. Identify missing coverage and never claim tests ran unless they did.
11. **Validate suspected issues.** Trace potential defects to their root causes, examine safeguards and affected components, and distinguish confirmed issues from speculation.
12. **Assess the system as a whole.** Connect architecture, runtime behavior, security boundaries, dependencies, failure scenarios, and lifecycle management into a coherent understanding.
```

---

```text
### Execution Convention

* **Continue Until Complete:** Fulfill all requested tasks and deliverables before concluding.
* **Act Proactively:** Use available tools and resources to execute tasks, resolve blockers, and avoid unnecessary user intervention.
* **No Premature Stopping:** Continue meaningful work instead of delivering partial results when further progress is possible.
* **Verify Before Concluding:** Validate results against the original requirements and acceptance criteria.
* **Be Transparent:** Report genuine blockers, limitations, and unverified results honestly. Never claim incomplete work is complete.
```

# Response Convention:

```text
Keep responses concise and focus only on essential information. Remove redundant explanations, introductions, repeated conclusions, and statements about your own intentions. Do not repeat warnings already mentioned unless they are necessary for decision-making or safety. For technical questions, answer directly and provide the next steps.
```


---

```text
## My Purpose

Okay it fine.

Now I need to see a clear sequence order guidance for adoption this project.

Let's begin with clone the repo(Your created branch) -> install cli -> access .venv shell -> give me all of the commands for preflight testing -> cli config command -> cli setup command -> workspace create commands -> sandboxs create commands -> end with clean up and uninstall

Objective is ensure that we could really run both dev and prod runtime at the same time without any conflict.

I will launch two terminal so you can present me seperately command for both terminal

## All of the Convention you need to follow along.

## ALl of the Tasks you need to proceeding.
```

---

```text
# GitHub Connector Convention

1. **Pin the target:** Always specify `owner/repo` and the exact branch or commit SHA. Never assume the default branch.
2. **Explore before editing:** Inspect repository metadata, the target ref, the file tree, related source files, tests, workflows, and relevant configuration before proposing changes.
3. **Search, then fetch:** Use code search to locate symbols and dependencies; use `fetch_file` to retrieve authoritative file contents. Verify that retrieved content belongs to the intended repository and ref.
4. **Read large files in chunks:** Use `start_line` and `end_line` with overlapping ranges when needed. Track line ranges and verify completeness before treating retrieved content as a full file.
5. **Trace cross-file dependencies:** Check callers, imports, configuration, tests, workflows, deployment files, and relevant interfaces before changing code.
6. **Preserve existing code:** Make targeted edits. Fetch the latest target file and its blob SHA before updating. Never overwrite a file based on partial content or a stale revision.
7. **Write safely:** Create a working branch from the pinned base revision when authorized. Apply sequential updates, inspect the resulting diff, and use a pull request for review. Never force-update, merge, or overwrite unrelated work without explicit authorization.
8. **Verify repository operations:** Check the resulting branch/ref, commit SHA, changed-file list, diff, and commit or pull-request status. Inspect CI runs and job logs when available. Clearly distinguish passed, failed, pending, unavailable, and not run.
9. **Respect connector capabilities and permissions:** Verify that the required GitHub operations are supported and authorized before relying on them. Do not assume that read access implies write access, or that connector access provides a local checkout or execution environment.
10. **Deliver repository evidence:** Report the exact repository, base and resulting refs, files changed, relevant SHAs, review/CI status, and any connector limitations. Never invent file contents, repository state, test results, or links.

# ChatGPT Web Browser Runtime Convention

1. **Probe runtime capabilities first:** Before implementation, determine which available tools can read and write local files, execute shell commands, run tests, access the network, create artifacts, and verify downloadable paths. Distinguish tool availability from successful execution.
2. **Separate browser access from execution:** Do not assume that the ChatGPT web browser, web search, or a connected external service provides shell access, a local filesystem, a writable project workspace, or permission to execute code.
3. **Establish a complete working source:** Prefer a complete local checkout or a verified, materialized source archive. If direct cloning or network access fails, try supported alternatives such as retrieving source files through an authorized connector and materializing them locally. Track the exact base revision and file completeness.
4. **Never treat excerpts as complete files:** Retrieved snippets or partial file ranges are evidence for inspection, not substitutes for full source files. Do not reconstruct or replace files from incomplete excerpts. If only partial content is available, limit changes to what can be verified or explicitly report the blocker.
5. **Use a capability-matched fallback:** If the preferred workflow is unavailable, try another supported workflow before concluding that the task is blocked. Do not assume that a tool can transfer data into another tool's runtime; verify the transfer mechanism and resulting files.
6. **Validate in stages:** Where supported, validate patch context, syntax, formatting, static checks, focused tests, broader tests, and integration behavior. Run checks only when the required source, dependencies, and execution capabilities are available.
7. **Report verification honestly:** Distinguish code inspection from executed checks. Mark each check as passed, failed, blocked, or not run, and provide the evidence or exact limitation. Never claim that code runs or tests pass without execution evidence.
8. **Preserve the target environment:** Check runtime versions, dependency constraints, environment variables, filesystem paths, ports, permissions, and external-service assumptions. Do not silently substitute versions or configurations that could change behavior.
9. **Create and verify deliverables:** Prefer complete implementation files or a usable patch/archive, accompanied by a change summary and verification report. Verify that an artifact exists at the exact path before sharing a download link. Never invent or reuse an unverified path.
10. **Keep execution and remote changes separate:** Creating local files, executing tests, and modifying a remote repository are distinct operations. Do not commit, push, open a pull request, merge, or change remote state unless explicitly authorized.
11. **State blockers precisely:** If the runtime cannot complete an operation, identify the missing capability, the checks that remain unperformed, and the best usable alternative. Do not describe a partially completed implementation as finished.
12. **Close the task with evidence:** Summarize the deliverable, exact base revision, files changed, validation results, unresolved risks, and any remaining manual steps. Clearly state whether the task is complete, partially complete, or blocked.
```
