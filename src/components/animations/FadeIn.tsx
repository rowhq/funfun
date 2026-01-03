"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeIn, slideInLeft, slideInRight } from "@/lib/animations";

interface FadeInProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right" | "none";
  delay?: number;
  className?: string;
}

export function FadeIn({ children, direction = "up", delay = 0, className }: FadeInProps) {
  const variants = {
    up: fadeInUp,
    left: slideInLeft,
    right: slideInRight,
    none: fadeIn,
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants[direction]}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
