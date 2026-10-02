"use client";

import React from "react";

export function HeartDoodle({ className = "w-6 h-6", stroke = "#7A1C24" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M25 43C25 43 7 31.5 7 18.5C7 11.5 12.5 7 18.5 7C22.2 7 24.5 9.2 25 10.5C25.5 9.2 27.8 7 31.5 7C37.5 7 43 11.5 43 18.5C43 31.5 25 43 25 43Z"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0.5px 0.5px 0px rgba(0,0,0,0.15))" }}
      />
      {/* Hand-drawn double inner loop */}
      <path
        d="M25 39C25 39 11 29 11 18.5C11 13 14.5 9.5 19 9.5C22 9.5 24 11 25 12.5"
        stroke={stroke}
        strokeWidth="1.2"
        strokeDasharray="2 3"
        opacity="0.6"
      />
    </svg>
  );
}

export function SparkleDoodle({ className = "w-6 h-6", stroke = "#B8860B" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M20 4C20 12 28 20 36 20C28 20 20 28 20 36C20 28 12 20 4 20C12 20 20 12 20 4Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="1.5" fill={stroke} />
    </svg>
  );
}

export function InkUnderlineDoodle({ className = "w-full h-3", stroke = "#7A1C24" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="none">
      <path
        d="M3 12C35 8 85 14 135 9C165 6 185 11 197 10"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M15 16C50 13 110 17 175 14"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export function HanddrawnArrow({ className = "w-12 h-8", stroke = "#5C3A21" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M8 25C20 12 38 10 50 18"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M42 12L52 18L44 26"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WashiTape({ color = "pink", className = "" }: { color?: string; className?: string }) {
  const getGradient = () => {
    switch (color) {
      case "gold":
        return "from-[#E6C594]/80 via-[#F3DEB8]/90 to-[#D4B07B]/80";
      case "cream":
        return "from-[#EFE7DA]/90 via-[#F7F2EA]/90 to-[#E5DAC8]/90";
      case "rose":
        return "from-[#E8A5A5]/80 via-[#F4C4C4]/90 to-[#D98E8E]/80";
      case "clip":
        return "bg-transparent";
      default:
        return "from-[#F2C4CE]/80 via-[#F7D8E0]/90 to-[#E2A7B5]/80";
    }
  };

  if (color === "clip") {
    return (
      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 z-20 ${className}`}>
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
          <path
            d="M8 35V10C8 5.58172 11.5817 2 16 2C20.4183 2 24 5.58172 24 10V28C24 30.2091 22.2091 32 20 32C17.7909 32 16 30.2091 16 28V12"
            stroke="#8C7A6B"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.3))" }}
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-7 bg-gradient-to-r ${getGradient()} shadow-sm backdrop-blur-[1px] border-x border-dashed border-[#8C7A6B]/30 z-20 ${className}`}
      style={{
        clipPath: "polygon(3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%, 0% 50%)",
      }}
    />
  );
}
