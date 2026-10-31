import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTeleportDuration,
  easeInOutCubic,
  getScrollBlurIntensity
} from './teleport.ts';

test('calculateTeleportDuration clamps duration between 380ms and 560ms for smooth motion', () => {
  const shortDist = calculateTeleportDuration(50);
  assert.ok(shortDist >= 380);
  assert.ok(shortDist <= 560);

  const longDist = calculateTeleportDuration(5000);
  assert.equal(longDist, 560);
});

test('easeInOutCubic correctly calculates boundary values and symmetry', () => {
  assert.equal(easeInOutCubic(0), 0);
  assert.equal(easeInOutCubic(1), 1);
  assert.equal(easeInOutCubic(0.5), 0.5);
  // Ease in is slower initially
  assert.ok(easeInOutCubic(0.2) < 0.2);
  // Ease out is slower at end
  assert.ok(easeInOutCubic(0.8) > 0.8);
});

test('getScrollBlurIntensity assigns higher blur to longer distances', () => {
  assert.equal(getScrollBlurIntensity(200), 2.5);
  assert.equal(getScrollBlurIntensity(800), 3.5);
  assert.equal(getScrollBlurIntensity(2500), 4.5);
});
