"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartDoodle, SparkleDoodle, WashiTape } from "./HandmadeDoodles";

interface FinalMessageData {
  line1: string;
  line2: string;
  date: string;
}

interface Screen6FinalSurpriseProps {
  data: FinalMessageData;
  onRestart: () => void;
}

export function Screen6FinalSurprise({ data, onRestart }: Screen6FinalSurpriseProps) {
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Gentle Floating Heart Particles Canvas Animation
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Heart particle structure
    interface HeartParticle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
    }

    const colors = ["#8C2D38", "#B83B4D", "#D9727F", "#E8A5A5", "#E6C594"];
    const particles: HeartParticle[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 100,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 0.8 + 0.4,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const drawHeart = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size, x, y + size);
      ctx.bezierCurveTo(x, y + size, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        drawHeart(p.x, p.y, p.size, p.color, p.opacity);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen]);

  return (
    <div className="relative min-h-screen w-full bg-[#FAF7F2] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
      {/* Canvas layer for floating heart particles */}
      {isOpen && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-0"
        />
      )}

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#8C6D53_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Initial Screen State before opening secret envelope */
          <motion.div
            key="prompt"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md w-full z-10"
          >
            <SparkleDoodle className="w-10 h-10 mx-auto mb-4" stroke="#B8860B" />
            <h2 className="font-handwriting text-3xl sm:text-4xl text-[#3D2514] mb-3">
              There&apos;s one more thing...
            </h2>
            <p className="font-serif-custom italic text-base text-[#7C5A43] mb-8">
              (A tiny secret note just for you)
            </p>

            {/* Tiny Handmade Envelope */}
            <div
              onClick={() => setIsOpen(true)}
              className="relative w-60 h-40 mx-auto my-6 cursor-pointer group transition-transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-[#EFE7DC] rounded-md border border-[#D1BFAC] shadow-lg flex items-center justify-center p-4">
                <WashiTape color="rose" />
                <div className="w-8 h-8 rounded-full bg-[#8C2D38] flex items-center justify-center border border-[#6E222A] shadow">
                  <HeartDoodle className="w-4 h-4" stroke="#FAF6F0" />
                </div>
              </div>
            </div>

            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-full bg-[#8C2D38] text-[#FAF6F0] font-handwriting text-2xl tracking-wide shadow-lg border border-[#A63A47] hover:bg-[#9E3341] transition-all duration-300 cursor-pointer mt-4"
            >
              Open it 💌
            </motion.button>
          </motion.div>
        ) : (
          /* Secret Note Revealed View */
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative max-w-md w-full bg-[#FAF6F0] rounded-xl p-8 sm:p-10 border border-[#E0D0BE] shadow-2xl text-center z-10"
          >
            <WashiTape color="gold" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex justify-center mb-6"
            >
              <HeartDoodle className="w-10 h-10" stroke="#8C2D38" />
            </motion.div>

            {/* Line 1: "I will always be there to irritate U." */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-handwriting text-3xl sm:text-4xl text-[#3D2514] mb-3 leading-snug font-semibold"
            >
              {data.line1}
            </motion.p>

            {/* Line 2: "And love you." */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="font-calligraphy text-4xl sm:text-5xl text-[#8C2D38] mb-6 font-bold"
            >
              {data.line2}
            </motion.p>

            {/* Divider */}
            <div className="w-24 h-[1px] bg-[#D4C2B0] mx-auto mb-6" />

            {/* Birthday Date */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="space-y-1"
            >
              <p className="font-calligraphy text-3xl text-[#5C3A21]">
                Happy Birthday
              </p>
              <p className="font-handwriting text-xl text-[#8C7A6B] tracking-widest font-medium">
                {data.date}
              </p>
            </motion.div>

            {/* Replay Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              onClick={onRestart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-6 py-2.5 rounded-full bg-[#F4EFE6] text-[#6E4F38] font-handwriting text-xl border border-[#DCD0C0] hover:bg-[#EFE7DC] transition-all duration-300 cursor-pointer"
            >
              Read again from beginning ↻
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
