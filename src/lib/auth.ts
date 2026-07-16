// ================================================
// src/lib/auth.ts
// Better Auth configuration.
// Connects to Postgres via Prisma, enables Google OAuth and magic link sign in.
//
// Exports: auth
// Used in: action.ts files (server side) to get the current user
// ================================================

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  // baseURL is required for multi-host setups
  baseURL: process.env.BETTER_AUTH_URL,

  // Connect Better Auth to your Postgres database via Prisma
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // Secret key for signing session cookies
  secret: process.env.BETTER_AUTH_SECRET,

  // Sign in methods
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  emailAndPassword: {
    enabled: true,
  },
});
