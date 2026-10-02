"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeartDoodle, SparkleDoodle, InkUnderlineDoodle, WashiTape } from "./HandmadeDoodles";

interface Screen2IntroProps {
  onNext: () => void;
  title?: string;
  subtitle?: string;
  callout?: string;
}

export function Screen2Intro({ onNext, title, subtitle, callout }: Screen2IntroProps) {
  return (
    <div className="relative min-h-screen w-full bg-[#FAF7F2] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
      {/* Background paper texture & subtle hand doodles */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8C6D53_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute top-12 left-8 sm:left-24 opacity-40 rotate-[-12deg] pointer-events-none">
        <HeartDoodle className="w-10 h-10" stroke="#7A1C24" />
      </div>
      <div className="absolute bottom-16 right-8 sm:right-28 opacity-40 rotate-[15deg] pointer-events-none">
        <SparkleDoodle className="w-10 h-10" stroke="#B8860B" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-lg w-full bg-[#FAF6F0] rounded-xl p-6 sm:p-10 border border-[#E0D0BE] shadow-xl text-center z-10"
      >
        {/* Decorative Washi Tape on Top */}
        <WashiTape color="pink" />

        {/* Small Hand-drawn top heart icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-4"
        >
          <HeartDoodle className="w-8 h-8" stroke="#8C2D38" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-calligraphy text-4xl sm:text-5xl text-[#7A1C24] mb-3 leading-tight"
        >
          {title || "Happy Birthday, ❤️"}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-handwriting text-2xl sm:text-3xl text-[#5C3A21] mb-8 leading-relaxed whitespace-pre-line"
        >
          {subtitle || "Before you read this,\nI want you to know one thing..."}
        </motion.p>

        {/* Main Callout Box (Feels like handwritten note on card) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative bg-[#FFFBF7] rounded-lg border border-[#E6D7C3] p-6 mb-8 shadow-inner"
        >
          <p className="font-handwriting text-2xl sm:text-3xl text-[#3D2514] font-semibold leading-relaxed whitespace-pre-line">
            {callout || "This isn't just a birthday wish.\n\nIt's a little piece of my heart."}
          </p>
          <InkUnderlineDoodle className="w-48 h-3 mx-auto mt-2" stroke="#8C2D38" />
        </motion.div>

        {/* Next Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          onClick={onNext}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="px-8 py-3.5 rounded-full bg-[#8C2D38] text-[#FAF6F0] font-handwriting text-2xl tracking-wide shadow-md border border-[#A63A47] hover:bg-[#9E3341] transition-all duration-300 cursor-pointer"
        >
          Keep reading ✨
        </motion.button>
      </motion.div>
    </div>
  );
}
