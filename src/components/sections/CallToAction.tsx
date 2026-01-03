"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CallToAction() {
  return (
    <section className="relative py-40 px-4 overflow-hidden bg-background-secondary">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink/10 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple/10 rounded-full blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="text-6xl block mb-8"
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            ✨
          </motion.span>

          <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl text-cream mb-6">
            Enter the
            <span className="block text-pink text-glow italic">Kingdom</span>
          </h2>

          <p className="text-lg text-foreground-muted mb-12 max-w-xl mx-auto">
            Join our exclusive world and discover all the magical moments of our little ballet princess
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/galleries">
              <motion.button
                className="px-10 py-4 btn-primary rounded-full text-lg font-medium text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Galleries
              </motion.button>
            </Link>
            <Link href="/access">
              <motion.button
                className="px-10 py-4 btn-outline rounded-full text-lg font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Family Access
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
