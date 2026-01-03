"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { Sparkles } from "@/components/animations/Sparkles";

export function AccessContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Visual only - just show a fun message
    setError("This is just a demo! No password needed 💖");
    setTimeout(() => setError(""), 3000);
  };

  return (
    <>
      <FadeIn delay={0.2}>
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-pink-light/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Family Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-pink-light focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all bg-background"
                placeholder="Enter the magic word..."
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-pink text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full py-3 bg-pink text-white rounded-xl font-medium hover:bg-purple transition-colors shadow-md hover:shadow-lg"
            >
              Enter the Magic Kingdom
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-pink-light/30">
            <p className="text-sm text-foreground-muted text-center">
              Don&apos;t have access? Ask Noulie&apos;s parents! 👑
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Preview of exclusive content */}
      <FadeIn delay={0.4} className="mt-8">
        <div className="relative bg-gradient-to-br from-purple-light/50 to-pink-light/50 rounded-3xl p-6 overflow-hidden">
          <Sparkles count={10} />
          <div className="relative z-10 text-center">
            <span className="text-3xl block mb-2">✨</span>
            <h3 className="font-[family-name:var(--font-dancing-script)] text-xl text-purple mb-2">
              Exclusive Content Inside
            </h3>
            <p className="text-sm text-foreground-muted">
              Private photos, videos, and more magical moments
            </p>
          </div>
        </div>
      </FadeIn>
    </>
  );
}
