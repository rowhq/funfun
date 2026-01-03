"use client";

import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Three.js
const World3D = dynamic(
  () => import("./World3D").then((mod) => mod.World3D),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 flex items-center justify-center bg-[#030305]">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">👑</div>
          <p className="text-cream text-lg">Loading the Kingdom...</p>
        </div>
      </div>
    ),
  }
);

export function InsideWorld() {
  return <World3D />;
}
