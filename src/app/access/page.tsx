import { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { AccessContent } from "./AccessContent";

export const metadata: Metadata = {
  title: "Family Access | Noulie's World",
  description: "Exclusive access for family members",
};

export default function AccessPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
      <div className="max-w-md mx-auto w-full">
        {/* Header */}
        <FadeIn className="text-center mb-8">
          <span className="text-6xl block mb-4">🔐</span>
          <h1 className="font-[family-name:var(--font-dancing-script)] text-4xl sm:text-5xl text-pink mb-4">
            Family Access
          </h1>
          <p className="text-foreground-muted">
            This area is for family members only
          </p>
        </FadeIn>

        <AccessContent />

        {/* Back Link */}
        <FadeIn className="text-center mt-8">
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
