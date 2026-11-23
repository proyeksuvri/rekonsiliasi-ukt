"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";
export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [verifyMode, setVerifyMode] = useState(false);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(""); setPending(true);
    try {
      if (!verifyMode) {
        const result = await authClient.signUp.email({ name, email, password });
        if (result.error) { setMessage(result.error.message || "Pendaftaran gagal."); return; }
        setVerifyMode(true);
        setMessage("Kode verifikasi telah diminta. Periksa kotak masuk dan folder spam email Anda.");
      } else {
        const result = await authClient.emailOtp.verifyEmail({ email, otp });
        if (result.error) { setMessage(result.error.message || "Kode verifikasi tidak valid."); return; }
        window.location.href = "/dashboard";
      }
    } catch (error) { setMessage(error instanceof Error ? error.message : "Proses belum berhasil. Coba kembali."); }
    finally { setPending(false); }
  }
  async function resendCode() {
    setMessage(""); setPending(true);
    try {
      const result = await authClient.emailOtp.sendVerificationOtp({ email, type: "email-verification" });
      setMessage(result.error ? result.error.message : "Kode verifikasi telah dikirim ulang.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Kode belum dapat dikirim ulang."); }
    finally { setPending(false); }
  }
  return <main style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:24}}><section style={{width:"100%",maxWidth:420,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:28}}><p style={{color:"var(--primary)",fontSize:12,fontWeight:700,letterSpacing:1.5}}>REKONSILIASI KEUANGAN</p><h1 style={{fontSize:26,marginBottom:8}}>{verifyMode ? "Verifikasi email" : "Buat akun"}</h1><p style={{color:"var(--muted)",fontSize:14}}>{verifyMode ? "Masukkan kode OTP yang dikirim ke alamat email terdaftar." : "Pendaftaran akun untuk akses aplikasi."}</p><form onSubmit={submit} style={{display:"grid",gap:14,marginTop:24}}>{!verifyMode ? <><label style={{display:"grid",gap:6,fontSize:14}}>Nama<input required value={name} onChange={e=>setName(e.target.value)} style={fieldStyle}/></label><label style={{display:"grid",gap:6,fontSize:14}}>Email<input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} style={fieldStyle}/></label><label style={{display:"grid",gap:6,fontSize:14}}>Kata sandi (minimal 8 karakter)<input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)} style={fieldStyle}/></label></> : <><p style={{fontSize:14,color:"var(--muted)"}}>Alamat: {email}</p><label style={{display:"grid",gap:6,fontSize:14}}>Kode OTP<input required inputMode="numeric" autoComplete="one-time-code" value={otp} onChange={e=>setOtp(e.target.value)} style={fieldStyle}/></label></>}{message ? <p role="status" style={{color:"var(--muted)",fontSize:13}}>{message}</p> : null}<button disabled={pending} type="submit" style={buttonStyle}>{pending ? "Memproses..." : verifyMode ? "Verifikasi email" : "Daftar"}</button></form>{verifyMode ? <button disabled={pending} onClick={resendCode} style={{marginTop:12,border:0,background:"transparent",color:"var(--primary)",cursor:"pointer"}}>Kirim ulang kode</button> : null}<p style={{marginTop:18,color:"var(--muted)",fontSize:13}}>Sudah punya akun? <Link href="/auth/sign-in" style={{color:"var(--primary)",fontWeight:700}}>Masuk</Link></p></section></main>;
}
const fieldStyle = {width:"100%",border:"1px solid var(--border)",borderRadius:8,padding:"11px 12px",background:"#fff",color:"var(--foreground)"};
const buttonStyle = {border:0,borderRadius:8,padding:"12px 14px",background:"var(--primary)",color:"#fff",fontWeight:700,cursor:"pointer"};