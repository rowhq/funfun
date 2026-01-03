"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export function Hero() {
  const [isRevealed, setIsRevealed] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.9]);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Dark vignette overlay */}
      <div className="absolute inset-0 vignette pointer-events-none z-10" />

      {/* Animated gradient orbs - subtle like BAYC */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-pink/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple/10 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-gold/5 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main content with reveal animation */}
      <motion.div
        className="relative z-20 text-center px-4 max-w-5xl mx-auto"
        style={{ opacity, scale }}
      >
        {/* Crown with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mb-8"
        >
          <motion.div
            className="relative inline-block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-8xl sm:text-9xl md:text-[10rem] block filter drop-shadow-2xl">👑</span>
            {/* Glow behind crown */}
            <div className="absolute inset-0 text-8xl sm:text-9xl md:text-[10rem] blur-2xl opacity-50 -z-10">👑</div>
          </motion.div>
        </motion.div>

        {/* Main title - elegant serif like BAYC */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-cream mb-4 tracking-tight">
            Noulie&apos;s
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-[family-name:var(--font-playfair)] italic text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-pink text-glow mb-8 tracking-tight">
            World
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl md:text-2xl text-foreground-muted mb-12 max-w-xl mx-auto font-light tracking-wide"
        >
          An exclusive kingdom for a 2-year-old ballet princess
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link href="/galleries">
            <motion.button
              className="group relative px-10 py-4 btn-primary rounded-full text-lg font-medium text-white overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Enter the Kingdom
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </Link>

          <Link href="/about">
            <motion.button
              className="px-10 py-4 btn-outline rounded-full text-lg font-medium transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Meet Noulie
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-foreground-muted">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-cream/50 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Decorative elements - like BAYC stains */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-pink/5 blur-xl animate-pulse-glow" />
      <div className="absolute bottom-32 left-16 w-24 h-24 rounded-full bg-purple/5 blur-xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
    </section>
  );
}
