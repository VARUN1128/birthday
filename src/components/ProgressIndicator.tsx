"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  currentScreen: number;
  totalScreens?: number;
}

export function ProgressIndicator({ currentScreen, totalScreens = 6 }: ProgressIndicatorProps) {
  const formatNum = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-4 z-50 pointer-events-none select-none"
    >
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF6F0]/85 backdrop-blur-md border border-[#E6D7C3]/80 shadow-sm text-[#6E4F38]">
        <span className="font-handwriting text-lg font-bold tracking-wider text-[#8C2D38]">
          {formatNum(currentScreen)}
        </span>
        <span className="font-handwriting text-sm text-[#A08875]">/</span>
        <span className="font-handwriting text-sm text-[#A08875]">
          {formatNum(totalScreens)}
        </span>
      </div>
    </motion.div>
  );
}
