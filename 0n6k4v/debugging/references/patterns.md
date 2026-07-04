# Pattern Library — Common Root Causes, Gotchas, and Keyword Banks

Load this file at Gate 7 (hypothesis generation) or during AUDIT MODE Deep/Forensic passes.
Matching one of these speeds up hypothesis generation — it still needs Gate 8 runtime confirmation before you call it a root cause.

---

## Root Cause Patterns

**Pattern A — Incomplete Refactoring**
Symptom: feature works in module X, breaks in module Y even though both use the "same" code.
Root cause: an API/response shape changed, some call sites were updated, others weren't.
Search tip: grep for the old field/response name across the whole tree, not just the changed service.
Example: backend renames `user.name` → `user.full_name`; the service layer updates but a component still reads `user.name`.

**Pattern B — Architectural Mismatch**
Symptom: feature works in environment A, fails in environment B, identical code.
Root cause: two code paths check the same concept under different names/assumptions.
Search tip: search for every naming variant (camelCase, snake_case, prefixed) of the concept.
Example: backend sets cookie `access_token`; one frontend layer checks `access_token`, another checks a stale `app_access_token`.

**Pattern C — Layered Redundant Logic**
Symptom: the same check exists in three places (proxy, route guard, component) with subtly different implementations.
Search tip: grep for the check/behavior across all layers; verify every layer agrees.
Example: token validation implemented in middleware AND a page guard AND a service — only one was updated after a change.

**Pattern D — Configuration Drift**
Symptom: behavior differs by environment/config file loaded.
Search tip: search for both the env var reference and any hardcoded constant for the same value; determine which one actually wins at runtime.
Example: `.env.local` says `API_URL=localhost:3001`, Docker compose injects a different value that silently overrides it.

**Pattern E — Cache / State Invalidation**
Symptom: updates work sometimes, not other times; a refresh often "fixes" it.
Search tip: search for every cache-invalidation call site; verify each write path also invalidates.
Example: profile updated in DB, but the read-side cache/query client is never told to refetch — stale data shown until manual refresh.

---

## Common Gotchas (audit/debug time-wasters)

1. **Truncated Docker logs** — GUI often shows only the last ~100 lines. Use `docker logs --tail 1000` or `-f` for full output before concluding "no logs show the error."
2. **Cache between test runs** — a bug that "disappears" on the second run may just be cache serving stale data, not proof it's intermittent. Clear cache / `docker compose down` between scenarios if state matters.
3. **Wrong env file loaded** — never assume which `.env*` a container actually mounts. Add a startup log showing the loaded config path if in doubt.
4. **Same concept, different names across services** — `access_token` vs `auth_token` vs `authz_token`. Search with `-n` and verify you're not missing a naming variant.
5. **Interleaved concurrent logs** — for temporal bugs, add millisecond timestamps to every log line; without them you can't tell race condition from sequential bug.
6. **"Works on my machine" ≠ works in Docker** — always verify in the actual runtime environment before declaring a fix complete.
7. **Incomplete instance count** — after a search, run a second search with alternate patterns to confirm you found *all* instances, not just the obvious ones.
8. **Request vs response mismatch** — log both what was sent and what was received at the client boundary; a "backend bug" is sometimes a network/parsing bug in transit.

---

## Keyword Banks by Domain

Use these as a starting point when grepping for relevant files; extend based on the actual objective.

| Feature | Keywords |
|---|---|
| Notifications | `notification`, `notify`, `push`, `alert`, `dispatch`, `emit` |
| Authentication | `auth`, `jwt`, `token`, `session`, `middleware`, `guard` |
| Follow / Social | `follow`, `follower`, `subscribe`, `fan`, `relationship` |
| Email | `email`, `mailer`, `smtp`, `sendgrid`, `ses`, `template` |
| Queue / Jobs | `queue`, `job`, `worker`, `bull`, `sidekiq`, `celery`, `cron` |
| Payments | `payment`, `stripe`, `webhook`, `invoice`, `charge`, `refund` |
| File Upload | `upload`, `storage`, `s3`, `blob`, `multer`, `presign` |
| Search | `search`, `index`, `elasticsearch`, `algolia`, `query` |
