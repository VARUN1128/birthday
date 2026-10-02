"use client";

import React, { useState, useEffect, useRef } from "react";
import { Music, VolumeX, Sparkles } from "lucide-react";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useFallbackSynth, setUseFallbackSynth] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Create hidden audio element for the user's uploaded mp3
    const audio = new Audio("/Dheema(KoshalWorld.Com).mp3");
    audio.loop = true;
    audio.preload = "auto";

    audio.addEventListener("error", () => {
      // If audio file doesn't exist or fails, fallback to procedural ambient chord music
      setUseFallbackSynth(true);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (synthCtxRef.current) synthCtxRef.current.close();
    };
  }, []);

  // Web Audio synth for romantic ambient music fallback
  const startSynthMusic = () => {
    if (!synthCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      synthCtxRef.current = new AudioCtx();
    }
    const ctx = synthCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const chords = [
      [261.63, 329.63, 392.00, 493.88], // C maj7
      [220.00, 261.63, 329.63, 392.00], // A min7
      [174.61, 220.00, 261.63, 349.23], // F maj7
      [196.00, 246.94, 293.66, 392.00], // G maj
    ];

    let chordIdx = 0;

    const playChord = () => {
      if (!ctx || ctx.state === "closed") return;
      const notes = chords[chordIdx % chords.length];
      chordIdx++;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const now = ctx.currentTime;
        const delay = idx * 0.15; // gentle arpeggio
        gain.gain.setValueAtTime(0.0001, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.4, now + delay + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 4.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 5);
      });
    };

    playChord();
    intervalRef.current = setInterval(playChord, 4500);
  };

  const stopSynthMusic = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (synthCtxRef.current && synthCtxRef.current.state === "running") {
      synthCtxRef.current.suspend();
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current && !useFallbackSynth) {
        audioRef.current.pause();
      }
      stopSynthMusic();
    } else {
      setIsPlaying(true);
      if (audioRef.current && !useFallbackSynth) {
        audioRef.current.play().catch(() => {
          // If browser blocks or file missing, fallback to synth
          setUseFallbackSynth(true);
          startSynthMusic();
        });
      } else {
        startSynthMusic();
      }
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Mute music" : "Play music"}
        className="group relative flex items-center gap-2 px-3 py-2 rounded-full bg-[#FAF6F0]/90 backdrop-blur-md border border-[#E0D0BE] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 text-[#5C3A21]"
      >
        <span className="relative flex items-center justify-center">
          {isPlaying ? (
            <Music className="w-4 h-4 text-[#9E2A2B] animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#8C7A6B]" />
          )}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9E2A2B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9E2A2B]"></span>
            </span>
          )}
        </span>
        <span className="font-handwriting text-base font-semibold text-[#5C3A21] select-none">
          {isPlaying ? "Music On ♪" : "Play Music ♫"}
        </span>
      </button>
    </div>
  );
}
