"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Memory } from "../data/loveLetter";
import { HeartDoodle, SparkleDoodle, WashiTape } from "./HandmadeDoodles";

interface Screen4MemoriesProps {
  memories: Memory[];
  onNext: () => void;
}

export function Screen4Memories({ memories, onNext }: Screen4MemoriesProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Romantic placeholder SVGs for memories when local image files aren't available
  const renderFallbackGraphic = (id: string) => {
    const gradients = [
      "from-[#FFD1DC] via-[#FFE4E1] to-[#F0E68C]", // Sunset warmth
      "from-[#E6E6FA] via-[#D8BFD8] to-[#FFC0CB]", // Dreamy pastel
      "from-[#F5FEFD] via-[#E2F7F5] to-[#D5ECC2]", // Fresh spring
      "from-[#FFE5EC] via-[#FFC2D1] to-[#FFB703]", // Golden hour
      "from-[#D8E2DC] via-[#FFE5D9] to-[#FFCAD4]", // Cozy mood
      "from-[#FDE2E4] via-[#FFCAD4] to-[#B5E2FA]", // Ocean twilight
    ];

    const gradient = gradients[(parseInt(id, 10) - 1) % gradients.length];

    return (
      <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-4 text-center select-none`}>
        <div className="w-16 h-16 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center mb-2 shadow-sm border border-white/60">
          <HeartDoodle className="w-9 h-9" stroke="#8C2D38" />
        </div>
        <span className="font-handwriting text-lg text-[#5C3A21] font-semibold">
          Precious Memory #{id}
        </span>
        <span className="font-serif-custom italic text-xs text-[#8C7A6B] mt-1">
          (to be filled soon)
        </span>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FAF7F2] py-16 px-4 sm:px-8 flex flex-col items-center overflow-x-hidden">
      {/* Scrapbook background grid */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8C6D53_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 max-w-lg z-10"
      >
        <div className="inline-flex items-center gap-2 mb-2">
          <SparkleDoodle className="w-6 h-6" stroke="#B8860B" />
          <span className="font-handwriting text-2xl text-[#8C2D38]">Memory Wall</span>
          <SparkleDoodle className="w-6 h-6" stroke="#B8860B" />
        </div>
        <h2 className="font-calligraphy text-4xl sm:text-5xl text-[#3D2514] mb-2">
          Some of my favourite memories with you
        </h2>
        <p className="font-serif-custom italic text-sm text-[#7C5A43]">
          (Tap or hover on any photo to look closer)
        </p>
      </motion.div>

      {/* Memories Grid / Collage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-5xl w-full z-10">
        {memories.map((mem, index) => {
          const isError = imageErrors[mem.id];

          return (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: mem.rotation }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 30 }}
              whileTap={{ rotate: 0, scale: 1.05, zIndex: 30 }}
              className="relative bg-[#FFFBF7] p-4 sm:p-5 rounded border border-[#E6D7C3] shadow-lg transition-all duration-300 group cursor-pointer"
            >
              {/* Corner Washi Tape / Paper Clip */}
              <WashiTape color={mem.tapeColor || "pink"} />

              {/* Photo Frame Container (Polaroid style) */}
              <div className="relative w-full aspect-[4/3] bg-[#F2ECE4] rounded border border-[#DCD0C0] overflow-hidden mb-4 shadow-inner">
                {!isError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={mem.image}
                    alt={mem.caption}
                    onError={() => handleImageError(mem.id)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  renderFallbackGraphic(mem.id)
                )}
              </div>

              {/* Caption */}
              <div className="text-center pt-1 px-1">
                <p className="font-handwriting text-2xl text-[#3D2514] leading-snug group-hover:text-[#8C2D38] transition-colors">
                  {mem.caption}
                </p>
              </div>

              {/* Small hand doodle on polaroid corner */}
              <div className="absolute bottom-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <HeartDoodle className="w-5 h-5" stroke="#8C2D38" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action Button to Main Letter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-16 text-center z-10"
      >
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="px-8 py-4 rounded-full bg-[#8C2D38] text-[#FAF6F0] font-handwriting text-2xl tracking-wide shadow-xl border border-[#A63A47] hover:bg-[#9E3341] transition-all duration-300 cursor-pointer flex items-center gap-2 mx-auto"
        >
          <span>Read the Main Love Letter</span>
          <span>📜</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
