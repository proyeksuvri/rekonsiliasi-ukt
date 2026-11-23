"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setPending(true);
    try {
      const result = await authClient.signUp.email({ name, email, password });
      if (result.error) {
        setMessage(result.error.message || "Pendaftaran gagal.");
        return;
      }
      window.location.href = "/dashboard";
    } catch {
      setMessage("Pendaftaran belum berhasil. Periksa data dan coba kembali.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <section style={{ width: "100%", maxWidth: 420, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 28 }}>
        <p style={{ color: "var(--primary)", fontSize: 12, fontWeight: 700, letterSpacing: 1.5 }}>REKONSILIASI KEUANGAN</p>
        <h1 style={{ fontSize: 26, marginBottom: 8 }}>Buat akun</h1>
        <p style={{ color: "var(--muted)", fontSize: 14 }}>Pendaftaran akun untuk akses aplikasi.</p>
        <form onSubmit={submit} style={{ display: "grid", gap: 14, marginTop: 24 }}>
          <label style={{ display: "grid", gap: 6, fontSize: 14 }}>Nama
            <input required value={name} onChange={e => setName(e.target.value)} style={fieldStyle} />
          </label>
          <label style={{ display: "grid", gap: 6, fontSize: 14 }}>Email
            <input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} style={fieldStyle} />
          </label>
          <label style={{ display: "grid", gap: 6, fontSize: 14 }}>Kata sandi (minimal 8 karakter)
            <input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} style={fieldStyle} />
          </label>
          {message ? <p role="alert" style={{ color: "#b42318", fontSize: 13 }}>{message}</p> : null}
          <button disabled={pending} type="submit" style={buttonStyle}>{pending ? "Memproses..." : "Daftar"}</button>
        </form>
        <p style={{ marginTop: 18, color: "var(--muted)", fontSize: 13 }}>Sudah punya akun? <Link href="/auth/sign-in" style={{ color: "var(--primary)", fontWeight: 700 }}>Masuk</Link></p>
      </section>
    </main>
  );
}

const fieldStyle = { width: "100%", border: "1px solid var(--border)", borderRadius: 8, padding: "11px 12px", background: "#fff", color: "var(--foreground)" };
const buttonStyle = { border: 0, borderRadius: 8, padding: "12px 14px", background: "var(--primary)", color: "#fff", fontWeight: 700, cursor: "pointer" };
