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
      <body className={`${theme} ${karla.className}`} suppressHydrationWarning={true}>
        <div className="navbar">
          <Navbar />
        </div>
        <div className='body-container'>
          {children}
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
};
