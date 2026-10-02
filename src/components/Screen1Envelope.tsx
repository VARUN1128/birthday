"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartDoodle } from "./HandmadeDoodles";

interface Screen1EnvelopeProps {
  onComplete: () => void;
  title?: string;
  subtitle?: string;
}

export function Screen1Envelope({ onComplete, title, subtitle }: Screen1EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    // After flap opens and letter slides out, trigger transition
    setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 800);
    }, 2400);
  };

  return (
    <div className="relative min-h-screen w-full wooden-desk-bg flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Subtle ambient warm desk lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8C3A27]/20 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence>
        {!isDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center max-w-md w-full text-center z-10"
          >
            {/* Header Text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-handwriting text-2xl sm:text-3xl text-[#E8D8C8] mb-3 px-4 drop-shadow-sm leading-snug"
            >
              {title || "For the person who makes my world a little more beautiful..."}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="font-serif-custom italic text-sm sm:text-base text-[#C4B09E] mb-8"
            >
              {subtitle || "I made something for you."}
            </motion.p>

            {/* Physical Handmade Envelope */}
            <div className="relative w-72 sm:w-80 h-52 sm:h-56 my-4 cursor-pointer group" onClick={handleOpen}>
              {/* Floating Hand-drawn Hearts Animation when Opening */}
              <AnimatePresence>
                {isOpen && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 0, scale: 0.5, x: (i - 2.5) * 18 }}
                        animate={{
                          opacity: [0, 1, 0],
                          y: -140 - i * 15,
                          scale: [0.6, 1.2, 0.8],
                          rotate: i % 2 === 0 ? 15 : -15,
                        }}
                        transition={{ duration: 2.2, delay: i * 0.15, ease: "easeOut" }}
                        className="absolute top-1/2 left-1/2 z-40 pointer-events-none"
                      >
                        <HeartDoodle className="w-7 h-7" stroke="#B83B4D" />
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* Envelope Shadow */}
              <div className="absolute inset-0 bg-black/50 blur-xl rounded-lg translate-y-6 scale-95" />

              {/* Envelope Back Body */}
              <div className="absolute inset-0 bg-[#EFE7DC] rounded-lg border border-[#D1BFAC] shadow-inner overflow-hidden">
                {/* Paper texture overlay */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#8C6D53_1px,transparent_1px)] [background-size:12px_12px]" />
              </div>

              {/* Sliding Letter Inside Envelope */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: isOpen ? -85 : 0 }}
                transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-3 bottom-2 top-4 bg-[#FAF6F0] rounded border border-[#E0D0BE] p-4 shadow-md flex flex-col items-center justify-center z-10"
              >
                <div className="w-full h-full border border-dashed border-[#D4C2B0] rounded p-3 flex flex-col items-center justify-center bg-[#FAF6F0]">
                  <p className="font-calligraphy text-2xl sm:text-3xl text-[#7A1C24] mb-1">
                    Happy Birthday
                  </p>
                  <p className="font-handwriting text-lg text-[#5C3A21]">
                    With all my love ❤️
                  </p>
                </div>
              </motion.div>

              {/* Envelope Left & Right Triangular Pocket Flaps */}
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, #E6DBCF 50%, transparent 50%)",
                  clipPath: "polygon(0 0, 50% 50%, 0 100%)",
                }}
              />
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  background: "linear-gradient(-135deg, #E2D7CB 50%, transparent 50%)",
                  clipPath: "polygon(100% 0, 50% 50%, 100% 100%)",
                }}
              />

              {/* Envelope Bottom Triangle Flap */}
              <div
                className="absolute inset-0 z-20 pointer-events-none shadow-sm"
                style={{
                  background: "#DFD3C5",
                  clipPath: "polygon(0 100%, 50% 45%, 100% 100%)",
                }}
              />

              {/* Envelope Top Opening Flap (3D flip animation) */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: isOpen ? 180 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ transformOrigin: "top" }}
                className="absolute inset-x-0 top-0 h-28 z-30 pointer-events-none"
              >
                <div
                  className="w-full h-full bg-[#E8DDD1] border-t border-[#D1BFAC] shadow-md flex justify-center pt-2"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  }}
                >
                  {/* Red Wax Seal / Heart Sticker on Envelope Flap */}
                  {!isOpen && (
                    <div className="w-9 h-9 rounded-full bg-[#8C2D38] border-2 border-[#6E222A] shadow-md flex items-center justify-center translate-y-12">
                      <HeartDoodle className="w-5 h-5" stroke="#FAF6F0" />
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Handwritten Address/Doodle on Envelope Front */}
              <div className="absolute bottom-4 left-6 z-25 pointer-events-none">
                <p className="font-handwriting text-base text-[#7C5A43] font-medium tracking-wide">
                  To: The Love of My Life ✨
                </p>
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              onClick={handleOpen}
              disabled={isOpen}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="mt-8 px-8 py-3.5 rounded-full bg-[#8C2D38] text-[#FAF6F0] font-handwriting text-xl sm:text-2xl tracking-wide shadow-lg border border-[#A63A47] hover:bg-[#9E3341] transition-all duration-300 flex items-center gap-2 group cursor-pointer disabled:opacity-50"
            >
              <span>Open your letter</span>
              <span className="group-hover:translate-x-1 transition-transform">💌</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
