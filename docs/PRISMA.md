# DaySync Prisma Case Study

## Why Prisma
We needed our Next.js app to talk to Postgres without raw SQL.
Prisma also generates TypeScript types from your schema automatically.
Unlike Sequelize, types and models never drift apart.

## The Connection
DATABASE_URL in .env points to Docker locally and Neon in production.
In Prisma 7 this URL lives in prisma.config.ts, not schema.prisma.

## The Schema
Six tables defined in prisma/schema.prisma matching SCHEMA-V1.md exactly.
Community, Member, Schedule, Meeting are core tables.
Membership and MeetingMember are junction tables for many-to-many relationships.

## The Singleton
Next.js hot reloads on every save which would create a new database connection each time.
We save the Prisma instance to globalThis to prevent that.
Import prisma from src/lib/prisma.ts everywhere. Never create a new PrismaClient directly.

## Dependency Note
Member.userId points to Better Auth's user table.
Tables exist in Postgres but stay empty until Better Auth is configured.

## Commands

After changing schema.prisma run these in order:
```bash
npx prisma generate
npx prisma db push
```

To inspect data visually:
```bash
npx prisma studio
```

If the database breaks:
```bash
docker-compose down -v
docker-compose up -d
npx prisma db push
```
