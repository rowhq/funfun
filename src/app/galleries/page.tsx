import { Metadata } from "next";
import Link from "next/link";
import { galleries } from "@/lib/constants";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { GalleryCard } from "./GalleryCard";
import { BackToWorld } from "@/components/ui/BackToWorld";

export const metadata: Metadata = {
  title: "Galleries | Noulie's World",
  description: "Explore photo galleries of Noulie's magical moments",
};

export default function GalleriesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <BackToWorld />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <span className="text-5xl block mb-4">📸</span>
          <h1 className="font-[family-name:var(--font-dancing-script)] text-5xl sm:text-6xl md:text-7xl text-pink mb-4">
            Photo Galleries
          </h1>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            A collection of magical moments from Noulie&apos;s world
          </p>
        </FadeIn>

        {/* Gallery Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleries.map((gallery) => (
            <GalleryCard key={gallery.slug} gallery={gallery} />
          ))}
        </StaggerContainer>

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
