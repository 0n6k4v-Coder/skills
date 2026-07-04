# DEBUG SKILL — Full Walkthrough Example

## EXAMPLE — full walkthrough

**User says:** "เข้าหน้า /account ผ่าน UI ได้ปกติ แต่พอ Navigate โดยตรงหรือ Refresh จะถูก Redirect ไปหน้า Login"

**GATE 0:** Bug report → yes, continue.
**GATE 1:** Mentions auth redirect → backend may be involved. Read project files.
**GATE 2:** UI symptom present → ask about Playwright MCP. Assume PATH B here.

Send test script:
```
BASELINE — navigate to / via UI
  1. Open browser, go to http://localhost:3000
  2. Log in with your credentials
  3. Click any link to go to home page
  → Expected: home page loads normally

SCENARIO 1 — navigate to /account via UI
  1. While logged in, click the Account link in the nav
  → What do you see?

SCENARIO 2 — navigate to /account via direct URL
  1. While logged in, type http://localhost:3000/account in the address bar
  → What do you see?

SCENARIO 3 — refresh /account
  1. While on /account (via UI), press F5
  → What do you see?

SCENARIO 4 — same tests on / (home)
  1. Type http://localhost:3000/ in address bar directly
  2. Press F5 while on /
  → What happens?
```

**User returns:** Scenarios 2 and 3 redirect to login. Scenario 4 works fine.

**GATE 3+4 — Symptom Matrix:**
```
              | Via UI nav | Direct URL | After refresh
──────────────|────────────|────────────|--------------
/account      |     ✅     |     ❌     |      ❌
/ (home)      |     ✅     |     ✅     |      ✅
```

**GATE 5 — Delta:**
```
DELTA ANALYSIS
────────────────────────────────────────────
PASSING scenario : UI navigation on any route
  What happens technically: React Router changes URL, JS runtime stays alive,
                            auth state remains in memory

FAILING scenario : Direct URL or refresh on /account
  What happens technically: browser makes full HTTP request, JS runtime reinitializes,
                            all in-memory state is wiped

DELTA (exact difference): Whether the JS runtime reinitializes —
                          only protected routes are affected by this
────────────────────────────────────────────
```

**GATE 6 — Layer Map:**
```
SYSTEM LAYER MAP
────────────────────────────────────────────────────────
Layer            | Component name(s)              | Status
────────────────────────────────────────────────────────
Frontend         | AccountPage component          | ? uninspected
AppProvider/ctx  | AuthContext / useAuth           | ? uninspected
Proxy/middleware | Next.js middleware (suspected)  | ? uninspected
API              | /api/account route              | ? uninspected
Backend logic    | auth.service.ts                | ? uninspected
Database         | users / sessions table         | ? uninspected
────────────────────────────────────────────────────────
```

**GATE 7 — Hypotheses:**
```
HYPOTHESES
────────────────────────────────────────────
H1: AppProvider — auth token stored in React state only, not persisted to
    localStorage/cookie — delta: state is lost when JS runtime restarts on hard reload

H2: AppProvider — token IS persisted but route guard runs synchronously before
    async rehydration completes — delta: redirect fires before token is read back
    from storage

H3: Proxy/middleware — server-side middleware checks session that only exists after
    client login flow — delta: hard reload hits server cold, session not yet established
────────────────────────────────────────────
```

**GATE 8 — Diagnostic Plan:**
```
DIAGNOSTIC PLAN
────────────────────────────────────────────
H1 check:
  Action  : Open DevTools → Application tab → LocalStorage
             Check: is an auth token present immediately after page reload?
  Output  : token value in LocalStorage (present / absent)
  Confirms H1 if: token = null / absent after reload
  Rules out H1 if: token is present after reload

H2 check:
  Action  : Add console.log("redirect fired") in route guard,
             console.log("token loaded", token) in AuthProvider useEffect
             Reload /account and check console order
  Output  : Which log line appears first?
  Confirms H2 if: "redirect fired" appears before "token loaded"
  Rules out H2 if: "token loaded" appears before "redirect fired"

H3 check:
  Action  : Check middleware.ts for server-side session validation
             Does it check req.session or a server-stored cookie?
  Output  : Middleware code + network tab showing request headers on reload
  Confirms H3 if: middleware rejects request before any client code runs
  Rules out H3 if: middleware passes through or does not exist
────────────────────────────────────────────
```

**User runs H1 check:**
> "เปิด DevTools → Application → LocalStorage ไม่มี token เลย หลัง reload"

```
DIAGNOSTIC RESULT
────────────────────────────────────────────
H1 check result : token = null in LocalStorage after hard reload
                  → H1 CONFIRMED by runtime evidence
H2              : ruled out (no token to rehydrate — moot)
H3              : ruled out (frontend state is root, not server session)
────────────────────────────────────────────
```

**GATE 8B — Root Cause Drill (5-Why):**
```
5-WHY DRILL
────────────────────────────────────────────
Confirmed finding : token = null in LocalStorage after hard reload

Why does that happen?
  → The token is never written to LocalStorage — only kept in React state (useState)

Why does THAT happen?
  → The login handler calls setToken(token) but never calls localStorage.setItem()

Why does THAT happen?
  → The auth helper function persistToken() exists but is never called from the login flow

Why does THAT happen?
  → persistToken() was added in a later refactor but the login handler was not updated

ROOT CAUSE: Missing call to persistToken() inside the login handler
  Type      : absent code
  Fix target: auth.context.tsx — add `persistToken(token)` after `setToken(token)`
              in the loginUser() function
────────────────────────────────────────────
```

**GATE 6B — File Provenance Check (auth.context.tsx):**
```
FILE PROVENANCE CHECK
────────────────────────────────────────────
File        : src/context/auth.context.tsx
Mentioned by: code reading → confirmed by DevTools runtime evidence

Q1. Is this file part of the request path for the failing scenario?
    Evidence: loginUser() is the only function that sets auth state — confirmed by
              React DevTools showing AuthContext as provider wrapping AccountPage

Q2. Has this file been confirmed as executing during the failure?
    Evidence: console.log added to loginUser() appeared in console during
              failing scenario reproduction

Q3. Does the symptom matrix delta point to this layer?
    Answer: yes — delta is "JS runtime reinitializes", AppProvider/ctx layer
            is responsible for rehydrating state on restart

VERDICT: CONFIRMED IN PATH
────────────────────────────────────────────
```

**GATE 6C — Impact Perimeter Map:**
```
IMPACT PERIMETER MAP
────────────────────────────────────────────
File to modify : src/context/auth.context.tsx
Planned change : add persistToken(token) call after setToken(token) in loginUser()
Search ran     : yes — grep -rn "loginUser\|persistToken" → 6 results found

Callers:
  - src/pages/login.tsx:47          — calls loginUser() → no signature change, safe
  - src/components/LoginForm.tsx:31 — calls loginUser() → no signature change, safe

Dependents:
  - src/utils/auth.helpers.ts       — persistToken() defined here → already correct
  - LocalStorage key "auth_token"   — written by persistToken(), read by rehydrateToken()
    → rehydrateToken() already called in AuthProvider useEffect on mount → no change needed

Shared state:
  - AuthContext value (token, user, isAuthenticated) — read by useAuth() hook in 14 files
    → all reads are via hook, no direct coupling — safe to change writer

Related paths with same pattern:
  - src/context/auth.context.tsx:refreshToken() — also calls setToken() without persistToken()
    → SAME BUG: token refresh flow also loses token on reload
    → must fix in same session

PERIMETER VERDICT: Has dependents
  - refreshToken() in same file must also be fixed (same root cause, same session)
────────────────────────────────────────────
```

**GATE 9A — Change Log:**
```
CHANGE LOG — Fix #1
────────────────────────────────────────────
Root cause being fixed : persistToken() never called after setToken() in login
                         and token-refresh flows
Files to modify        :
  1. src/context/auth.context.tsx
     — loginUser():    add `persistToken(token)` after `setToken(token)` (~line 52)
     — refreshToken(): add `persistToken(newToken)` after `setToken(newToken)` (~line 89)

Files NOT in this fix  : login.tsx, LoginForm.tsx, auth.helpers.ts
                         (callers unchanged; helper already correct)

Attribution test       : IF this fix is reverted, token disappears on reload
                         → symptom returns → fix is correctly scoped ✓
────────────────────────────────────────────
```

**GATE 9B — Fix Checkpoint:**
```
FIX CHECKPOINT
────────────────────────────────────────────
Fix applied : AppProvider/ctx — added persistToken() in loginUser() + refreshToken()
Matrix result:
  /account via UI nav    : was ✅ → still ✅
  /account direct URL    : was ❌ → now ✅
  /account after refresh : was ❌ → now ✅
  / home direct URL      : was ✅ → still ✅
  / home after refresh   : was ✅ → still ✅

All resolved? YES → go to GATE 10
────────────────────────────────────────────
```

**GATE 10A — Integration Verification:**
```
INTEGRATION VERIFICATION
────────────────────────────────────────────────────────
Layer            | Component name(s)              | Result
────────────────────────────────────────────────────────
Frontend         | AccountPage component          | ✓ renders correctly after reload
AppProvider/ctx  | AuthContext / loginUser        | ✓ token now persisted to LocalStorage
Proxy/middleware | Next.js middleware (none found)| ✓ not in failing path
API              | /api/account route             | ✓ returns 200 on direct URL access
Backend logic    | auth.service.ts                | ✓ not in failing path
Database         | users / sessions table         | ✓ not in failing path
────────────────────────────────────────────────────────
End-to-end : PASS
────────────────────────────────────────────────────────
```

**GATE 10B — Root Cause Scope Check:**
```
ROOT CAUSE SCOPE CHECK
────────────────────────────────────────────
Root cause  : persistToken() never called after setToken()
Fix applied : added call in loginUser() + refreshToken()

Q1. Other code paths through same root cause?
    → refreshToken() — FIXED in same session (caught by Gate 6C)
    → logoutUser() calls removeToken() correctly — no issue
    → grep for setToken( without persistToken — 0 additional results after fix

Q2. Other features using same broken pattern?
    → none found — only loginUser() and refreshToken() call setToken()

Q3. Silent data corruption in database?
    → no — this bug only affects client-side session state, not stored data

Q4. Deferred items from Gate 8C?
    → none logged during this session

SCOPE VERDICT: CONTAINED — root cause fixed, no further reach
────────────────────────────────────────────
```

**Session closed. Bug resolved.**