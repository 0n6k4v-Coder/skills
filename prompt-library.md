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

```text
Please provide the commit command, along with a simple, clear, direct, explicit, and concise commit message and an extended description.
```
