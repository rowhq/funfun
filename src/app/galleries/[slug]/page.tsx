import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { galleries } from "@/lib/constants";
import { FadeIn } from "@/components/animations/FadeIn";
import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { BackToWorld } from "@/components/ui/BackToWorld";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gallery = galleries.find((g) => g.slug === slug);

  if (!gallery) {
    return { title: "Gallery Not Found" };
  }

  return {
    title: `${gallery.name} Gallery | Noulie's World`,
    description: gallery.description,
  };
}

export function generateStaticParams() {
  return galleries.map((gallery) => ({
    slug: gallery.slug,
  }));
}

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params;
  const gallery = galleries.find((g) => g.slug === slug);

  if (!gallery) {
    notFound();
  }

  const colorClasses = {
    pink: "from-pink-light/50 to-pink/30",
    purple: "from-purple-light/50 to-purple/30",
    blue: "from-blue-light/50 to-blue/30",
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <BackToWorld />
      {/* Hero Section */}
      <div
        className={`bg-gradient-to-b ${
          colorClasses[gallery.color as keyof typeof colorClasses]
        } py-16 px-4 mb-12`}
      >
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center">
            <span className="text-6xl block mb-4">{gallery.emoji}</span>
            <h1 className="font-[family-name:var(--font-dancing-script)] text-5xl sm:text-6xl md:text-7xl text-foreground mb-4">
              {gallery.name} Gallery
            </h1>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              {gallery.description}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <PhotoGrid photos={gallery.images} color={gallery.color} />

        {/* Navigation */}
        <FadeIn className="text-center mt-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/galleries"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple rounded-full font-medium hover:bg-purple-light transition-colors border border-purple-light"
            >
              <span>←</span>
              <span>All Galleries</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pink text-white rounded-full font-medium hover:bg-purple transition-colors"
            >
              <span>Home</span>
              <span>🏠</span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
