"use client";

import { motion } from "framer-motion";
import { PhotoCard } from "./PhotoCard";
import { fadeInUp } from "@/lib/animations";

interface Photo {
  id: number;
  alt: string;
}

interface PhotoGridProps {
  photos: Photo[];
  color: string;
}

export function PhotoGrid({ photos, color }: PhotoGridProps) {
  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {photos.map((photo, index) => (
        <motion.div key={photo.id} variants={fadeInUp}>
          <PhotoCard index={index} color={color} alt={photo.alt} />
        </motion.div>
      ))}
    </motion.div>
  );
}
