# Fix Proposal Template — Multi-Service / Multi-File

Use this format at **Gate 9A** instead of the plain CHANGE LOG when a fix spans several services, several files, or several architectural layers — cases where a one-line-per-file CHANGE LOG would bury the reviewer. It's a presentation format for the same Gate 9A content (root cause, files, why), not a different gate: it still comes after the bilingual ROOT CAUSE from Gate 8B, and it still stops for explicit user approval before anything is applied.

Rules that apply throughout:

- Show **every** affected service, file, and layer — nothing may be omitted from the tables, even if the diff for that file is small.
- Diffs show **only the changed lines plus ±3 lines of context** — never a full file/block. Use standard unified-diff markers: `-` removed, `+` added, ` ` (space) unchanged context.
- Order files within each service from the topmost layer down (Controller → Service → Repository → Model → DTO → Config) — request-path order, not alphabetical.
- Every inline note names an exact line and the reason for that specific change — not a paragraph explaining the whole file.

---

## Step 1 — Services Table

One row per affected service, regardless of how small the change is there.

| # | Service Name | ประเภทการแก้ไข (Change Type) | ความเร่งด่วน (Urgency) | หมายเหตุ (Notes) |
|---|---|---|---|---|
| 1 | `user-service` | Bug fix | High | Root cause lives here |
| 2 | `feed-service` | Consumer update | Medium | Depends on #1's event shape |

---

## Step 2 — Files & Layers Table (one table per service from Step 1)

### Service: `[service name]`

| # | ชื่อไฟล์ (File) | Layer | ประเภทการเปลี่ยนแปลง (Change Type) | เหตุผล (Reason) |
|---|---|---|---|---|
| 1 | `app/api/routes/follow.py` | Controller | Modify | Pass `viewer_id` down that was previously dropped |
| 2 | `app/services/follow_service.py` | Service | Modify | Root cause — missing ownership check |
| 3 | `app/crud/crud_follow.py` | Repository | Modify | New batch method to support the fix |
| 4 | `app/schemas/follow.py` | DTO | Modify | Response now includes `is_following_back` |

Repeat this table for every service listed in Step 1.

---

## Step 3 — Code Changes (Diff Format)

For **every file** listed in Step 2, in the same top-layer-to-bottom-layer order:

### `[Service Name]` → `[file path]` (Layer: `[Layer]`)

**📝 Summary:** one to two lines — what changes in this file and why.

```diff
@@ -42,7 +42,10 @@
  async def follow_user(user_id: UUID, current_profile: Profile = Depends(get_current_profile)):
-     await crud_follow.create(db, follower_id=current_profile.profile_id, following_id=user_id)
+     if current_profile.profile_id == user_id:
+         raise SelfFollowError()
+     await crud_follow.create(db, follower_id=current_profile.profile_id, following_id=user_id)
      return {"status": "ok"}
```

**💡 Inline Notes:**
- `line 44` — added self-follow guard; this is the confirmed root cause from Gate 8B (missing ownership check before the write).
- `line 45` — unchanged, existing write call kept as-is; only the guard above it is new.

Repeat this `### Service → File (Layer)` block for every file in every service before presenting the proposal for approval.

---

## After all three steps are shown

Close with the same Gate 9A requirements the plain CHANGE LOG uses:

- **Attribution test:** if this fix alone is reverted, does the symptom return? State yes/no.
- **Files NOT in this fix:** anything tempting but out of scope.
- Post the whole thing in **Thai + English** per the skill's Global Rules, then stop — 🛑 wait for explicit approval before touching any file.
