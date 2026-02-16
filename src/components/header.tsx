'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Flower,
  Home,
  Mail,
  Menu,
  Palette,
  ShoppingCart,
  X,
} from 'lucide-react';

import { isShopEnabled } from '@/lib/shop';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shopEnabled = isShopEnabled();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-card backdrop-blur-sm border-b border-border">
      <nav className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-4 text-2xl font-bold hover:text-primary"
            >
              <Image
                alt="Joyce Art Studio"
                src="/images/logo.png"
                width={48}
                height={48}
                priority
              />
              Joyce Art Studio
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="flex items-center gap-2 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center gap-2 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                <Palette className="w-4 h-4" />
                Portfolio
              </Link>
              {shopEnabled && (
                <Link
                  href="/shop"
                  className="flex items-center gap-2 hover:text-primary px-3 py-2 text-sm font-medium"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Shop
                </Link>
              )}
              <Link
                href="/about"
                className="flex items-center gap-2 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                <Flower className="w-4 h-4" />
                About
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                <Mail className="w-4 h-4" />
                Contact
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="hover:text-primary"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              <Link
                href="/"
                className="flex items-center gap-2 hover:text-primary px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center gap-2 hover:text-primary px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Palette className="w-4 h-4" />
                Portfolio
              </Link>
              {shopEnabled && (
                <Link
                  href="/shop"
                  className="flex items-center gap-2 hover:text-primary px-3 py-2 text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Shop
                </Link>
              )}
              <Link
                href="/about"
                className="flex items-center gap-2 hover:text-primary px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Flower className="w-4 h-4" />
                About
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 hover:text-primary px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Mail className="w-4 h-4" />
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
