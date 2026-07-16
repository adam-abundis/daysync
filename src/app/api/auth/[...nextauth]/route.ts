// ================================================
// src/app/api/auth/[...nextauth]/route.ts
// Better Auth API route handler.
// Catches all requests to /api/auth/* and passes them to Better Auth.
//
// Exports: GET, POST
// Used by: Better Auth internally for OAuth callbacks and magic links
// ================================================

import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
