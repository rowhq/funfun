"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LandingPortal } from "@/components/sections/LandingPortal";
import { InsideWorld } from "@/components/sections/InsideWorld";

// Warp speed transition effect
function WarpTransition({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#030305] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      onAnimationComplete={onComplete}
    >
      {/* Warp lines flying past */}
      {[...Array(50)].map((_, i) => {
        const angle = (i / 50) * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        return (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              width: "2px",
              height: "100px",
              left: "50%",
              top: "50%",
              transformOrigin: "center center",
              rotate: `${(angle * 180) / Math.PI}deg`,
            }}
            initial={{
              x: 0,
              y: 0,
              scaleY: 0,
              opacity: 0,
            }}
            animate={{
              x: Math.cos(angle) * distance * 20,
              y: Math.sin(angle) * distance * 20,
              scaleY: [0, 3, 5],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.2,
              delay: Math.random() * 0.3,
              ease: "easeIn",
            }}
          />
        );
      })}

      {/* Central flash */}
      <motion.div
        className="absolute w-4 h-4 bg-white rounded-full"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 1, 50], opacity: [1, 1, 0] }}
        transition={{ duration: 1.2, ease: "easeIn" }}
      />

      {/* Expanding ring */}
      <motion.div
        className="absolute w-20 h-20 border-2 border-pink rounded-full"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 30], opacity: [1, 0] }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      />
    </motion.div>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [stage, setStage] = useState<"portal" | "warp" | "world" | "loading">("loading");

  useEffect(() => {
    // Check if returning from a page or has entered before
    const hasEntered = searchParams.get("entered") === "true" ||
                       sessionStorage.getItem("hasEnteredWorld") === "true";

    if (hasEntered) {
      setStage("world");
    } else {
      setStage("portal");
    }
  }, [searchParams]);

  const handleEnter = () => {
    setStage("warp");
  };

  const handleWarpComplete = () => {
    // Remember that user has entered
    sessionStorage.setItem("hasEnteredWorld", "true");
    setStage("world");
  };

  // Show nothing while determining initial state
  if (stage === "loading") {
    return <div className="fixed inset-0 bg-[#030305]" />;
  }

  return (
    <div className="bg-[#030305]">
      <AnimatePresence mode="wait">
        {stage === "portal" && (
          <LandingPortal key="portal" onEnter={handleEnter} />
        )}
        {stage === "warp" && (
          <WarpTransition key="warp" onComplete={handleWarpComplete} />
        )}
        {stage === "world" && (
          <InsideWorld key="world" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-[#030305]" />}>
      <HomeContent />
    </Suspense>
  );
}
