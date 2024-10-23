import type { Metadata } from "next";
import { Reddit_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"

const reddit_Mono = Reddit_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <div className="navbar">
          <Navbar />
        </div>
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
