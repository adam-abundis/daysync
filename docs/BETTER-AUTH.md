# DaySync Better Auth Case Study

## Why Better Auth
HTTP is stateless. Every request to your server is anonymous by default.
Building auth from scratch means writing the Google OAuth handshake, managing 
session cookies, and verifying tokens on every request.
Better Auth handles all of that so we can focus on DaySync.

## What It Owns
Better Auth owns identity. DaySync owns everything else.
Better Auth answers: who is this person and are they logged in.
The Member table answers: what can they do in DaySync.
Member.userId is the bridge between the two.

## The Four Tables It Creates
Never write these manually. Run npx @better-auth/cli@latest generate.

User — stores email and name for everyone who signs in.
Session — stores who is logged in and when their session expires.
Account — stores the Google OAuth connection per user.
Verification — stores magic link tokens until they are clicked.

## The Two Sign In Methods
Google OAuth uses GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.
Better Auth handles the entire redirect flow.

Magic link sends an email via Resend.
In development that email is caught by Mailpit at localhost:8025.

## How DaySync Uses Better Auth
Server side in action.ts:
```tsx
import { auth } from "@/lib/auth"
const session = await auth.api.getSession({ headers })
```

Client side in page.tsx:
```tsx
import { useSession, signIn } from "@/lib/auth-client"
const { data: session } = useSession()
```

## The API Route
One catch-all route handles all auth requests including Google callbacks.
Lives at src/app/api/auth/[...nextauth]/route.ts.
Same concept as a wildcard route in Express.

## Commands
After changing auth configuration:
```bash
npx @better-auth/cli@latest generate
npx prisma generate
npx prisma db push
```

Verify Better Auth is running:
```bash
curl http://localhost:3000/api/auth/get-session
```
Returns null when no one is signed in. That is correct.
