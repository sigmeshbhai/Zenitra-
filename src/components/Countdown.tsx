import React, { useState, useEffect } from 'react';

/**
 * ============================================================================
 * EVENT DATES CONFIGURATION
 * ============================================================================
 * Set the firstDate (Day 1) and secondDate (Day 2) below.
 * - Before firstDate: Shows the formatted date range & live countdown timer.
 * - On firstDate: Removes the countdown and shows "DAY 1" only.
 * - On secondDate: Removes the countdown and shows "DAY 2" only.
 *
 * Format: 'YYYY-MM-DD'
 */
export const EVENT_DATES_CONFIG = {
  // First day of the event (Day 1)
  firstDate: '2026-11-06',

  // Second day of the event (Day 2)
  secondDate: '2026-11-07',

  // Start time on Day 1 for the countdown timer (24-hour format HH:MM:SS)
  dayOneStartTime: '09:00:00',
};

type EventPhase = 'COUNTDOWN' | 'DAY_1' | 'DAY_2' | 'COMPLETED';

// Helper to automatically format 'YYYY-MM-DD' date range (e.g. "NOVEMBER 06TH – 07TH, 2026")
function formatEventDateRange(firstDateStr: string, secondDateStr: string): string {
  const months = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  const getOrdinal = (n: number) => {
    const s = ['TH', 'ST', 'ND', 'RD'];
    const v = n % 100;
    return String(n).padStart(2, '0') + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const [y1, m1, d1] = firstDateStr.split('-').map(Number);
  const [y2, m2, d2] = secondDateStr.split('-').map(Number);

  if (!y1 || !m1 || !d1 || !y2 || !m2 || !d2) {
    return `${firstDateStr} – ${secondDateStr}`;
  }

  const month1 = months[m1 - 1];
  const month2 = months[m2 - 1];

  if (y1 === y2 && m1 === m2) {
    return `${month1} ${getOrdinal(d1)} – ${getOrdinal(d2)}, ${y1}`;
  }
  return `${month1} ${getOrdinal(d1)} – ${month2} ${getOrdinal(d2)}, ${y2}`;
}

export const Countdown: React.FC = () => {
  const [phase, setPhase] = useState<EventPhase>('COUNTDOWN');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();

      const [y1, m1, d1] = EVENT_DATES_CONFIG.firstDate.split('-').map(Number);
      const [y2, m2, d2] = EVENT_DATES_CONFIG.secondDate.split('-').map(Number);
      const [startH, startM, startS] = EVENT_DATES_CONFIG.dayOneStartTime.split(':').map(Number);

      const day1Start = new Date(y1, m1 - 1, d1, 0, 0, 0, 0);
      const day1End = new Date(y1, m1 - 1, d1, 23, 59, 59, 999);

      const day2Start = new Date(y2, m2 - 1, d2, 0, 0, 0, 0);
      const day2End = new Date(y2, m2 - 1, d2, 23, 59, 59, 999);

      const countdownTarget = new Date(y1, m1 - 1, d1, startH || 0, startM || 0, startS || 0).getTime();
      const currentTime = now.getTime();

      // If today is the firstDate -> show DAY 1 and remove countdown
      if (currentTime >= day1Start.getTime() && currentTime <= day1End.getTime()) {
        setPhase('DAY_1');
        return;
      }

      // If today is the secondDate -> show DAY 2 and remove countdown
      if (currentTime >= day2Start.getTime() && currentTime <= day2End.getTime()) {
        setPhase('DAY_2');
        return;
      }

      // If after secondDate -> event concluded
      if (currentTime > day2End.getTime()) {
        setPhase('COMPLETED');
        return;
      }

      // Before firstDate -> show countdown
      setPhase('COUNTDOWN');
      const difference = Math.max(0, countdownTarget - currentTime);

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  // On 1st Date (Day 1) or 2nd Date (Day 2): Show DAY 1 or DAY 2 only and remove the countdown
  if (phase === 'DAY_1' || phase === 'DAY_2') {
    return (
      <div className="mt-5 sm:mt-7 mb-7 sm:mb-9 flex flex-col items-center">
        <div className="bg-black/55 border border-[#f3c57a]/40 backdrop-blur-md rounded-3xl py-5 px-12 sm:py-7 sm:px-16 shadow-2xl shadow-black/90">
          <span className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-bold text-white tracking-[0.18em] uppercase leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            {phase === 'DAY_1' ? 'DAY 1' : 'DAY 2'}
          </span>
        </div>
      </div>
    );
  }

  if (phase === 'COMPLETED') {
    return (
      <div className="mt-5 sm:mt-7 mb-7 sm:mb-9 flex flex-col items-center">
        <p className="text-sm sm:text-base md:text-lg font-bold text-white/95 uppercase tracking-[0.28em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
          EVENT CONCLUDED
        </p>
      </div>
    );
  }

  // Before the event: Show formatted date subtitle + live countdown box
  const formattedSubtitle = formatEventDateRange(
    EVENT_DATES_CONFIG.firstDate,
    EVENT_DATES_CONFIG.secondDate
  );

  return (
    <>
      {/* Date Subtitle */}
      <p className="text-xs sm:text-sm md:text-base font-bold text-white/95 uppercase tracking-[0.25em] sm:tracking-[0.34em] mt-3 sm:mt-5 mb-7 sm:mb-9 drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
        {formattedSubtitle}
      </p>

      {/* Frosted Glassmorphism Countdown Container */}
      <div className="w-full max-w-xl mx-auto bg-black/50 border border-white/15 backdrop-blur-md rounded-3xl p-3.5 sm:p-5 shadow-2xl shadow-black/90 mb-5">
        <div className="flex items-center justify-between sm:justify-center gap-1.5 sm:gap-4">
          
          {/* Days Tile */}
          <div className="flex-1 max-w-[105px] bg-[#0c0c0c]/90 border border-white/10 rounded-2xl py-3.5 sm:py-5 px-2 sm:px-3 text-center shadow-inner">
            <div className="text-2xl sm:text-4xl font-mono-num font-bold text-white tracking-tight leading-none">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.18em] text-neutral-400 uppercase mt-2">
              DAYS
            </div>
          </div>

          {/* Colon */}
          <span className="text-neutral-500 font-bold text-lg sm:text-2xl -translate-y-1">:</span>

          {/* Hours Tile */}
          <div className="flex-1 max-w-[105px] bg-[#0c0c0c]/90 border border-white/10 rounded-2xl py-3.5 sm:py-5 px-2 sm:px-3 text-center shadow-inner">
            <div className="text-2xl sm:text-4xl font-mono-num font-bold text-white tracking-tight leading-none">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.18em] text-neutral-400 uppercase mt-2">
              HOURS
            </div>
          </div>

          {/* Colon */}
          <span className="text-neutral-500 font-bold text-lg sm:text-2xl -translate-y-1">:</span>

          {/* Minutes Tile */}
          <div className="flex-1 max-w-[105px] bg-[#0c0c0c]/90 border border-white/10 rounded-2xl py-3.5 sm:py-5 px-2 sm:px-3 text-center shadow-inner">
            <div className="text-2xl sm:text-4xl font-mono-num font-bold text-white tracking-tight leading-none">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.18em] text-neutral-400 uppercase mt-2">
              MINUTES
            </div>
          </div>

          {/* Colon */}
          <span className="text-neutral-500 font-bold text-lg sm:text-2xl -translate-y-1">:</span>

          {/* Seconds Tile */}
          <div className="flex-1 max-w-[105px] bg-[#0c0c0c]/90 border border-white/10 rounded-2xl py-3.5 sm:py-5 px-2 sm:px-3 text-center shadow-inner">
            <div className="text-2xl sm:text-4xl font-mono-num font-bold text-white tracking-tight leading-none">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.18em] text-neutral-400 uppercase mt-2">
              SECONDS
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
