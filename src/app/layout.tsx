import MiniCart from "@/components/cart/MiniCart";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import WishlistModal from "@/components/layout/WishlistModal";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

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
      <body
        className={`${inter.variable} ${playfair.variable} font-sans`}
        suppressHydrationWarning
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MiniCart />
          <WishlistModal />
        </div>
      </body>
    </html>
  );
}
