"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { fadeInUp } from "@/lib/animations";

interface AboutNoulie {
  name: string;
  age: string;
  title: string;
  favorites: { label: string; value: string; emoji: string }[];
  funFacts: string[];
}

interface Milestone {
  age: string;
  title: string;
  emoji: string;
}

interface AboutContentProps {
  aboutNoulie: AboutNoulie;
  milestones: Milestone[];
}

export function AboutContent({ aboutNoulie, milestones }: AboutContentProps) {
  return (
    <>
      {/* Favorites Section */}
      <FadeIn className="mb-16">
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-pink-light/30">
          <h2 className="font-[family-name:var(--font-dancing-script)] text-3xl text-purple mb-6 text-center">
            Noulie&apos;s Favorites
          </h2>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {aboutNoulie.favorites.map((favorite, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-4 bg-gradient-to-br from-pink-light/20 to-purple-light/20 rounded-2xl"
              >
                <span className="text-3xl block mb-2">{favorite.emoji}</span>
                <p className="text-sm text-foreground-muted">{favorite.label}</p>
                <p className="font-medium text-foreground">{favorite.value}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </FadeIn>

      {/* Fun Facts Section */}
      <FadeIn className="mb-16" delay={0.2}>
        <div className="bg-gradient-to-br from-purple-light/30 to-pink-light/30 rounded-3xl p-8">
          <h2 className="font-[family-name:var(--font-dancing-script)] text-3xl text-purple mb-6 text-center">
            Fun Facts About Noulie
          </h2>
          <ul className="space-y-4">
            {aboutNoulie.funFacts.map((fact, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="text-pink text-xl">✨</span>
                <span className="text-foreground">{fact}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </FadeIn>

      {/* Milestones Timeline */}
      <FadeIn delay={0.4}>
        <h2 className="font-[family-name:var(--font-dancing-script)] text-3xl text-purple mb-8 text-center">
          Noulie&apos;s Journey
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-pink-light -translate-x-1/2 hidden md:block" />

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`flex items-center gap-4 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-md border border-pink-light/30 inline-block">
                    <span className="text-3xl block mb-2">{milestone.emoji}</span>
                    <p className="text-sm text-foreground-muted">{milestone.age}</p>
                    <p className="font-[family-name:var(--font-dancing-script)] text-xl text-purple">
                      {milestone.title}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block w-4 h-4 bg-pink rounded-full border-4 border-white shadow-md z-10" />
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </FadeIn>
    </>
  );
}
