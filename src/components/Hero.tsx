import React from 'react';
import { Countdown } from './Countdown.tsx';

/**
 * ============================================================================
 * INSTITUTION LINK CONFIGURATION
 * ============================================================================
 * Paste the destination URL for "Christ PU College - Residential" below.
 * When users press the text, it will open this link.
 */
export const INSTITUTION_LINK_URL = 'https://maps.app.goo.gl/L4xMYDDU1uUUwtNt6';

interface HeroProps {
  onTeleport: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[720px] md:min-h-[860px] lg:min-h-[940px] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden text-center select-none bg-transparent"
    >
      {/* Background Ambient Crimson Vignette */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="w-[850px] sm:w-[1100px] h-[600px] sm:h-[800px] bg-[#8f1627]/25 rounded-full blur-[160px] -translate-y-8" />
      </div>

      {/* The Grand "A Star" Celestial & Blood Moon Insignia (Massive Center Backdrop) */}
      <div
        className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex items-center justify-center w-[540px] sm:w-[720px] md:w-[860px] lg:w-[940px] aspect-square [mask-image:radial-gradient(circle_at_center,black_55%,transparent_96%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_55%,transparent_96%)]"
        aria-hidden="true"
      >
        <img
          src="/assets/aistudio/image_c0e43b38.png"
          alt=""
          className="w-full h-full object-contain select-none mix-blend-lighten opacity-95 filter contrast-110"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Hero Foreground Content Overlaid On Top Of Emblem */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        
        {/* "Introducing" Kicker */}
        <p className="font-editorial-intro text-2xl sm:text-3xl text-neutral-200 tracking-wide mb-1 sm:mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          Introducing
        </p>

        {/* Grand Hero Title: ZENITRA 2026 (Massive typography spanning across the emblem) */}
        <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-bold text-white tracking-[0.04em] sm:tracking-[0.06em] uppercase leading-none drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)] whitespace-nowrap">
          ZENITRA 2026
        </h1>

        {/* Dynamic Date Subtitle & Countdown / Day 1 / Day 2 Component (Configured in src/components/Countdown.tsx) */}
        <Countdown />

        {/* Sub-caption: "SEE YOU AT THE FEST!" */}
        <p className="text-[11px] sm:text-xs font-bold text-neutral-400 uppercase tracking-[0.28em] mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          SEE YOU AT THE FEST!
        </p>

        {/* Institutional Trust Line */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-400/90 pt-1">
          <a
            href={INSTITUTION_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 cursor-pointer bg-transparent border-0 p-0 m-0 text-inherit hover:text-white transition-colors focus:outline-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f3c57a]" />
            <span className="font-medium text-neutral-300 hover:text-white transition-colors">
              Christ PU College - Residential
            </span>
          </a>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <span>A CAS Initiative</span>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <span>Bengaluru, India</span>
        </div>

      </div>
    </section>
  );
};
