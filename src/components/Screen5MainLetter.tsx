"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartDoodle, SparkleDoodle, InkUnderlineDoodle, HanddrawnArrow } from "./HandmadeDoodles";

interface MainLetterContent {
  title: string;
  paragraphs: string[];
  signature: string;
  ps: string;
}

interface Screen5MainLetterProps {
  content: MainLetterContent;
  onNext: () => void;
}

export function Screen5MainLetter({ content, onNext }: Screen5MainLetterProps) {
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [revealedParagraphsCount, setRevealedParagraphsCount] = useState(0);

  const handleUnfold = () => {
    if (isUnfolded) return;
    setIsUnfolded(true);

    // Reveal paragraphs section by section naturally
    const interval = setInterval(() => {
      setRevealedParagraphsCount((prev) => {
        if (prev >= content.paragraphs.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 450);
  };

  return (
    <div className="relative min-h-screen w-full wooden-desk-bg py-12 px-3 sm:px-6 flex flex-col items-center justify-center overflow-x-hidden">
      {/* Cinematic Desk Spotlight Overlay */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Intro prompt before unfolding */}
      {!isUnfolded && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 z-20"
        >
          <p className="font-handwriting text-2xl text-[#E8D8C8] mb-2">
            The Main Love Letter
          </p>
          <p className="font-serif-custom italic text-sm text-[#C4B09E] mb-4">
            (Tap the letter to unfold)
          </p>
        </motion.div>
      )}

      {/* Main Parchment Container */}
      <motion.div
        layout
        initial={{ rotate: -1, scale: 0.95 }}
        animate={{
          rotate: isUnfolded ? 0.3 : -1,
          scale: isUnfolded ? 1 : 0.95,
        }}
        transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
        onClick={handleUnfold}
        className={`relative w-[92%] max-w-2xl parchment-paper torn-edges rounded-sm my-4 p-6 sm:p-12 z-10 transition-all duration-700 cursor-pointer ${
          !isUnfolded ? "hover:scale-[0.98] shadow-2xl" : ""
        }`}
      >
        {/* Subtle Folds & Wrinkles Texture Overlays */}
        <div className="paper-crease" />

        {/* Paper aging stains & fibers */}
        <div className="absolute top-6 left-8 w-24 h-24 rounded-full bg-[#8C5E3C]/5 blur-2xl pointer-events-none" />
        <div className="absolute bottom-12 right-10 w-32 h-32 rounded-full bg-[#6E4226]/5 blur-2xl pointer-events-none" />

        {/* Unfolded Content View vs Folded View */}
        {!isUnfolded ? (
          /* Folded Envelope / Parchment State */
          <div className="py-16 text-center flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <HeartDoodle className="w-12 h-12 mb-4" stroke="#8C2D38" />
            </motion.div>
            <h2 className="font-calligraphy text-4xl sm:text-5xl text-[#3D2514] mb-2">
              For My Love
            </h2>
            <p className="font-handwriting text-2xl text-[#6E4F38] mb-6">
              (Handwritten with love • Tap to unfold)
            </p>
            <div className="px-6 py-2.5 rounded-full bg-[#8C2D38] text-[#FAF6F0] font-handwriting text-xl shadow-md border border-[#A63A47]">
              Unfold Letter 📜
            </div>
          </div>
        ) : (
          /* Fully Unfolded Main Letter Content */
          <div className="relative">
            {/* Calligraphy Letter Header */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 border-b border-[#D4C2B0]/60 pb-6"
            >
              <h1 className="font-calligraphy text-5xl sm:text-6xl text-[#3D2514] mb-2 leading-tight">
                {content.title}
              </h1>
              <div className="flex items-center justify-center gap-2">
                <div className="h-[1px] w-12 bg-[#8C2D38]/40" />
                <HeartDoodle className="w-5 h-5" stroke="#8C2D38" />
                <div className="h-[1px] w-12 bg-[#8C2D38]/40" />
              </div>
            </motion.div>

            {/* Margin Handwritten Doodles */}
            <div className="hidden sm:block absolute top-12 -left-6 opacity-30 rotate-[-15deg] pointer-events-none">
              <SparkleDoodle className="w-8 h-8" stroke="#8C2D38" />
            </div>
            <div className="hidden sm:block absolute top-1/2 -right-6 opacity-30 rotate-[20deg] pointer-events-none">
              <HeartDoodle className="w-7 h-7" stroke="#8C2D38" />
            </div>

            {/* Letter Body Paragraphs */}
            <div className="space-y-5 text-left font-handwriting text-2xl sm:text-3xl text-[#3D2514] leading-relaxed tracking-wide">
              {content.paragraphs.map((paragraph, index) => {
                const isRevealed = index < revealedParagraphsCount;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 10 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    {/* Check if paragraph has multiple lines */}
                    {paragraph.includes("\n") ? (
                      <div className="pl-3 sm:pl-5 border-l-2 border-[#8C2D38]/30 my-2 space-y-1">
                        {paragraph.split("\n").map((line, lIdx) => (
                          <p key={lIdx} className="whitespace-pre-line text-[#2C1D11] font-medium">
                            {line}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="whitespace-pre-line text-[#2C1D11]">
                        {paragraph}
                      </p>
                    )}

                    {/* Occasional ink underline on special sentimental phrases */}
                    {paragraph.includes("favourite memories") && (
                      <InkUnderlineDoodle className="w-56 h-3 mt-1" stroke="#8C2D38" />
                    )}
                    {paragraph.includes("keep being there") && (
                      <InkUnderlineDoodle className="w-48 h-3 mt-1" stroke="#8C2D38" />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Signature Section */}
            <AnimatePresence>
              {revealedParagraphsCount >= content.paragraphs.length && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="mt-10 pt-6 border-t border-dashed border-[#D4C2B0]/80 flex flex-col items-end"
                >
                  <p className="font-calligraphy text-4xl sm:text-5xl text-[#8C2D38] font-bold">
                    {content.signature}
                  </p>
                  <span className="font-serif-custom italic text-xs text-[#7C5A43] mt-1">
                    With all my heart & soul
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* P.S. Section (written like an afterthought at the bottom) */}
            <AnimatePresence>
              {revealedParagraphsCount >= content.paragraphs.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                  className="mt-8 p-4 rounded bg-[#EFE4D2]/80 border border-[#DCD0C0] relative"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-handwriting text-2xl font-bold text-[#8C2D38]">
                      P.S.
                    </span>
                    <p className="font-handwriting text-2xl text-[#3D2514]">
                      {content.ps}
                    </p>
                    <HeartDoodle className="w-5 h-5 ml-1 inline-block" stroke="#8C2D38" />
                  </div>
                  <div className="absolute -top-3 left-6">
                    <HanddrawnArrow className="w-8 h-6" stroke="#8C2D38" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Next Button after letter is revealed */}
      {isUnfolded && revealedParagraphsCount >= content.paragraphs.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-10 z-20 text-center"
        >
          <p className="font-handwriting text-2xl text-[#E8D8C8] mb-3">
            There&apos;s one more thing...
          </p>
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 rounded-full bg-[#8C2D38] text-[#FAF6F0] font-handwriting text-2xl tracking-wide shadow-xl border border-[#A63A47] hover:bg-[#9E3341] transition-all duration-300 cursor-pointer flex items-center gap-2 mx-auto"
          >
            <span>Open Final Surprise</span>
            <span>🎁</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
