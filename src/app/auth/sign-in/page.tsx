"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const result = await authClient.signIn.email({ email, password });
      if (result.error) {
        setError(result.error.message || "Email atau kata sandi tidak valid.");
        return;
      }
      window.location.href = "/dashboard";
    } catch {
      setError("Tidak dapat masuk. Periksa koneksi lalu coba kembali.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <section style={{ width: "100%", maxWidth: 420, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 28 }}>
        <p style={{ color: "var(--primary)", fontSize: 12, fontWeight: 700, letterSpacing: 1.5 }}>REKONSILIASI KEUANGAN</p>
        <h1 style={{ fontSize: 26, marginBottom: 8 }}>Masuk ke Rekonsiliasi UKT</h1>
        <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>Gunakan akun yang telah terdaftar untuk mengakses modul rekonsiliasi.</p>
        <form onSubmit={submit} style={{ display: "grid", gap: 14, marginTop: 24 }}>
          <label style={{ display: "grid", gap: 6, fontSize: 14 }}>Email
            <input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} style={fieldStyle} />
          </label>
          <label style={{ display: "grid", gap: 6, fontSize: 14 }}>Kata sandi
            <input required type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} style={fieldStyle} />
          </label>
          {error ? <p role="alert" style={{ color: "#b42318", fontSize: 13, margin: 0 }}>{error}</p> : null}
          <button disabled={pending} type="submit" style={buttonStyle}>{pending ? "Memproses..." : "Masuk"}</button>
        </form>
        <p style={{ marginTop: 18, color: "var(--muted)", fontSize: 13 }}>Belum memiliki akun? <Link href="/auth/sign-up" style={{ color: "var(--primary)", fontWeight: 700 }}>Daftar</Link></p>
      </section>
    </main>
  );
}

const fieldStyle = { width: "100%", border: "1px solid var(--border)", borderRadius: 8, padding: "11px 12px", background: "#fff", color: "var(--foreground)" };
const buttonStyle = { border: 0, borderRadius: 8, padding: "12px 14px", background: "var(--primary)", color: "#fff", fontWeight: 700, cursor: "pointer" };
