import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SplashWrapper from "@/components/splash-screen/splash-wrapper";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipedia",
  description: "Food recipe generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SplashWrapper>{children}</SplashWrapper>
      </body>
    </html>
  );
}
