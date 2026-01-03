"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { galleries } from "@/lib/constants";

export function GalleryShowcase() {
  return (
    <section className="py-32 px-4 relative bg-background-secondary">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-pink mb-4 block">Explore</span>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl text-cream mb-6">
            The Galleries
          </h2>
          <p className="text-foreground-muted max-w-xl mx-auto">
            Step into Noulie&apos;s magical world and discover her favorite adventures
          </p>
        </motion.div>

        {/* Gallery cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleries.map((gallery, index) => (
            <motion.div
              key={gallery.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/galleries/${gallery.slug}`} className="block group">
                <motion.div
                  className="relative h-[450px] rounded-2xl bg-background-card border border-white/5 overflow-hidden card-glow"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${
                    gallery.color === 'pink' ? 'from-pink/40 to-purple/20' :
                    gallery.color === 'purple' ? 'from-purple/40 to-pink/20' :
                    'from-blue-400/40 to-purple/20'
                  }`} />

                  {/* Animated glow on hover */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${
                    gallery.color === 'pink' ? 'from-pink/10 to-transparent' :
                    gallery.color === 'purple' ? 'from-purple/10 to-transparent' :
                    'from-blue-400/10 to-transparent'
                  }`} />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col p-8">
                    {/* Emoji */}
                    <motion.span
                      className="text-7xl mb-auto"
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {gallery.emoji}
                    </motion.span>

                    {/* Text */}
                    <div>
                      <h3 className="font-[family-name:var(--font-playfair)] text-3xl text-cream mb-2">
                        {gallery.name}
                      </h3>
                      <p className="text-foreground-muted text-sm mb-6">
                        {gallery.description}
                      </p>

                      {/* View link */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider text-foreground-muted">
                          {gallery.images.length} Moments
                        </span>
                        <motion.span
                          className="text-pink flex items-center gap-2 text-sm"
                          whileHover={{ x: 5 }}
                        >
                          View Gallery
                          <span>→</span>
                        </motion.span>
                      </div>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${
                    gallery.color === 'pink' ? 'from-pink/20' :
                    gallery.color === 'purple' ? 'from-purple/20' :
                    'from-blue-400/20'
                  } to-transparent rounded-bl-full`} />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
