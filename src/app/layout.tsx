import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rekonsiliasi UKT",
  description: "Sistem rekonsiliasi penerimaan Uang Kuliah Tunggal"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
