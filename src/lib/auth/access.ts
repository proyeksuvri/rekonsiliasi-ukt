import "server-only";
import { auth } from "@/lib/auth/server";
import { db } from "@/lib/db";
export async function getCurrentUserAccess() {
  const { data: session } = await auth.getSession();
  if (!session?.user) return null;
  const user = session.user as typeof session.user & { emailVerified?: boolean };
  const userId = String(user.id);
  const email = String(user.email ?? "").trim().toLowerCase();
  if (!userId || !email || user.emailVerified !== true) return { userId, email, roleCode: null };
  const bound = await db.query("WITH bound AS (UPDATE app_user_roles SET auth_user_id = $1, updated_at = now() WHERE lower(email) = $2 AND auth_user_id IS NULL AND is_active = true RETURNING id, role_code), logged AS (INSERT INTO audit_logs (actor_id, action, entity_type, entity_id, after_data, reason) SELECT $1, 'AUTH_ROLE_BOUND', 'app_user_roles', id::text, jsonb_build_object('email', $2, 'role_code', role_code), 'Automatic binding after verified email authentication' FROM bound RETURNING id) SELECT id, role_code FROM bound", [userId, email]);
  const role = await db.query("SELECT role_code FROM app_user_roles WHERE auth_user_id = $1 AND lower(email) = $2 AND is_active = true LIMIT 1", [userId, email]);
  return { userId, email, roleCode: role.rows[0]?.role_code ?? bound.rows[0]?.role_code ?? null };
}