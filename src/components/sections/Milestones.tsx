"use client";

import { motion } from "framer-motion";
import { milestones } from "@/lib/constants";

export function Milestones() {
  return (
    <section className="py-32 px-4 relative bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-gold mb-4 block">Journey</span>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl text-cream">
            Milestones
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-pink/30 to-transparent -translate-x-1/2 hidden md:block" />

          <div className="space-y-16 md:space-y-0">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className={`relative md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:mb-16`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div className="bg-background-card border border-white/5 rounded-xl p-6 inline-block">
                    <motion.span
                      className="text-5xl block mb-3"
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    >
                      {milestone.emoji}
                    </motion.span>
                    <p className="text-xs uppercase tracking-wider text-pink mb-1">{milestone.age}</p>
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl text-cream">
                      {milestone.title}
                    </h3>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-pink rounded-full shadow-[0_0_20px_rgba(255,107,157,0.5)]" />

                {/* Spacer */}
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
