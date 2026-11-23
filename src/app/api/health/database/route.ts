import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const { data: session } = await auth.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await db.query(
      "SELECT current_database() AS database_name, current_timestamp AS checked_at, (SELECT count(*)::int FROM information_schema.tables WHERE table_schema = 'public') AS public_table_count"
    );
    return NextResponse.json({ status: "ok", ...result.rows[0] });
  } catch {
    return NextResponse.json({ status: "error", message: "Database connection failed" }, { status: 503 });
  }
}
