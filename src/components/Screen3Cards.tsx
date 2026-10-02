"use client";

import React from "react";
import { motion } from "framer-motion";
import { ScrapbookCard } from "../data/loveLetter";
import { HeartDoodle, SparkleDoodle, InkUnderlineDoodle, WashiTape } from "./HandmadeDoodles";

interface Screen3CardsProps {
  cards: ScrapbookCard[];
  onNext: () => void;
}

export function Screen3Cards({ cards, onNext }: Screen3CardsProps) {
  return (
    <div className="relative min-h-screen w-full bg-[#FAF7F2] py-16 px-4 sm:px-8 flex flex-col items-center overflow-x-hidden">
      {/* Background paper texture pattern */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#8C6D53_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 max-w-md"
      >
        <p className="font-handwriting text-2xl text-[#8C2D38] mb-1">Chapter One</p>
        <h2 className="font-calligraphy text-4xl sm:text-5xl text-[#3D2514] mb-2">
          Pieces of Us
        </h2>
        <p className="font-serif-custom italic text-sm text-[#7C5A43]">
          (Scrapbook pages collected over time)
        </p>
      </motion.div>

      {/* Cards List */}
      <div className="flex flex-col gap-10 sm:gap-14 max-w-xl w-full">
        {cards.map((card, index) => {
          const tapeColors = ["pink", "gold", "cream", "rose"];
          const selectedTape = tapeColors[index % tapeColors.length];

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: card.rotation }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="relative handmade-card rounded-lg p-6 sm:p-8 shadow-lg border border-[#E0D0BE] transition-transform duration-300"
            >
              {/* Decorative Washi Tape */}
              <WashiTape color={selectedTape} />

              {/* Number Badge & Title */}
              <div className="flex items-center justify-between mb-4 border-b border-dashed border-[#D4C2B0] pb-3">
                <span className="font-handwriting text-3xl font-bold text-[#8C2D38]">
                  {card.id}
                </span>
                <h3 className="font-calligraphy text-3xl sm:text-4xl text-[#3D2514]">
                  {card.title}
                </h3>
                {card.date && (
                  <span className="font-handwriting text-base text-[#8C7A6B]">
                    {card.date}
                  </span>
                )}
              </div>

              {/* Body Content */}
              <p className="font-handwriting text-2xl sm:text-3xl text-[#3D2514] leading-relaxed mb-4">
                {card.text}
              </p>

              {/* Underline & Doodles */}
              <div className="flex items-center justify-between pt-2">
                <InkUnderlineDoodle className="w-36 h-3" stroke="#8C2D38" />
                <div className="flex items-center gap-2">
                  {card.doodle === "sparkle" && <SparkleDoodle className="w-6 h-6" stroke="#B8860B" />}
                  {card.doodle === "heart" && <HeartDoodle className="w-6 h-6" stroke="#8C2D38" />}
                  {card.doodle === "coffee" && (
                    <span className="font-handwriting text-xl text-[#6E4F38]">☕</span>
                  )}
                  {card.doodle === "infinity" && (
                    <span className="font-handwriting text-xl text-[#8C2D38]">♾️</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Continue to Memories Button */}
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
          className="px-8 py-3.5 rounded-full bg-[#8C2D38] text-[#FAF6F0] font-handwriting text-2xl tracking-wide shadow-lg border border-[#A63A47] hover:bg-[#9E3341] transition-all duration-300 cursor-pointer"
        >
          Look at our memories 📸
        </motion.button>
      </motion.div>
    </div>
  );
}
