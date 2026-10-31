import React from 'react';
import { Instagram, Globe, Mail, MapPin, ArrowUp } from 'lucide-react';
import { INSTITUTION_LINK_URL } from './Hero.tsx';

interface FooterProps {
  onTeleport: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTeleport }) => {
  return (
    <footer
      className="text-neutral-400 text-xs select-none bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & CAS Ethos */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <span className="font-serif-display font-bold text-lg text-white tracking-wider block uppercase">
                ZENITRA '26
              </span>
              <a
                href={INSTITUTION_LINK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#f3c57a] hover:text-white font-medium tracking-wide transition-colors inline-block cursor-pointer"
              >
                CHRIST PU COLLEGE - RESIDENTIAL
              </a>
            </div>

            <p className="text-xs leading-relaxed text-neutral-400 max-w-sm font-light">
              An inter-school CAS initiative fostering student voice, artistic brilliance, athletic rhythm, and forensic inquiry.
            </p>

            <div className="flex items-center gap-5 pt-1">
              <a
                href="https://instagram.com/zenitra.cjcib"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-[#f3c57a] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#f3c57a]" />
                <span>@zenitra.cjcib</span>
              </a>
              <a
                href="https://www.cjcib.in"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-[#f3c57a] transition-colors"
              >
                <Globe className="w-4 h-4 text-[#f3c57a]" />
                <span>www.cjcib.in</span>
              </a>
            </div>
          </div>

          {/* Col 2: Teleport Hub Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif-display font-bold text-sm text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About & Secretariat' },
                { id: 'events', label: 'Events' },
                { id: 'resources', label: 'Resources' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onTeleport(item.id)}
                    className="hover:text-white transition-colors text-left font-light"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Campus & Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif-display font-bold text-sm text-white uppercase tracking-wider">
              Campus & Secretariat
            </h4>
            <div className="space-y-2.5 text-xs leading-relaxed text-neutral-400 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#f3c57a] shrink-0 mt-0.5" />
                <span>
                  Christ PU College - Residential,
                  IB Campus, Bengaluru, Karnataka, India
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#f3c57a] shrink-0" />
                <a href="mailto:zenitra@cjcib.in" className="hover:text-white transition-colors">
                  zenitra@cjcib.in
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onTeleport('hero')}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#f3c57a] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© 2026 Zenitra — A CAS Initiative. Christ PU College - Residential. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Inter-School Fest Portal</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
