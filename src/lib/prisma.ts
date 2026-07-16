// ================================================
// src/lib/prisma.ts
// Single Prisma client instance for the entire app.
// Prevents duplicate database connections during Next.js hot reload.
// Exports prisma. Imported by every action.ts file that needs the database.
// ================================================

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
