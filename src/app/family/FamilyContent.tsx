"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { fadeInUp } from "@/lib/animations";

const familyMembers = [
  { name: "Mommy", emoji: "👩", role: "Best hugger ever" },
  { name: "Daddy", emoji: "👨", role: "Story time expert" },
  { name: "Mr. Snuggles", emoji: "🧸", role: "Best teddy friend" },
];

const specialMoments = [
  { title: "Family Dance Parties", emoji: "💃", description: "Every Friday night!" },
  { title: "Bedtime Stories", emoji: "📚", description: "The best part of the day" },
  { title: "Park Adventures", emoji: "🌳", description: "Swings are the best!" },
  { title: "Baking Days", emoji: "🧁", description: "Making yummy treats" },
];

export function FamilyContent() {
  return (
    <>
      {/* Family Members */}
      <FadeIn className="mb-16">
        <h2 className="font-[family-name:var(--font-dancing-script)] text-3xl text-purple mb-8 text-center">
          My Family
        </h2>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {familyMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white rounded-3xl p-8 shadow-lg border border-pink-light/30 text-center hover:shadow-xl transition-shadow"
            >
              <motion.span
                className="text-6xl block mb-4"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {member.emoji}
              </motion.span>
              <h3 className="font-[family-name:var(--font-dancing-script)] text-2xl text-pink mb-2">
                {member.name}
              </h3>
              <p className="text-foreground-muted">{member.role}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </FadeIn>

      {/* Special Moments */}
      <FadeIn delay={0.2}>
        <h2 className="font-[family-name:var(--font-dancing-script)] text-3xl text-purple mb-8 text-center">
          Special Family Moments
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {specialMoments.map((moment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-pink-light/20 to-purple-light/20 rounded-2xl p-6 flex items-center gap-4"
            >
              <span className="text-4xl">{moment.emoji}</span>
              <div>
                <h3 className="font-medium text-foreground">{moment.title}</h3>
                <p className="text-sm text-foreground-muted">{moment.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      {/* Message */}
      <FadeIn delay={0.4} className="mt-16">
        <div className="bg-gradient-to-r from-pink via-purple to-blue rounded-3xl p-8 text-center">
          <span className="text-4xl block mb-4">💝</span>
          <p className="text-white text-lg font-medium">
            &quot;Family is where the magic happens&quot;
          </p>
        </div>
      </FadeIn>
    </>
  );
}
