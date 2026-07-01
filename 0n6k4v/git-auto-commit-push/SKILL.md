---
name: git-auto-commit-push
description: Automates the full git commit-and-push workflow for the current feature branch - checking status, reviewing diffs, drafting a Conventional Commits-style commit message, confirming with the user, committing, pushing, and verifying. Use this skill whenever the user asks to "commit my changes", "commit and push", "push this branch", "wrap up this session's changes", or similar git workflow requests, even if they don't spell out every step. Also use it when the user asks for help writing a commit message from their current diff.
---

# Git Auto Commit & Push

Acts as a Senior DevOps & Git Workflow Manager: automates staging, committing, and pushing changes on the current feature branch, with a human-in-the-loop confirmation step before anything is committed.

## Language constraint

All responses to the user must be in **English or Thai only** (match whichever language the user is using). The generated commit message itself must always be written in **English**, using Conventional Commits format, regardless of the conversation language.

## Workflow

Follow these steps in order. Do not skip the confirmation step (Step 4) — never commit or push without explicit user approval of the commit message.

### 1. Check status
Run:
```bash
git status
```
Report to the user:
- The current branch name
- All pending changes, grouped as modified / added / deleted / untracked files

### 2. Review changes
Run:
```bash
git diff
```
If there are already staged changes, also run `git diff --staged` so nothing is missed. Read through the diff to understand *what* changed and *why* (infer intent from the code, file names, and context of the conversation).

### 3. Generate commit message
Based on the diff, draft a commit message in **English**, using [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<optional scope>): <short summary title>

- <file or area>: <specific change and its purpose>
- <file or area>: <specific change and its purpose>
...
```

- `type` must be one of: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`, `perf`, `build`, `ci` (pick the one that best matches the diff).
- The title must be a clear, concise summary of the overall change (imperative mood, e.g. "add", not "added").
- The bullet list must call out each meaningfully changed file/area and explain the purpose of that change, not just restate the diff.
- Do not invent changes that aren't present in the diff.

### 4. Confirm with the user
Present the full generated commit message to the user (formatted as a code block) and explicitly ask for confirmation before proceeding, e.g.:

> "Here is the proposed commit message. Shall I proceed with commit and push? (yes / edit / cancel)"

- If the user asks for edits, revise the message and re-confirm.
- If the user declines, stop here — do not run any git write commands.
- Only proceed to Step 5 after receiving explicit confirmation (e.g. "yes", "go ahead", "ตกลง", "ดำเนินการต่อ").

### 5. Commit
Once confirmed, run:
```bash
git add .
git commit -m "<title>" -m "<bullet list body>"
```
(Use multiple `-m` flags or a heredoc to preserve the title/body structure, since the message is multi-line.)

### 6. Push
Push the commit to the remote, tracking the current branch:
```bash
git push origin HEAD
```
If the push fails (e.g. non-fast-forward, no upstream, auth error), report the exact error to the user and suggest the likely fix (e.g. `git pull --rebase`, or `git push -u origin HEAD` if there is no upstream yet) rather than silently retrying with force.

### 7. Verify
Run:
```bash
git log -1
```
Show the final commit hash, author, and message to the user, and confirm the push succeeded (e.g. by noting the branch is now up to date with the remote).

## Notes and edge cases

- **No changes to commit**: If `git status` shows a clean working tree, tell the user there is nothing to commit and stop — don't fabricate a commit message.
- **Detached HEAD or protected branch (e.g. `main`/`master`)**: Warn the user before proceeding, since pushing directly may not be intended.
- **Merge conflicts / diverged branch**: If `git push` reports the branch has diverged, do not force-push; explain the situation and ask the user how they'd like to proceed.
- **Large or binary diffs**: If `git diff` is too large to reasonably summarize file-by-file, summarize by directory/module instead, and note that the diff was large.
- Never use `git push --force` or `git commit --amend` unless the user explicitly asks for it.