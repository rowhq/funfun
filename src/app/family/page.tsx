import { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { FamilyContent } from "./FamilyContent";
import { BackToWorld } from "@/components/ui/BackToWorld";

export const metadata: Metadata = {
  title: "Family & Friends | Noulie's World",
  description: "The wonderful people in Noulie's life",
};

export default function FamilyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <BackToWorld />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <span className="text-6xl block mb-4">💖</span>
          <h1 className="font-[family-name:var(--font-dancing-script)] text-5xl sm:text-6xl md:text-7xl text-pink mb-4">
            Family & Friends
          </h1>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            The wonderful people who make Noulie&apos;s world so special
          </p>
        </FadeIn>

        <FamilyContent />

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
