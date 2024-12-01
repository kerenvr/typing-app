// layout.tsx
"use client";
import { ThemeProvider, useTheme } from '../themes/ThemeContext'; 
import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

const karla = Karla({ subsets: ["latin"] });

import {
  ClerkProvider
} from '@clerk/nextjs'
import Footer from '@/components/footer/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <MainLayout>{children}</MainLayout>
    </ThemeProvider>
  );
}

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <ClerkProvider>
    <html data-theme={theme} lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={`${theme} ${karla.className}`} suppressHydrationWarning={true}>
        <div className="navbar">
          <Navbar />
        </div>
        <div className='body-container'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
};
