"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { navLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <span className="text-3xl">👑</span>
              <span className="font-[family-name:var(--font-playfair)] text-2xl text-cream">
                Noulie&apos;s World
              </span>
            </Link>
            <p className="text-foreground-muted text-sm leading-relaxed">
              An exclusive magical kingdom for a 2-year-old ballet princess.
              Where every moment is a treasure.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-foreground-muted mb-6">Navigate</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/60 hover:text-pink transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Galleries */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-foreground-muted mb-6">Galleries</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/galleries/ballet" className="text-cream/60 hover:text-pink transition-colors text-sm flex items-center gap-2">
                  <span>🩰</span> Ballet
                </Link>
              </li>
              <li>
                <Link href="/galleries/princess" className="text-cream/60 hover:text-pink transition-colors text-sm flex items-center gap-2">
                  <span>👑</span> Princess
                </Link>
              </li>
              <li>
                <Link href="/galleries/adventures" className="text-cream/60 hover:text-pink transition-colors text-sm flex items-center gap-2">
                  <span>✨</span> Adventures
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground-muted">
            &copy; {new Date().getFullYear()} Noulie&apos;s World. Made with 💖
          </p>
          <div className="flex gap-2">
            {["🩰", "👑", "✨", "🦄", "💖"].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-lg opacity-40"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
