"use client";

import React, { useState, useEffect } from "react";
import { loveLetter } from "../data/loveLetter";
import { Screen1Envelope } from "../components/Screen1Envelope";
import { Screen2Intro } from "../components/Screen2Intro";
import { Screen3Cards } from "../components/Screen3Cards";
import { Screen4Memories } from "../components/Screen4Memories";
import { Screen5MainLetter } from "../components/Screen5MainLetter";
import { Screen6FinalSurprise } from "../components/Screen6FinalSurprise";
import { MusicPlayer } from "../components/MusicPlayer";
import { ProgressIndicator } from "../components/ProgressIndicator";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(1);

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentScreen]);

  return (
    <main className="min-h-screen w-full relative bg-[#FAF7F2]">
      {/* Background Persistent Music Player */}
      <MusicPlayer />

      {/* Handwritten Page Number / Progress Indicator */}
      <ProgressIndicator currentScreen={currentScreen} totalScreens={6} />

      {/* Screen Views */}
      {currentScreen === 1 && (
        <Screen1Envelope
          onComplete={() => setCurrentScreen(2)}
        />
      )}

      {currentScreen === 2 && (
        <Screen2Intro
          title={loveLetter.intro.title}
          subtitle={loveLetter.intro.subtitle}
          callout={loveLetter.intro.callout}
          onNext={() => setCurrentScreen(3)}
        />
      )}

      {currentScreen === 3 && (
        <Screen3Cards
          cards={loveLetter.cards}
          onNext={() => setCurrentScreen(4)}
        />
      )}

      {currentScreen === 4 && (
        <Screen4Memories
          memories={loveLetter.memories}
          onNext={() => setCurrentScreen(5)}
        />
      )}

      {currentScreen === 5 && (
        <Screen5MainLetter
          content={loveLetter.mainLetter}
          onNext={() => setCurrentScreen(6)}
        />
      )}

      {currentScreen === 6 && (
        <Screen6FinalSurprise
          data={loveLetter.finalMessage}
          onRestart={() => setCurrentScreen(1)}
        />
      )}
    </main>
  );
}
