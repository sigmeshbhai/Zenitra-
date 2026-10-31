/**
 * Teleport calculation and smooth easing utilities
 */

export function calculateTeleportDuration(distance: number): number {
  const absDist = Math.abs(distance);
  // Silky smooth duration: 380ms - 560ms max for swift, fluid navigation
  return Math.min(560, Math.max(380, 360 + Math.floor(absDist * 0.05)));
}

// Smooth quartic easing for fluid cinematic motion without sudden snap
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function getScrollBlurIntensity(distance: number): number {
  const absDist = Math.abs(distance);
  if (absDist > 1400) return 4.5;
  if (absDist > 600) return 3.5;
  return 2.5;
}
