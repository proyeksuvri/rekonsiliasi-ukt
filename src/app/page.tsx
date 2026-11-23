const modules = [
  ["Data Tagihan", "Impor dan tinjau data kewajiban UKT."],
  ["Penerimaan PAY", "Kelola penerimaan yang tercatat di aplikasi."],
  ["Virtual Account", "Kelola referensi VA sebagai penghubung transaksi."],
  ["Rekening Koran", "Impor transaksi BRI, BSI, dan Sulselbar."],
  ["Rekonsiliasi", "Jalankan pencocokan sesuai aturan masing-masing bank."],
  ["Laporan & Audit", "Telusuri hasil, bukti pencocokan, dan riwayat aktivitas."]
];

export default function Home() {
  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 24px" }}>
      <header style={{ borderBottom: "1px solid var(--border)", paddingBottom: 28, marginBottom: 32 }}>
        <p style={{ color: "var(--primary)", fontSize: 12, fontWeight: 700, letterSpacing: 2 }}>
          SISTEM REKONSILIASI KEUANGAN
        </p>
        <h1 style={{ fontSize: 34, margin: "12px 0" }}>Rekonsiliasi UKT</h1>
        <p style={{ color: "var(--muted)", maxWidth: 720, lineHeight: 1.7 }}>
          Ruang kerja untuk memeriksa kesesuaian tagihan, penerimaan PAY,
          Virtual Account, dan transaksi rekening koran bank.
        </p>
      </header>
      <section>
        <h2 style={{ fontSize: 20 }}>Modul MVP</h2>
        <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
          Fondasi antarmuka awal. Fungsi operasional akan dibangun dan diuji bertahap.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 24 }}>
          {modules.map(([title, description]) => (
            <article key={title} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
              <h3 style={{ marginTop: 0, fontSize: 16 }}>{title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, marginBottom: 0 }}>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <footer style={{ borderTop: "1px solid var(--border)", marginTop: 48, paddingTop: 20, color: "var(--muted)", fontSize: 12 }}>
        MVP Rekonsiliasi UKT · Fondasi proyek
      </footer>
    </main>
  );
}
