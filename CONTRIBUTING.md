# Welcome, AcademiaHubAfrica Contributor

[Setting Up the Development Environment](#setting-up-the-development-environment)

[Installing Dependencies](#installing-dependencies)

[Pull Requests](#pull-requests)

[Checking Database via Prisma (Temporary)](#checking-database-via-prisma)

[STRIDE Threat Model for Messaging Feature](#️-stride-threat-model--dm-messaging)

## Setting Up the Development Environment

1. Fork the repository.
2. In your terminal, run the `git clone` command with the forked repository's URL, e.g.

    ```bash
    git clone https://github.com/JohnDoe/Academiahub.git
    ```

    This creates a local repository on your machine.

3. To keep your fork up to date with the development branch of the company's repository, run the following command.

    ```bash
    git config remote.upstream.fetch "+refs/heads/development:refs/remotes/upstream/development" 
    ```

    Now, when you run `git fetch upstream`, Git will only fetch `upstream/development`.

4. If you decide to pull in the updates, then use the following command.

    ```bash
    git pull upstream development
    ```

5. Run `git remote -v` to verify. You should see this.

    ```bash
    origin    https://github.com/JohnDoe/Academiahub.git (fetch)
    origin    https://github.com/JohnDoe/Academiahub.git (push)
    upstream  https://github.com/AcademiahubAfrica/Academiahub.git (fetch)
    upstream  https://github.com/AcademiahubAfrica/Academiahub.git (push)
    ```

    *N/B*: If the origin does not show the forked repository's URL, use the command below to add it and then run `git remote -v` again to verify.

    ``` bash
    git remote add origin https://github.com/JohnDoe/EleQ.git
    ```

6. Run `npm install` from the root of your project to install already set up dependencies. Cheers! You're all set. Well done. 🎉

## Installing Dependencies

This is a monorepo that uses `npm workspaces`. `npm workspaces` prevent dependency conflicts and duplicate installs. With this in mind, stick to the following rules when installing dependencies to avoid issues.

### Install dependencies ONLY from the root

Never run `npm install` inside `frontend` or `backend` directly.

  ```bash
  ❌
  cd backend
  npm install express
  ```

  ```bash
  ❌
  cd frontend
  npm install next
  ```

### Adding new dependencies

- To add a frontend dependency, do this:

    ```bash
    npm install axios --workspace frontend
    ```

- To add a backend dependency, do this:

    ```bash
    npm install bcrypt --workspace backend
    ```

### Run scripts per workspace

- Run frontend dev server

    ```bash
    npm run dev --workspace frontend
    ```

- Run backend dev server

    ```bash
    npm run dev --workspace backend
    ```

### Here's A Summary of the Dependencies Rules (Now, You Have No Excuses)

❌ Running `npm install` inside subfolders

❌ Multiple lockfiles

❌ Installing deps without `--workspace`

❌ Forgetting `private: true` in root

## Pull Requests

For a consistent PR pattern that is easy to understand, use the following convention for PR titles: `<type>: <brief description>`. Common types include:

- **feat** — new feature
- **fix** — bug fix
- **docs** — documentation changes
- **refactor** — code restructuring without changing behaviour
- **test** — adding or updating tests
- **chore** — maintenance tasks (dependencies, configs)
- **perf** — performance improvements
- **style** — formatting, missing semicolons, etc.

Examples:

- feat: add user authentication with OAuth
- fix: resolve null pointer in checkout flow
- docs: update API documentation for v2 endpoints

In the main description section, provide a clear and concise description of what the PR does. How would you know if your PR is too large? A simple indicator is if you have to add an "and" to the title. What comes after the "and" should definitely be in a separate PR.

## Checking Database via Prisma

Run the command:

```bash
npx prisma studio
```

## 🛡️ STRIDE Threat Model — DM Messaging

**Feature:** Real-Time Direct Messages
**Stack:** Next.js 15 App Router · NextAuth · Prisma · MongoDB · Express + ws
**Target Scale:** 1K–10K users

---

## Attack Surface Map

``` bash
┌──────────────────┐     HTTPS     ┌──────────────────┐      WSS      ┌──────────────────┐    Prisma    ┌──────────────────┐
│  🖥️ Next.js      │ ───────────▶ │  ⚙️ REST API      │ ◀──────────▶ │  🔌 WebSocket     │ ──────────▶ │  🍃 MongoDB      │
│  Frontend        │              │  Express routes   │              │  Persistent conn  │             │  Users · Convos  │
│  NextAuth · WS   │              │  JWT verification │              │  Real-time events │             │  Messages · RR   │
│                  │              │                   │              │                   │             │                  │
│  [S] [T] [I]     │              │  [S][T][R][I][D][E]│             │  [S] [T] [D] [I]  │             │  [T] [I] [R]     │
└──────────────────┘              └──────────────────┘              └──────────────────┘             └──────────────────┘
```

**Highest-risk surfaces:** WebSocket handler (persistent, stateful, bypasses traditional HTTP middleware) and REST API auth layer (gateway to all data). Frontend is lower risk since enforcement is server-side, but XSS on the frontend can compromise everything downstream.

---

## STRIDE Overview

| | Category | Primary Target | Severity | Key Risk |
|---|---|---|---|---|
| **S** | Spoofing | Both | 🔴 High | Attacker impersonates another user to read/send DMs via JWT theft or WS spoofing |
| **T** | Tampering | Backend | 🔴 High | Modify message content in transit; alter senderId/conversationId in WS frames |
| **R** | Repudiation | Backend | 🟢 Low | User denies sending a message; lack of audit trail |
| **I** | Info Disclosure | Both | 🔴 High | Unauthorized access to DM history, presence data, or conversation metadata |
| **D** | Denial of Service | Backend | 🟡 Medium | Flood WS connections, spam messages, or abuse search to exhaust resources |
| **E** | Elevation of Privilege | Backend | 🔴 High | Access conversations you're not a participant of by manipulating IDs |

---

## S — Spoofing (Identity Threats)

### T1: JWT/Session Token Theft `[Frontend]` `[🔴 High]`

**Threat:** XSS attack steals NextAuth JWT from cookies or localStorage. Attacker uses stolen token to impersonate user on WS and REST.

**Frontend Mitigations:**

- Set NextAuth cookies as `httpOnly`, `secure`, `sameSite: strict`
- Never store tokens in localStorage — use httpOnly cookies only
- Strict CSP headers to block inline scripts and untrusted sources
- Sanitize all user-generated content rendered in React (default in JSX, but watch `dangerouslySetInnerHTML`)

---

### T2: WS Connection Spoofing `[Backend]` `[🔴 High]`

**Threat:** Attacker opens WS connection with a stolen or forged JWT. Since WS is long-lived, a compromised token grants persistent access until expiry.

**Backend Mitigations:**

- Validate JWT on the first WS frame (not just during handshake)
- Use short-lived JWTs (15 min) — re-validate periodically on open sockets
- Bind WS session to IP; disconnect if IP changes mid-session
- Implement token revocation check (e.g., `tokenVersion` on User, bump on password change)

---

## T — Tampering (Data Integrity Threats)

### T3: Message Injection via Forged senderId `[Backend]` `[🔴 High]`

**Threat:** Attacker sends a WS frame with a different `senderId`, making it appear another user sent the message. If backend trusts client-provided senderId, messages can be forged.

**Backend Mitigations:**

- **NEVER trust client-provided senderId.** Always derive from the authenticated JWT on the server
- WS handler: `senderId = socket.userId` (set during auth), ignore any senderId in payload
- Prisma create: `message.create({ senderId: authenticatedUserId })`

---

### T4: Message Content Manipulation `[Both]` `[🟡 Medium]`

**Threat:** MITM attack alters message content in transit. Or malicious content (scripts, links) injected into messages to attack the recipient's browser.

**Frontend Mitigations:**

- Render message content as text only — never as HTML
- Sanitize/escape any URLs before making them clickable
- Use React's default JSX escaping (avoid `dangerouslySetInnerHTML`)

**Backend Mitigations:**

- Enforce TLS/WSS — all connections HTTPS + WSS, never plaintext
- Validate + sanitize message content server-side (max length, strip HTML tags)
- Reject messages exceeding max length (e.g., 5000 chars)

---

### T5: Conversation ID Manipulation `[Backend]` `[🟡 Medium]`

**Threat:** Attacker sends a valid JWT but targets a `conversationId` they're not a participant of, injecting messages into someone else's DM.

**Backend Mitigations:**

- On every message send: verify `conversation.participantAId === userId || conversation.participantBId === userId`
- This check MUST happen on every WS message and every REST request — never cache authorization

---

### T6: Read Receipt Forgery `[Backend]` `[🟡 Medium]`

**Threat:** Attacker sends `read:mark` events with a manipulated `lastMsgId` pointing to a message in a different conversation, or marks messages as read for another user.

**Backend Mitigations:**

- Always derive userId from JWT, never from client payload
- Verify the `lastMsgId` actually belongs to the specified `conversationId`
- Verify user is a participant in the conversation

---

## R — Repudiation (Accountability Threats)

### T7: Denied Message Authorship `[Backend]` `[🟢 Low]`

**Threat:** User sends an abusive/harmful message then claims they didn't send it. Without audit trails, it's hard to prove authorship for moderation.

**Backend Mitigations:**

- Log message creation events with userId, IP, timestamp, and user agent
- Store `senderId` immutably on the Message model (already in schema)
- Consider adding a `createdByIp` field for audit (optional for MVP)

---

### T8: Denied Read Receipt `[Backend]` `[🟢 Low]`

**Threat:** User claims they never read a message, but the system recorded a read receipt.

**Frontend Mitigations:**

- Only emit `read:mark` on explicit user action (window focus + scroll to bottom), not on background tab activity

**Backend Mitigations:**

- Log read receipt upserts with timestamp and source
- ReadReceipt `readAt` field provides a timestamp audit trail

---

## I — Information Disclosure (Confidentiality Threats)

### T9: Unauthorized Message Access (IDOR) `[Backend]` `[🔴 High]`

**Threat:** Attacker enumerates `conversationId` values to access message history of conversations they're not in. Classic Insecure Direct Object Reference.

**Backend Mitigations:**

- **Authorization check on every endpoint:** `GET /conversations/:id/messages` must verify the requester is `participantA` or `participantB`
- Use ObjectIds (not sequential integers) — harder to enumerate, but NOT a security measure on its own
- Middleware pattern: `requireConversationParticipant()` applied to all conversation routes

---

### T10: Presence/Metadata Leakage `[Both]` `[🔴 High]`

**Threat:** Online status, typing indicators, and "last seen" data reveals user activity patterns to any authenticated user, not just conversation partners.

**Frontend Mitigations:**

- Only show presence/typing status for users you have an active conversation with

**Backend Mitigations:**

- **Scope presence events:** Only broadcast typing/presence to the other participant in the DM — never globally
- Don't expose a public endpoint for querying any user's online status
- Typing events: only relay to the other participant in the active conversation

---

### T11: Sensitive Data in Client State `[Frontend]` `[🟡 Medium]`

**Threat:** Message content, user IDs, or tokens stored in browser memory, React state, or devtools-accessible storage. Exposed to browser extensions or physical access.

**Frontend Mitigations:**

- Never persist messages to localStorage or sessionStorage
- Keep messages in React state only (ephemeral, garbage collected)
- Clear message state when navigating away from a conversation
- Implement idle timeout — disconnect WS after inactivity

---

### T12: Error Message Data Leakage `[Backend]` `[🟡 Medium]`

**Threat:** Verbose error messages expose internal structure: Prisma model names, MongoDB query details, stack traces, or user IDs in error responses.

**Backend Mitigations:**

- Generic error messages in production: `{ error: "Not found" }` not `{ error: "Conversation with id xyz not found in collection..." }`
- Global error handler that strips stack traces in production
- Never expose Prisma/Mongo errors directly to the client

---

## D — Denial of Service (Availability Threats)

### T13: WS Connection Flooding `[Backend]` `[🟡 Medium]`

**Threat:** Attacker opens thousands of WS connections from scripted clients, exhausting the server's memory and file descriptors.

**Backend Mitigations:**

- Limit WS connections per user (e.g., max 5 concurrent — covers multi-tab/device)
- Require JWT auth before upgrading HTTP to WS — reject unauthenticated upgrades immediately
- Set `server.maxConnections` as a hard ceiling
- Rate-limit connection attempts per IP (e.g., 10/min)

---

### T14: Message Spam Flooding `[Backend]` `[🟡 Medium]`

**Threat:** Authenticated user sends hundreds of messages per second via WS, overwhelming the DB with writes and pushing junk to the recipient's socket.

**Backend Mitigations:**

- Rate-limit messages per user: e.g., max 30 messages/min per conversation
- Server-side throttle on the WS handler — drop excess frames with an error event
- Max message size: 5000 chars (reject larger payloads before DB write)

**Frontend Mitigations:**

- Disable send button briefly after sending (debounce 300ms)
- Client-side rate limit as UX guard (not a security measure)

---

### T15: User Search Abuse `[Backend]` `[🟢 Low]`

**Threat:** Attacker scripts rapid calls to `GET /users/search?q=` to enumerate all users or overload the DB with regex-heavy queries.

**Backend Mitigations:**

- Rate-limit search endpoint: 20 requests/min per user
- Require minimum query length (3+ chars)
- Use indexed prefix search, not regex — `{ name: { $regex: ^query } }` with index, never unanchored regex
- Return max 10 results per query

---

### T16: Read Receipt Spam `[Backend]` `[🟢 Low]`

**Threat:** Attacker floods `read:mark` events, causing excessive DB upserts and WS broadcasts.

**Backend Mitigations:**

- Server-side debounce: ignore `read:mark` if last upsert for same conversation was <5s ago
- Skip upsert if `lastReadMessageId` hasn't changed

---

## E — Elevation of Privilege (Authorization Threats)

### T17: Cross-Conversation Access `[Backend]` `[🔴 High]`

**Threat:** Attacker modifies `conversationId` in REST or WS requests to access/write to conversations they're not a participant of. **This is the #1 risk for a DM system.**

**Backend Mitigations:**

- **Mandatory auth middleware on all routes:** every request to `/conversations/:id/*` must verify `userId ∈ {participantAId, participantBId}`
- Centralize in middleware: `requireParticipant(req, res, next)`
- Apply to: REST message fetch, REST receipts, WS message send, WS read mark, WS typing — **no exceptions**

---

### T18: Forced Conversation Creation `[Backend]` `[🔴 High]`

**Threat:** Attacker creates DM conversations with any user, including users who may have blocked them or didn't consent to being contacted.

**Backend Mitigations:**

- Validate `recipientId` exists and is a real user
- Consider a block/allow list — check before creating conversation (v2, but design for it now)
- Rate-limit conversation creation: max 10 new DMs/hour per user
- Prevent creating a conversation with yourself

---

### T19: JWT Payload Manipulation `[Backend]` `[🟡 Medium]`

**Threat:** Attacker modifies the JWT payload (e.g., changing userId) to gain access as a different user. Works if signature verification is weak or missing.

**Backend Mitigations:**

- Always verify JWT signature using the **same secret** as NextAuth
- Validate `exp`, `iat`, and `iss` claims
- Use `jose` or `jsonwebtoken` library — never hand-parse JWTs
- Reject JWTs with `alg: "none"`

---

### T20: Client-Side Route Bypass `[Frontend]` `[🟡 Medium]`

**Threat:** Attacker navigates directly to `/dm/[conversationId]` for a conversation they shouldn't access. If the frontend fetches without re-checking auth, messages are exposed.

**Frontend Mitigations:**

- Server Components: fetch conversation data with the user's session — backend rejects unauthorized requests
- Show error/redirect on 403, don't render stale data

**Backend Mitigations:**

- **The real gate is always backend.** Even if frontend is bypassed, the API returns 403 for non-participants

---

## Implementation Security Checklist

### 🖥️ Frontend (Next.js)

- [ ] NextAuth cookies: `httpOnly`, `secure`, `sameSite: strict`
- [ ] CSP headers configured in `next.config.js`
- [ ] No `dangerouslySetInnerHTML` for user content
- [ ] No tokens in localStorage
- [ ] Messages in React state only (never persisted)
- [ ] Debounce send button (300ms)
- [ ] Only emit `read:mark` on window focus + scroll
- [ ] Handle 403 gracefully — redirect, don't render
- [ ] Idle timeout disconnects WS after N min inactivity

### ⚙️ Backend (Express + WS)

- [ ] `requireParticipant()` middleware on ALL conversation routes
- [ ] Derive `senderId` from JWT, never from payload
- [ ] Validate JWT signature + expiry on every request
- [ ] Reject `alg: "none"` JWTs
- [ ] WS auth on first frame + periodic re-validation
- [ ] Rate-limit: messages (30/min), connections (5/user), search (20/min), new DMs (10/hr)
- [ ] Max message size (5000 chars)
- [ ] Sanitize message content server-side
- [ ] Generic error responses in production
- [ ] Verify `lastReadMessageId` belongs to conversation
- [ ] TLS/WSS only — no plaintext

### 🍃 Database (MongoDB + Prisma)

- [ ] `@@unique([participantAId, participantBId])` enforced
- [ ] `@@unique([conversationId, userId])` on ReadReceipt
- [ ] Compound index on Message: `[conversationId, createdAt]`
- [ ] MongoDB auth enabled (not open to network)
- [ ] Connection string in env vars, not hardcoded
- [ ] Enable MongoDB audit log for production
- [ ] Prisma: never expose raw errors to client
- [ ] Regular backups configured

---

## Top 3 Threats to Address First

1. **Cross-conversation access (T17)** — implement `requireParticipant()` middleware before any other feature code
2. **Message injection via forged senderId (T3)** — always derive from JWT server-side
3. **IDOR on message history (T9)** — auth check on `GET /conversations/:id/messages`

These three cover the most critical attack vectors. Everything else layers on top.
