import MiniCart from "@/components/cart/MiniCart";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyShop - Premium Fashion Clothing",
  description:
    "Discover premium quality shirts, pants, and lifestyle clothing. Modern Bangladeshi fashion brand with elegant designs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MiniCart />
        </div>
      </body>
    </html>
  );
}
