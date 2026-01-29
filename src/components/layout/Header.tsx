"use client";

import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  IoCartOutline,
  IoChevronDown,
  IoHeartOutline,
  IoMenuOutline,
  IoPersonOutline,
  IoSearchOutline,
} from "react-icons/io5";

import MobileMenu from "./MobileMenu";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  // Header ref to measure height
  const headerRef = React.useRef<HTMLElement>(null);

  const { cart, wishlist, setMobileMenuOpen } = useStore();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate header height using CSS variable
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          "--header-height",
          `${height}px`,
        );
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop", hasMegaMenu: true },
    { label: "Men", href: "/men" },
    { label: "Women", href: "/women" },
    { label: "New", href: "/shop?tag=new-arrival" },
    { label: "Sale", href: "/shop?tag=sale" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 w-full z-40 flex flex-col transition-all duration-300`}
      >
        {/* Top Bar */}
        <div className="bg-gray-900 text-white text-xs py-2 hidden md:block">
          <div className="container flex justify-between items-center">
            <p>Welcome to MyShop - Premium Fashion Store</p>
            <div className="flex items-center gap-4">
              <Link href="/track-order" className="hover:text-gray-300">
                Track Order
              </Link>
              <Link href="/help" className="hover:text-gray-300">
                Help
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? "bg-white/90 backdrop-blur-md shadow-md py-3"
              : "bg-white py-4 md:py-5"
          }`}
        >
          <div className="container">
            <div className="flex items-center justify-between gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <IoMenuOutline size={28} />
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center">
                <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
                  <span className="text-gray-900">MY</span>
                  <span className="text-orange-500">SHOP</span>
                </h1>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <div key={link.href} className="relative group">
                    <Link
                      href={link.href}
                      className="text-base font-semibold text-gray-900 hover:text-orange-500 transition-colors flex items-center gap-1 relative py-2"
                      onMouseEnter={() =>
                        link.hasMegaMenu && setShowMegaMenu(true)
                      }
                    >
                      {link.label}
                      {link.hasMegaMenu && <IoChevronDown size={16} />}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
                  aria-label="Search"
                >
                  <IoSearchOutline size={24} />
                </button>

                <Link
                  href="/wishlist"
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Wishlist"
                >
                  <IoHeartOutline size={24} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => useStore.getState().setMiniCartOpen(true)}
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Shopping cart"
                >
                  <IoCartOutline size={24} />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </button>

                <Link
                  href="/login"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
                  aria-label="Account"
                >
                  <IoPersonOutline size={24} />
                </Link>
              </div>
            </div>
          </div>

          {/* Mega Menu */}
          {showMegaMenu && (
            <div
              className="absolute top-full left-0 w-full bg-white shadow-lg py-8 border-t"
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <div className="container">
                <div className="grid grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-gray-900">
                      Men&apos;s Clothing
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href="/shop?category=mens-shirts"
                          className="text-gray-600 hover:text-orange-500 transition-colors block"
                        >
                          Shirts
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shop?category=mens-pants"
                          className="text-gray-600 hover:text-orange-500 transition-colors block"
                        >
                          Pants
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shop?category=mens-accessories"
                          className="text-gray-600 hover:text-orange-500 transition-colors block"
                        >
                          Accessories
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-gray-900">
                      Women&apos;s Clothing
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href="/shop?category=womens-tops"
                          className="text-gray-600 hover:text-orange-500 transition-colors block"
                        >
                          Tops
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shop?category=womens-dresses"
                          className="text-gray-600 hover:text-orange-500 transition-colors block"
                        >
                          Dresses
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shop?category=womens-accessories"
                          className="text-gray-600 hover:text-orange-500 transition-colors block"
                        >
                          Accessories
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-gray-900">
                      Collections
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href="/shop?tag=new-arrival"
                          className="text-gray-600 hover:text-orange-500 transition-colors block"
                        >
                          New Arrivals
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shop?tag=trending"
                          className="text-gray-600 hover:text-orange-500 transition-colors block"
                        >
                          Trending
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shop?tag=bestseller"
                          className="text-gray-600 hover:text-orange-500 transition-colors block"
                        >
                          Best Sellers
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-gray-900">
                      Shop By Price
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href="/shop?priceRange=0-1000"
                          className="text-gray-600 hover:text-orange-500 transition-colors block"
                        >
                          Under 1000 BDT
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shop?priceRange=1000-2500"
                          className="text-gray-600 hover:text-orange-500 transition-colors block"
                        >
                          1000 - 2500 BDT
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shop?priceRange=2500-5000"
                          className="text-gray-600 hover:text-orange-500 transition-colors block"
                        >
                          2500+ BDT
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <MobileMenu />
    </>
  );
};

export default Header;
