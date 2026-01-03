"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

interface LandingPortalProps {
  onEnter: () => void;
}

interface Particle {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

export function LandingPortal({ onEnter }: LandingPortalProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Generate particles only on client
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-[#050507] overflow-hidden cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.5 }}
      transition={{ duration: 0.8 }}
      onClick={onEnter}
    >
      {/* Animated gradient background that follows mouse */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255, 107, 157, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Floating particles - only render after mount */}
      {mounted && (
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-pink/30 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Center portal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          {/* Outer glow rings */}
          <motion.div
            className="absolute inset-0 -m-20 rounded-full border border-pink/10"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 -m-32 rounded-full border border-purple/10"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 -m-44 rounded-full border border-pink/5"
            animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          {/* Portal circle - the peephole */}
          <motion.div
            className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full flex items-center justify-center"
            style={{
              background: "radial-gradient(circle, rgba(255,107,157,0.1) 0%, rgba(157,78,221,0.05) 50%, transparent 70%)",
              boxShadow: isHovering
                ? "0 0 100px rgba(255, 107, 157, 0.4), 0 0 200px rgba(255, 107, 157, 0.2), inset 0 0 100px rgba(255, 107, 157, 0.1)"
                : "0 0 60px rgba(255, 107, 157, 0.2), inset 0 0 60px rgba(255, 107, 157, 0.05)",
            }}
            animate={{
              boxShadow: isHovering
                ? [
                    "0 0 100px rgba(255, 107, 157, 0.4), 0 0 200px rgba(255, 107, 157, 0.2)",
                    "0 0 120px rgba(255, 107, 157, 0.5), 0 0 250px rgba(255, 107, 157, 0.3)",
                    "0 0 100px rgba(255, 107, 157, 0.4), 0 0 200px rgba(255, 107, 157, 0.2)",
                  ]
                : undefined,
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Inner content */}
            <div className="text-center">
              {/* Crown */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mb-6"
              >
                <span className="text-6xl sm:text-7xl filter drop-shadow-[0_0_30px_rgba(255,107,157,0.5)]">
                  👑
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-cream mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Noulie&apos;s
              </motion.h1>
              <motion.h2
                className="font-[family-name:var(--font-playfair)] italic text-4xl sm:text-5xl text-pink mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  textShadow: "0 0 40px rgba(255, 107, 157, 0.5)",
                }}
              >
                World
              </motion.h2>

              {/* Enter prompt */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.p
                  className="text-cream/60 text-sm uppercase tracking-[0.3em]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click to Enter
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Rotating ring */}
          <motion.div
            className="absolute inset-0 -m-4 rounded-full border border-dashed border-pink/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-cream/20 font-[family-name:var(--font-playfair)] text-sm tracking-widest">
        EST. 2024
      </div>
      <div className="absolute bottom-8 right-8 text-cream/20 font-[family-name:var(--font-playfair)] text-sm tracking-widest">
        BALLET PRINCESS
      </div>

      {/* Side text */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-cream/10 font-[family-name:var(--font-playfair)] text-xs tracking-[0.5em] uppercase">
        An Exclusive Kingdom
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 origin-right text-cream/10 font-[family-name:var(--font-playfair)] text-xs tracking-[0.5em] uppercase">
        For Little Royalty
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: "inset 0 0 200px rgba(0,0,0,0.8), inset 0 0 100px rgba(0,0,0,0.5)"
      }} />
    </motion.div>
  );
}
