"use client";

import { motion } from "framer-motion";

interface PhotoCardProps {
  index: number;
  color: string;
  alt: string;
}

const colorClasses = {
  pink: "from-pink-light to-pink",
  purple: "from-purple-light to-purple",
  blue: "from-blue-light to-blue",
};

export function PhotoCard({ index, color, alt }: PhotoCardProps) {
  return (
    <motion.div
      className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      {/* Placeholder gradient (replace with actual images) */}
      <div
        className={`w-full h-full bg-gradient-to-br ${
          colorClasses[color as keyof typeof colorClasses] || colorClasses.pink
        } flex items-center justify-center`}
      >
        <span className="text-6xl opacity-50">📷</span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-sm font-medium">{alt}</p>
        <p className="text-white/70 text-xs">Photo #{index + 1}</p>
      </div>
    </motion.div>
  );
}
