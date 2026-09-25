---
name: github-connector-write
description: Use when a user asks to create, update, replace, delete, commit, or push files in a GitHub repository through the connected ChatGPT GitHub connector. Prefer the connector over browser UI or local git. For writes, inspect the target state first, perform the smallest safe repository mutation, and verify the final branch and file state before reporting success.
---

# GitHub Connector Write

Use the connected **ChatGPT GitHub connector** as the primary execution layer for repository writes.

Do not simulate a git push through the browser when the GitHub connector can perform the operation directly.

## Core Workflow

```text
INSPECT
↓
WRITE
↓
COMMIT
↓
UPDATE BRANCH
↓
VERIFY
```

A repository write is not complete until the final GitHub state is verified.

## 1. Resolve the Repository

Before writing:

- Resolve the repository as `owner/name`.
- Read repository metadata.
- Identify the default branch unless the user specified another branch.
- Confirm the connector has sufficient write access when the connector exposes permission information.

When the user supplies a GitHub repository URL, use the GitHub connector to access that repository rather than treating the URL as a generic web page.

## 2. Inspect Before Mutation

For a new file:

1. Read the target path.
2. Confirm whether it already exists.
3. Read nearby files or the parent directory when repository structure or naming conventions matter.

For an existing file:

1. Fetch the current file.
2. Preserve the current repository state.
3. Use the current blob SHA when an update or delete operation requires it.

Do not overwrite repository content from stale state.

## 3. Prefer High-Level Connector Writes

Use the highest-level GitHub connector operation that directly matches the requested mutation.

### Create

Use the connector file-creation operation with:

- repository
- path
- complete file contents
- commit message
- target branch

### Update

Use the connector file-update operation with:

- repository
- path
- complete replacement contents
- commit message
- current blob SHA
- target branch

### Delete

Use the connector file-delete operation with:

- repository
- path
- current blob SHA
- commit message
- target branch

Do not use lower-level Git operations when the high-level connector operation is reliable and sufficient.

## 4. Nested Paths Do Not Require Directory Creation

Git tracks files through trees, not standalone empty directories.

A request such as:

```text
docs/references.md
```

does not require a separate `docs/` creation step.

Create the file at the full path.

Do not add placeholder files such as `.gitkeep` unless the user explicitly needs an otherwise-empty directory.

## 5. Git Object Fallback

If the high-level connector write fails, returns an ambiguous result, cannot represent the requested change, or cannot safely preserve the required repository state, fall back to Git data operations through the same GitHub connector.

Use:

```text
branch ref
↓
current commit
↓
current tree
↓
blob
↓
new tree
↓
new commit
↓
branch ref update
```

### Blob

Create a UTF-8 blob containing the complete file contents.

### Tree

Use the current tree as the base and add or replace the requested path:

```text
path: <target path>
mode: 100644
type: blob
sha: <blob sha>
```

### Commit

Create one commit containing:

```text
tree: <new tree sha>
parent: <current branch commit sha>
message: <commit message>
```

### Branch

Move the requested branch ref to the new commit.

Use a normal non-force update.

Never force-push for an ordinary file write.

## 6. Multiple Files

When several files are part of one logical change:

1. Inspect the branch once.
2. Create one blob per changed file.
3. Create one tree containing all file changes.
4. Create one commit.
5. Update the branch once.
6. Verify every changed path.

Prefer an atomic commit over several sequential commits.

## 7. Verification Is Mandatory

After any write:

1. Read the target branch ref again.
2. Confirm the branch points to the expected commit.
3. Fetch each changed file from that branch.
4. Confirm the expected paths exist.
5. Confirm the fetched contents match the intended contents.

Only then report created, updated, deleted, committed, or pushed as completed.

A successful intermediate operation is not enough.

## 8. Branch Safety

Preserve existing history.

Never:

- force-update a branch for a normal write
- reset a branch to an unrelated commit
- rewrite unrelated history
- overwrite an existing file without checking current state
- create a new branch unless requested
- create a pull request unless requested

If the requested branch moved after inspection, refresh the branch state before creating a new commit.

## 9. Commit Messages

Use a concise Conventional Commits-style message unless the user supplied a message.

Prefer:

```text
docs: add references index
```

over:

```text
updated files
```

The message should describe the logical repository change, not the connector operation.

## 10. Browser vs Connector

When the GitHub connector is available:

```text
User asks to modify GitHub
        ↓
GitHub connector
        ↓
Repository mutation
        ↓
GitHub connector verification
```

Do not open GitHub in the browser and edit through the web UI when the connector can perform the requested write.

The browser may be used for inspection when appropriate, but the connected GitHub connector is the preferred write mechanism for this Skill.

## 11. Failure Handling

If a write operation returns an empty or ambiguous result:

- do not assume success
- do not tell the user the file was pushed
- inspect the branch and target path
- continue using the Git object fallback when possible
- verify the final state

If the GitHub connector itself is unavailable, report that the connector is unavailable and do not claim a repository write occurred.

## 12. Final Response

After successful verification, report only the useful result:

```text
Repository: owner/name
Branch: main
Changed: docs/references.md
Commit: <sha>
Verified: yes
```

Include the GitHub file or commit link when available.

Keep the final response focused on the completed repository state.
