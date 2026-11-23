import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";

export default async function DashboardPage() {
  const { data: session } = await auth.getSession();
  if (!session?.user) redirect("/auth/sign-in");

  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, borderBottom: "1px solid var(--border)", paddingBottom: 24 }}>
        <div>
          <p style={{ color: "var(--primary)", fontSize: 12, fontWeight: 700, letterSpacing: 1.5 }}>AREA TERPROTEKSI</p>
          <h1 style={{ fontSize: 30, margin: "8px 0" }}>Dashboard Rekonsiliasi UKT</h1>
          <p style={{ color: "var(--muted)" }}>Masuk sebagai {session.user.email}</p>
        </div>
        <form action={async () => {
          "use server";
          await auth.signOut();
          redirect("/auth/sign-in");
        }}>
          <button type="submit" style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", background: "#fff", cursor: "pointer" }}>Keluar</button>
        </form>
      </header>
      <section style={{ marginTop: 28, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 22 }}>
        <h2 style={{ marginTop: 0 }}>Autentikasi aktif</h2>
        <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>Area ini hanya dapat dibuka setelah sesi pengguna terverifikasi. Hak akses peran (administrator, operator, pemeriksa, dan pimpinan) akan diterapkan pada tahap RBAC berikutnya.</p>
      </section>
    </main>
  );
}
