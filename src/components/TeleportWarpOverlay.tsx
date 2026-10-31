import React from 'react';

interface TeleportWarpOverlayProps {
  isActive: boolean;
  direction: 'down' | 'up';
  targetLabel?: string;
}

export const TeleportWarpOverlay: React.FC<TeleportWarpOverlayProps> = ({
  isActive,
  direction,
  targetLabel,
}) => {
  if (!isActive) return null;

  // 12 subtle, translucent speed streaks distributed across the screen width
  const streaks = [
    { left: '8%', delay: '0s', height: '180px', opacity: 0.35, color: '#f3c57a' },
    { left: '18%', delay: '0.07s', height: '240px', opacity: 0.45, color: '#e6324b' },
    { left: '27%', delay: '0.02s', height: '200px', opacity: 0.3, color: '#ffffff' },
    { left: '38%', delay: '0.11s', height: '280px', opacity: 0.4, color: '#f3c57a' },
    { left: '49%', delay: '0.04s', height: '220px', opacity: 0.35, color: '#e6324b' },
    { left: '60%', delay: '0.09s', height: '260px', opacity: 0.4, color: '#ffffff' },
    { left: '71%', delay: '0.03s', height: '190px', opacity: 0.35, color: '#f3c57a' },
    { left: '82%', delay: '0.12s', height: '250px', opacity: 0.4, color: '#e6324b' },
    { left: '92%', delay: '0.05s', height: '210px', opacity: 0.3, color: '#ffffff' },
  ];

  const animationClass = direction === 'down' ? 'speed-streak-down' : 'speed-streak-up';

  return (
    <div
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden transition-opacity duration-200"
      aria-hidden="true"
    >
      {/* Soft gradient tunnel overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2b050a]/20 via-transparent to-[#2b050a]/20" />

      {/* Speed lines */}
      <div className="relative w-full h-full">
        {streaks.map((streak, i) => (
          <div
            key={i}
            className={`absolute w-[1px] sm:w-[1.5px] rounded-full blur-[0.5px] ${animationClass}`}
            style={{
              left: streak.left,
              height: streak.height,
              backgroundColor: streak.color,
              boxShadow: `0 0 8px ${streak.color}`,
              opacity: streak.opacity,
              animationDelay: streak.delay,
            }}
          />
        ))}
      </div>

      {/* Subtle indicator HUD */}
      {targetLabel && (
        <div className="absolute top-20 right-6 px-3 py-1 rounded-full bg-black/80 border border-[#f3c57a]/40 text-[#f3c57a] text-[11px] font-mono-num font-semibold shadow-2xl backdrop-blur-md animate-pulse">
          TELEPORTING → {targetLabel.toUpperCase()}
        </div>
      )}
    </div>
  );
};
