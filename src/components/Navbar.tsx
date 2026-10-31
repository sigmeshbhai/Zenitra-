import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { INSTITUTION_LINK_URL } from './Hero.tsx';

interface NavbarProps {
  onTeleport: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onTeleport, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'events', label: 'Events' },
    { id: 'resources', label: 'Resources' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onTeleport(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-black/30 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          
          {/* Brand Wordmark */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-2 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f3c57a] rounded-lg transition-all"
            aria-label="Zenitra Home"
          >
            <span className="font-serif-display font-bold tracking-wider text-lg text-white group-hover:text-[#f3c57a] transition-colors uppercase">
              ZENITRA
            </span>
            <span className="text-[11px] font-mono-num text-[#e8b074] font-semibold bg-white/5 px-1.5 py-0.5 rounded border border-white/10 hidden sm:inline-block">
              '26
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f3c57a] ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Institutional Badge (Looks like normal badge text, opens INSTITUTION_LINK_URL) */}
          <a
            href={INSTITUTION_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-xs text-neutral-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f3c57a]" />
            <span className="font-medium text-neutral-300">Christ PU College - Residential</span>
          </a>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f3c57a] transition-colors"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/98 border-b border-white/10 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
