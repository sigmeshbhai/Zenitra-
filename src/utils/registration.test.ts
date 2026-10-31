import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ZENITRA_EVENTS,
  validateRegistration,
  calculateTotalFee,
  generateRegistrationTicketId,
  filterEvents
} from './registration.ts';

test('ZENITRA_EVENTS contains all 8 official events from the schedule', () => {
  assert.equal(ZENITRA_EVENTS.length, 8);
  const eventIds = ZENITRA_EVENTS.map(e => e.id);
  assert.ok(eventIds.includes('vox-nova'));
  assert.ok(eventIds.includes('obscura'));
  assert.ok(eventIds.includes('easel-enigma'));
  assert.ok(eventIds.includes('identity-not-found'));
  assert.ok(eventIds.includes('mad-ads'));
  assert.ok(eventIds.includes('fallen-records'));
  assert.ok(eventIds.includes('revival'));
  assert.ok(eventIds.includes('mayhem'));
});

test('calculateTotalFee computes correct sums and applies delegation discount', () => {
  // vox-nova (500) + obscura (500) = 1000
  const indResult = calculateTotalFee(['vox-nova', 'obscura'], 'individual');
  assert.equal(indResult.subtotal, 1000);
  assert.equal(indResult.discount, 0);
  assert.equal(indResult.total, 1000);

  // 4 events as delegation gives 10% discount
  // 500 + 500 + 300 + 300 = 1600 -> 10% discount = 160 -> total = 1440
  const delResult = calculateTotalFee(['vox-nova', 'obscura', 'easel-enigma', 'identity-not-found'], 'delegation');
  assert.equal(delResult.subtotal, 1600);
  assert.equal(delResult.discount, 160);
  assert.equal(delResult.total, 1440);
});

test('validateRegistration catches empty or invalid input', () => {
  const invalid = validateRegistration({
    name: '',
    email: 'bad-email',
    phone: '123',
    school: '',
    selectedEventIds: [],
    type: 'individual'
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.school);
  assert.ok(invalid.errors.selectedEventIds);

  const valid = validateRegistration({
    name: 'Aarav Sharma',
    email: 'aarav@christ.edu',
    phone: '9876543210',
    school: 'Greenwood High International School',
    selectedEventIds: ['vox-nova'],
    type: 'individual'
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('filterEvents correctly filters by day and category', () => {
  const day1Events = filterEvents(ZENITRA_EVENTS, 1, 'all');
  assert.equal(day1Events.length, 5); // 5 events on Day 1

  const day2Events = filterEvents(ZENITRA_EVENTS, 2, 'all');
  assert.equal(day2Events.length, 3); // 3 events on Day 2

  const performingArts = filterEvents(ZENITRA_EVENTS, 'all', 'performing-arts');
  assert.ok(performingArts.length >= 4);
});

test('generateRegistrationTicketId produces expected format', () => {
  const ticket = generateRegistrationTicketId('VOX');
  assert.ok(ticket.startsWith('ZEN26-VOX-'));
  assert.equal(ticket.length, 14);
});
