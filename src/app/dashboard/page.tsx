import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { getCurrentUserAccess } from "@/lib/auth/access";
export default async function DashboardPage() {
  const { data: session } = await auth.getSession();
  if (!session?.user) redirect("/auth/sign-in");
  const access = await getCurrentUserAccess();
  if (!access?.roleCode) return <main style={{maxWidth:760,margin:"0 auto",padding:"64px 24px"}}><h1>Akses belum diberikan</h1><p>Akun {session.user.email} berhasil masuk, tetapi belum memiliki peran aktif atau email belum diverifikasi. Hubungi administrator aplikasi.</p></main>;
  return <main style={{maxWidth:1000,margin:"0 auto",padding:"48px 24px"}}><h1>Dashboard Rekonsiliasi UKT</h1><p>Masuk sebagai {session.user.email} · Peran: {access.roleCode}</p><form action={async () => { "use server"; await auth.signOut(); redirect("/auth/sign-in"); }}><button type="submit">Keluar</button></form><section><h2>Hak akses aktif</h2><p>Identitas pengguna telah dipetakan ke peran aplikasi. Modul operasional akan dibuka sesuai matriks kewenangan.</p></section></main>;
}