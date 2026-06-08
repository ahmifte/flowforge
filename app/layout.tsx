import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "flowforge — AI workflow automation runner",
    template: "%s — flowforge",
  },
  description:
    "Self-hostable AI workflow automation runner with streaming, built on the Vercel AI SDK. Bring your own key.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans">
        <Navbar />
        <main className="container py-10">{children}</main>
      </body>
    </html>
  );
}
