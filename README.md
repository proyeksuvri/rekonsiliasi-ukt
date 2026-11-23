# Rekonsiliasi UKT

Aplikasi internal untuk rekonsiliasi tagihan UKT, penerimaan PAY, Virtual Account, dan rekening koran bank.

## Ruang lingkup MVP

- Autentikasi dan pembatasan hak akses.
- Impor data tagihan, penerimaan PAY, Virtual Account, dan rekening koran.
- Rekonsiliasi BRI secara individual berdasarkan VA, tanggal kalender, dan nominal.
- Rekonsiliasi BSI secara agregat per NIM.
- Rekonsiliasi Sulselbar berdasarkan VA/NIM, tanggal, nominal, serta penandaan indikasi reversal.
- Hasil rekonsiliasi, laporan, dan audit trail.

## Prinsip pengolahan

1. Data sumber disimpan tanpa mengubah berkas atau nilai aslinya.
2. Setiap hasil pencocokan harus dapat ditelusuri ke transaksi sumber.
3. Status rekonsiliasi tidak boleh dinaikkan tanpa bukti yang memadai.
4. Proses impor dan rekonsiliasi harus tercatat dalam audit trail.
5. Transaksi ambigu, duplikat, dan indikasi reversal tidak otomatis dinyatakan cocok.

## Teknologi

- Next.js App Router
- TypeScript
- Neon PostgreSQL
- Neon Auth
- GitHub
- Vercel

## Status

Inisialisasi repository. Modul operasional MVP akan dibangun dan diuji bertahap.
