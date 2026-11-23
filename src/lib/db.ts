import "server-only";
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & { pgPool?: Pool };

export const db = globalForDb.pgPool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000
});

if (process.env.NODE_ENV !== "production") globalForDb.pgPool = db;
