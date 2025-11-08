import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boutique Republic - Innovative Software Solutions",
  description:
    "Your partner for custom software development, web, and mobile applications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        <main className="min-h-[calc(100vh-(--spacing(20)))]">{children}</main>{" "}
        {/* Adjust min-height based on footer height */}
      </body>
    </html>
  );
}
