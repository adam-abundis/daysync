// ================================================
// src/lib/auth-client.ts
// Better Auth browser client.
// Used in page.tsx components to get the current user and sign in.
//
// Exports: authClient
// Used in: page.tsx files (client side) to get the current user
// ================================================

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

export const { signIn, signOut, useSession } = authClient;
