"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function BackToWorld() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-6 left-6 z-50"
    >
      <Link
        href="/?entered=true"
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink to-purple text-white rounded-full font-medium hover:scale-105 transition-transform shadow-lg shadow-pink/30"
      >
        <span className="text-lg">🩰</span>
        <span>Back to World</span>
      </Link>
    </motion.div>
  );
}
