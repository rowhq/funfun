import { Metadata } from "next";
import Link from "next/link";
import { aboutNoulie, milestones } from "@/lib/constants";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { AboutContent } from "./AboutContent";
import { BackToWorld } from "@/components/ui/BackToWorld";

export const metadata: Metadata = {
  title: "About Noulie | Noulie's World",
  description: "Learn all about Noulie, our 2-year-old ballet princess",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <BackToWorld />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <span className="text-6xl block mb-4">👑</span>
          <h1 className="font-[family-name:var(--font-dancing-script)] text-5xl sm:text-6xl md:text-7xl text-pink mb-4">
            Meet Noulie
          </h1>
          <p className="text-lg text-foreground-muted">
            {aboutNoulie.age} • {aboutNoulie.title}
          </p>
        </FadeIn>

        <AboutContent aboutNoulie={aboutNoulie} milestones={milestones} />

        {/* Back Link */}
        <FadeIn className="text-center mt-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple hover:text-pink transition-colors font-medium"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}
