import React from 'react';
import { Download } from 'lucide-react';

export interface ResourceItem {
  id: string;
  header: string;
  description: string;
  /**
   * Paste your link here (Google Drive link, external URL, or local file path like '/my-file.pdf')
   */
  link: string;
  /**
   * Optional file name if downloading a local file
   */
  filename?: string;
}

/**
 * ============================================================================
 * RESOURCES ARRAY CONFIGURATION
 * ============================================================================
 * To add a new resource card, copy one of the blocks `{ ... },` below and paste
 * it inside the RESOURCES_DATA array.
 *
 * Each card takes:
 * 1. id: A unique name (e.g., 'rulebook-1')
 * 2. header: The main bold heading on the card
 * 3. description: Small text below the heading
 * 4. link: Any URL (https://drive.google.com/..., https://...) OR local path ('/file.pdf')
 */
export const RESOURCES_DATA: ResourceItem[] = [
  {
    id: 'master-rulebook',
    header: 'Zenitra 2026 Master Rulebook & Delegate Guide',
    description: 'Comprehensive guidelines for all 8 events, judging criteria, and scoring rubrics.',
    link: 'https://drive.google.com', // <-- Paste your Google Drive / PDF link here
    filename: 'Zenitra_2026_Delegate_Guide.pdf',
  },
  {
    id: 'code-of-conduct',
    header: 'Code of Conduct & Delegate Policy',
    description: 'Fest guidelines, anti-plagiarism norms, discipline, and campus protocols.',
    link: 'https://drive.google.com', // <-- Paste your Google Drive / PDF link here
    filename: 'Zenitra_Code_of_Conduct.pdf',
  },
  {
    id: 'campus-map',
    header: 'Campus Logistics & IB Block Layout',
    description: 'Directions, parking, check-in desks, security clearance, and auditorium maps.',
    link: 'https://maps.app.goo.gl/L4xMYDDU1uUUwtNt6', // <-- Paste your link here
    filename: 'Zenitra_Campus_Map.pdf',
  },
];

export const Resources: React.FC = () => {
  return (
    <section
      id="resources"
      className="py-24 relative overflow-hidden bg-transparent"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#8a1426]/12 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.28em] text-[#f3c57a] font-semibold">
            DELEGATE & FACULTY PORTAL
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-white tracking-wide uppercase">
            Resources
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto font-light leading-relaxed">
            Download official delegate handbooks, event guidelines, and campus logistics.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {RESOURCES_DATA.map((item) => {
            const isExternalUrl = item.link.startsWith('http://') || item.link.startsWith('https://');
            return (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                download={!isExternalUrl ? (item.filename || true) : undefined}
                className="cursor-pointer group bg-black/40 hover:bg-black/60 border border-white/10 hover:border-white/25 backdrop-blur-md rounded-2xl p-6 sm:p-7 flex items-center justify-between gap-6 transition-all duration-300 shadow-xl shadow-black/60 hover:shadow-2xl hover:shadow-[#7a1322]/20 no-underline"
              >
                {/* Left Side: Header & Small Description */}
                <div className="space-y-1.5 flex-1 min-w-0 pr-2">
                  <h3 className="font-serif-display font-bold text-lg sm:text-xl text-white group-hover:text-[#f3c57a] transition-colors leading-snug">
                    {item.header}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Right Side: Prominent Download Icon Point */}
                <div
                  className="p-3 sm:p-3.5 rounded-xl bg-white/5 group-hover:bg-[#8f1627]/30 border border-white/10 group-hover:border-[#f3c57a]/50 text-neutral-300 group-hover:text-[#f3c57a] transition-all shrink-0 shadow-md group-hover:scale-105 active:scale-95"
                  aria-label={`Open ${item.header}`}
                >
                  <Download className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
