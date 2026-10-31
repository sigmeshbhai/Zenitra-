/**
 * Event and Registration pure business logic
 */

export interface EventItem {
  id: string;
  name: string;
  category: 'performing-arts' | 'literary-mystery' | 'visual-arts' | 'gaming-marketing';
  categoryLabel: string;
  day: 1 | 2;
  time: string;
  venue: string;
  fee: number;
  prizes: {
    first: string;
    second?: string;
    third?: string;
  };
  teamType: 'solo' | 'team';
  teamSize: { min: number; max: number };
  description: string;
  agenda: string;
  rules: string[];
}

export const ZENITRA_EVENTS: EventItem[] = [
  {
    id: 'vox-nova',
    name: 'VOX Nova (Group Song)',
    category: 'performing-arts',
    categoryLabel: 'Performing Arts',
    day: 1,
    time: '10:00 AM',
    venue: 'IB Auditorium',
    fee: 500,
    prizes: { first: '₹8,000', second: '₹5,000', third: '₹2,000' },
    teamType: 'team',
    teamSize: { min: 4, max: 10 },
    description: 'The premier choral and vocal ensemble competition. Harmonize across genres ranging from acoustic acapella to theatrical orchestrations.',
    agenda: 'Acoustic & Vocal Symphony: Dynamic harmony, pitch accuracy, stage presence, and live vocal acoustics.',
    rules: [
      'Team limit: 4 to 10 participants per contingent.',
      'Time limit: 6 minutes performance + 2 minutes sound check.',
      'Only acoustic instruments permitted (max 2 backing acoustic guitars/keyboards). No pre-recorded vocal backing tracks.',
      'Original arrangements and mashups are encouraged.'
    ]
  },
  {
    id: 'obscura',
    name: 'Obscura (Murder Mystery)',
    category: 'literary-mystery',
    categoryLabel: 'Literary & Mystery',
    day: 1,
    time: '10:00 AM',
    venue: 'Conference Hall',
    fee: 500,
    prizes: { first: '₹8,000', second: '₹5,000', third: '₹2,000' },
    teamType: 'team',
    teamSize: { min: 2, max: 4 },
    description: 'An immersive forensic inquiry and investigative simulation. Piece together crime scenes, decode encrypted ciphers, and interrogate suspects.',
    agenda: 'Forensic Logic & Investigative Deduction: Cryptography, timeline reconstruction, and cross-examination.',
    rules: [
      'Teams of 2 to 4 investigators.',
      'Strictly pen, paper, and physical evidence; personal mobile devices will be sequestered during active interrogation rounds.',
      '3 Progressive stages: Crime Scene Analysis, Suspect Interrogation, Final Accusation.'
    ]
  },
  {
    id: 'easel-enigma',
    name: 'Easel Enigma (Art)',
    category: 'visual-arts',
    categoryLabel: 'Visual Arts',
    day: 1,
    time: '10:00 AM',
    venue: 'TOK Room',
    fee: 300,
    prizes: { first: '₹3,000', second: '₹2,000', third: '₹1,000' },
    teamType: 'solo',
    teamSize: { min: 1, max: 1 },
    description: 'Live thematic fine art canvas showdown. Channel existentialism, surrealism, and spontaneous prompts into compelling visual masterpieces.',
    agenda: 'Visual Aesthetics & Thematic Depth: Medium mastery, brushwork, composition, and interpretive clarity.',
    rules: [
      'Individual event.',
      'Duration: 2 hours 30 minutes.',
      'Base canvas sheets provided by CJCIB. Artists must bring their own mediums (acrylic, charcoal, gouache, or watercolors).',
      'The theme will be revealed 10 minutes prior to the commencement bell.'
    ]
  },
  {
    id: 'identity-not-found',
    name: 'Identity Not Found (Cosplay)',
    category: 'performing-arts',
    categoryLabel: 'Performing Arts',
    day: 1,
    time: '12:00 PM',
    venue: 'IB Auditorium',
    fee: 300,
    prizes: { first: '₹3,000', second: '₹2,000', third: '₹1,000' },
    teamType: 'solo',
    teamSize: { min: 1, max: 1 },
    description: 'Transform into iconic figures from literature, cinematic mythology, anime, or gaming universes. Bring characters to life on the grand stage.',
    agenda: 'Character Embodiment & Craftsmanship: Prop authenticity, costume fidelity, stage performance monologue.',
    rules: [
      'Solo participant with optional 1 backstage prop assistant.',
      'Stage time: 90 seconds runway walk + 60 seconds in-character dialogue or skit.',
      'No hazardous pyrotechnics or sharp steel blades permitted in props.'
    ]
  },
  {
    id: 'mad-ads',
    name: 'Mad Ads (Marketing)',
    category: 'gaming-marketing',
    categoryLabel: 'Gaming & Marketing',
    day: 1,
    time: '01:00 PM',
    venue: 'TOK Room',
    fee: 500,
    prizes: { first: '₹8,000', second: '₹5,000', third: '₹2,000' },
    teamType: 'team',
    teamSize: { min: 4, max: 6 },
    description: 'High-energy comedic commercial advertising parody. Sell absurd, impossible, or satirical products with razor-sharp comedic timing and slogans.',
    agenda: 'Satirical Marketing & Theatrical Pitch: Humor, jingles, persuasion tactics, and audience engagement.',
    rules: [
      'Teams of 4 to 6 members.',
      'Performance time: 5 minutes sharp.',
      'Vulgarity, derogatory slurs, or defaming real-world individuals leads to immediate disqualification.'
    ]
  },
  {
    id: 'fallen-records',
    name: 'Fallen Records (Group Dance)',
    category: 'performing-arts',
    categoryLabel: 'Performing Arts',
    day: 2,
    time: '10:00 AM',
    venue: 'IB Auditorium',
    fee: 500,
    prizes: { first: '₹8,000', second: '₹5,000', third: '₹2,000' },
    teamType: 'team',
    teamSize: { min: 6, max: 14 },
    description: 'The monumental inter-school group dance championship. Precision formations, synchronized breaks, and electrifying stage choreography.',
    agenda: 'Choreographic Synchronization & Energy: Formations, rhythm execution, expression, and music transition.',
    rules: [
      'Teams of 6 to 14 dancers.',
      'Performance time: 6 to 8 minutes.',
      'Audio track in .mp3 format must be submitted at the registration desk before 9:00 AM on Day 2.'
    ]
  },
  {
    id: 'revival',
    name: 'Revival (E-Gaming)',
    category: 'gaming-marketing',
    categoryLabel: 'Gaming & Marketing',
    day: 2,
    time: '10:00 AM',
    venue: 'IB 2nd Floor',
    fee: 600,
    prizes: { first: '₹8,000 Per Team for Each Game' },
    teamType: 'team',
    teamSize: { min: 4, max: 5 },
    description: 'High-octane competitive esports championship featuring tactical multiplayer showdowns on dedicated low-latency LAN rigs.',
    agenda: 'Tactical Team Esports: Tactical reflexes, strategic communication, map control, and objective execution.',
    rules: [
      'Squad of 4 active players + 1 optional substitute.',
      'LAN tournament structure: Single elimination qualifiers leading to Best-of-3 grand finals.',
      'BYOD (Bring Your Own Peripherals: headsets, mice, mechanical keyboards permitted).'
    ]
  },
  {
    id: 'mayhem',
    name: 'Mayhem (Dance Battle)',
    category: 'performing-arts',
    categoryLabel: 'Performing Arts',
    day: 2,
    time: '12:00 PM',
    venue: 'Rock Garden',
    fee: 300,
    prizes: { first: '₹3,000', second: '₹2,000', third: '₹1,000' },
    teamType: 'solo',
    teamSize: { min: 1, max: 1 },
    description: 'Raw, unscripted 1v1 street cypher dance battle under the open skies at the Rock Garden. Unpredictable live DJ beats and sudden drop-ins.',
    agenda: 'Musicality & Freestyle Battle: Musical improvisation, versatility, battle etiquette, and dynamic response.',
    rules: [
      '1v1 knockout bracket format.',
      'Each round consists of two 45-second rounds per battler to live DJ drops.',
      'Respect the cypher space: Physical contact or abusive gestures strictly prohibited.'
    ]
  }
];

export interface RegistrationInput {
  name: string;
  email: string;
  phone: string;
  school: string;
  selectedEventIds: string[];
  type: 'individual' | 'delegation';
  delegationSize?: number;
  teamLeaderName?: string;
  notes?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateRegistration(input: RegistrationInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Full name is required (minimum 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'A valid email address is required.';
  }

  const phoneClean = input.phone ? input.phone.replace(/[\s\-\+]/g, '') : '';
  if (!phoneClean || phoneClean.length < 8 || !/^\d+$/.test(phoneClean)) {
    errors.phone = 'A valid contact phone number is required (at least 8 digits).';
  }

  if (!input.school || input.school.trim().length < 2) {
    errors.school = 'School / Institution name is required.';
  }

  if (!input.selectedEventIds || input.selectedEventIds.length === 0) {
    errors.selectedEventIds = 'Please select at least one event or committee.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function calculateTotalFee(selectedEventIds: string[], type: 'individual' | 'delegation'): {
  subtotal: number;
  discount: number;
  total: number;
} {
  const subtotal = selectedEventIds.reduce((sum, id) => {
    const ev = ZENITRA_EVENTS.find(e => e.id === id);
    return sum + (ev ? ev.fee : 0);
  }, 0);

  // Delegation discount: If registering for 4 or more events as a delegation, 10% institution discount
  let discount = 0;
  if (type === 'delegation' && selectedEventIds.length >= 4) {
    discount = Math.round(subtotal * 0.1);
  }

  return {
    subtotal,
    discount,
    total: Math.max(0, subtotal - discount)
  };
}

export function generateRegistrationTicketId(eventIdPrefix?: string): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const prefix = eventIdPrefix ? eventIdPrefix.toUpperCase().slice(0, 3) : 'REG';
  return `ZEN26-${prefix}-${randomNum}`;
}

export function filterEvents(
  events: EventItem[],
  day: number | 'all',
  category: string
): EventItem[] {
  return events.filter(event => {
    const matchesDay = day === 'all' || event.day === day;
    const matchesCategory = category === 'all' || event.category === category;
    return matchesDay && matchesCategory;
  });
}
