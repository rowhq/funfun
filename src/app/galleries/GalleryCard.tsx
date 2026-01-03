"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp } from "@/lib/animations";

interface Gallery {
  slug: string;
  name: string;
  description: string;
  color: string;
  emoji: string;
  images: { id: number; alt: string }[];
}

const colorClasses = {
  pink: "from-pink-light to-pink hover:shadow-pink/30",
  purple: "from-purple-light to-purple hover:shadow-purple/30",
  blue: "from-blue-light to-blue hover:shadow-blue/30",
};

export function GalleryCard({ gallery }: { gallery: Gallery }) {
  return (
    <motion.div variants={fadeInUp}>
      <Link href={`/galleries/${gallery.slug}`} className="block group">
        <div
          className={`relative h-96 rounded-3xl bg-gradient-to-br ${
            colorClasses[gallery.color as keyof typeof colorClasses]
          } p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden`}
        >
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute top-1/2 right-4 w-20 h-20 bg-white/5 rounded-full" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <motion.span
                className="text-6xl block mb-4"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.3 }}
              >
                {gallery.emoji}
              </motion.span>
              <h2 className="font-[family-name:var(--font-dancing-script)] text-4xl text-white mb-2">
                {gallery.name}
              </h2>
              <p className="text-white/80 text-lg">{gallery.description}</p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/60 text-sm">
                {gallery.images.length} photos
              </span>
              <div className="flex items-center gap-2 text-white font-medium group-hover:gap-4 transition-all">
                <span>View Gallery</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
