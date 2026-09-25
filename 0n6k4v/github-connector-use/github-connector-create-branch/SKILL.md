---
name: github-connector-create-branch
description: Use when a user asks to create a new branch in a GitHub repository through the connected ChatGPT GitHub connector. Inspect the repository and existing branch state first, create the branch from the requested base branch or commit, and verify the resulting branch ref before reporting success.
---

# GitHub Connector Create Branch

Create GitHub branches directly through the connected **ChatGPT GitHub connector**.

Do not use browser UI or local git when the GitHub connector can create the branch directly.

## Core Workflow

```text
INSPECT
↓
RESOLVE BASE
↓
CREATE BRANCH
↓
VERIFY
```

A branch creation is not complete until the new branch ref has been verified.

## 1. Resolve the Repository

Before creating the branch:

- Resolve the repository as `owner/name`.
- Read repository metadata.
- Identify the default branch when the user does not specify a base.
- Confirm the connector has write access when permission information is available.

When the user provides a GitHub repository URL, use the GitHub connector to access the repository.

## 2. Resolve the Branch Name

Use the exact branch name requested by the user.

Do not silently transform a requested branch name unless the user or repository conventions explicitly require it.

Preserve capitalization and punctuation exactly as requested.

## 3. Check Existing Branches

Before creating the branch:

1. Check whether the requested branch already exists.
2. If it exists and already points to the intended base, do not recreate it.
3. If it exists but points somewhere else, do not move or overwrite it without explicit user intent.
4. If it does not exist, continue.

Never replace an existing branch merely because the user requested a branch with the same name.

## 4. Resolve the Base

When the user specifies a base branch, use that branch.

When no base is specified, use the repository default branch.

The base may be:

- an existing branch
- a commit SHA
- another valid Git ref supported by the connector

The new branch should start exactly at the resolved base commit.

## 5. Create the Branch

Use the GitHub connector's branch-creation operation.

Provide:

```text
repository
branch_name
base_ref
```

When creating from a specific commit instead, provide the commit SHA as the base.

Do not use a force ref update to create the branch.

## 6. Verification

Immediately after creation:

1. Read the new branch ref.
2. Confirm the ref exists.
3. Confirm the branch points to the intended base commit.
4. Confirm the branch name is exactly the requested name.

If the new branch does not resolve to the expected commit, treat the operation as unverified.

## 7. Branch Safety

Never:

- overwrite an existing branch without explicit authorization
- force-update a branch during normal creation
- reset an existing branch
- delete an existing branch
- create a pull request unless requested
- make unrelated repository changes

Creating a branch should not modify files or create an additional commit.

## 8. Failure Handling

If branch creation fails:

- inspect whether the branch was actually created despite the error
- check the target ref
- report the actual repository state
- do not retry with force
- do not claim success without verification

If the connector returns an ambiguous result, inspect the target ref, verify branch existence, and verify the target commit.

Only report success after these checks pass.

## 9. Final Response

After successful verification, report:

```text
Repository: owner/name
Branch: frontend
Base: main
Commit: <sha>
Verified: yes
```

Include the GitHub branch link when available.

Keep the final response focused on the completed branch creation.

## Rule of Thumb

For `Create <branch> from <base>`:

```text
repository
↓
check <branch>
↓
resolve <base>
↓
create <branch> from <base>
↓
verify ref
```

Do not turn a simple branch creation into a local git workflow.
