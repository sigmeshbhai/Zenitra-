import React, { useState } from 'react';
import { BookOpen, Compass, HeartHandshake, ChevronDown, ChevronUp } from 'lucide-react';

export const AboutLetter: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden bg-transparent"
    >
      {/* Ambient background bloom */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#8a1426]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs uppercase tracking-[0.28em] text-[#f3c57a] font-semibold">
            SECRETARIAT ADDRESS & CAS ETHOS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-white tracking-wide uppercase">
            Welcome to Zenitra '26
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            A celebration of student leadership, artistic courage, and competitive intellectual rigor at Christ PU College - Residential.
          </p>
        </div>

        {/* Letter Container (GWHMUN style frosted glassmorphism matching hero) */}
        <div className="relative bg-black/40 border border-white/15 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <p className="font-serif-display text-lg font-bold text-white">From the Zenitra Secretariat & CAS Council</p>
              <p className="text-xs text-neutral-400">Christ PU College - Residential, Bengaluru</p>
            </div>
            <div className="text-xs font-mono-num text-[#f3c57a] bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 self-start sm:self-auto">
              Ref: CJCIB/ZEN/2026-INV
            </div>
          </div>

          <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
            <p className="font-medium text-white">
              Esteemed Faculty Advisors, Contingent Heads, and Fellow Students,
            </p>
            <p>
              It is our distinct honor to welcome you to the 2026 edition of <strong className="text-white">Zenitra</strong>, an inter-school fest conceived under the aegis of the <strong className="text-[#f3c57a]">Creativity, Activity, and Service (CAS)</strong> initiative at Christ PU College - Residential.
            </p>
            <p>
              In a world brimming with fast-paced digital distractions, Zenitra was envisioned as a sanctuary where raw creative vigor meets strategic discipline. Whether your passion lies in harmonizing four-part acapellas in <em>VOX Nova</em>, piecing together forensic evidence in <em>Obscura</em>, commanding the stage in <em>Identity Not Found</em>, or dominating collegiate esports in <em>Revival</em>, our arena was built to challenge your creative limits.
            </p>

            {expanded && (
              <div className="space-y-4 pt-2 animate-in fade-in duration-300">
                <p>
                  As an institution grounded in holistic development, Christ PU College - Residential upholds the core tenets of fair play, academic integrity, and empathetic collaboration. We have instituted a standardized judging panel comprising industry veterans, conservatory musicians, and performing arts adjudicators to ensure absolute impartiality across all eight flagship committees.
                </p>
                <p>
                  We extend our warmest invitations to schools, junior colleges, and international curriculum delegations across Karnataka and India. Our organizing team, volunteer stewards, and venue logistics committees stand ready to provide an unforgettable weekend of intellectual and artistic camaraderie.
                </p>
                <p className="pt-2 text-white italic">
                  "Step beyond the threshold of ordinary talent, and write your school's name in the annals of Zenitra."
                </p>
              </div>
            )}
          </div>

          {/* Toggle Full Address */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-semibold text-[#f3c57a] hover:text-white flex items-center gap-1.5 transition-colors focus:outline-none"
            >
              <span>{expanded ? 'Collapse Letter' : 'Read Full Secretariat Letter'}</span>
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Three CAS Pillars */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/50 p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#f3c57a]">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="font-serif-display font-semibold text-white text-sm">Creativity (C)</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Cultivating original storytelling, satire, fine arts, and musical arrangement that defy conventional boundaries.
              </p>
            </div>

            <div className="bg-black/50 p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#f3c57a]">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="font-serif-display font-semibold text-white text-sm">Activity (A)</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Testing athletic rhythm, stage endurance, fast reflexes, and competitive team strategy under high pressure.
              </p>
            </div>

            <div className="bg-black/50 p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#f3c57a]">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <h3 className="font-serif-display font-semibold text-white text-sm">Service (S)</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Fostering inter-school camaraderie, respectful delegation conduct, and student leadership in event administration.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
