import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { AboutLetter } from './components/AboutLetter.tsx';
import { Events } from './components/Events.tsx';
import { Resources } from './components/Resources.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Clean automatic smooth scroll without motion blur or warp overlays
  const handleTeleport = (sectionId: string) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (!target) return;

    const targetRect = target.getBoundingClientRect();
    const targetY = Math.max(0, targetRect.top + window.scrollY - 85);

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });

    try {
      window.history.pushState(null, '', `#${sectionId}`);
    } catch (e) {}
  };

  // ScrollSpy to update active section in top navbar
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'events', 'resources'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check initial hash on load
    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      if (sectionIds.includes(hashId)) {
        setTimeout(() => handleTeleport(hashId), 200);
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#f7eff0] selection:bg-[#8f1627] selection:text-white flex flex-col font-body relative overflow-x-hidden">
      
      {/* Global Seamless Ambient Lighting & Vignette (Fixed so background never breaks or resets) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Subtle, continuous crimson spotlight in the center */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] sm:w-[1100px] h-[850px] sm:h-[1100px] bg-[#8a1426]/12 rounded-full blur-[200px]" />
        
        {/* Secondary soft amber/crimson undertone lower in the page */}
        <div className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] sm:w-[1200px] h-[900px] sm:h-[1200px] bg-[#5c0d1a]/10 rounded-full blur-[240px]" />
        
        {/* Smooth natural corner vignette fading cleanly into pure pitch black at the edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_45%,transparent_40%,rgba(0,0,0,0.85)_80%,#000000_100%)]" />
      </div>

      {/* Global Top Panel Navigation */}
      <Navbar onTeleport={handleTeleport} activeSection={activeSection} />

      {/* Main Content Area - All sections sit seamlessly on this single continuous canvas */}
      <main className="flex-1 relative z-10">
        {/* 1. Hero with 16:9 ratio and feathered emblem */}
        <Hero onTeleport={handleTeleport} />

        {/* 2. Secretariat Welcome & CAS Ethos */}
        <AboutLetter />

        {/* 3. Events */}
        <Events />

        {/* 4. Resources Portal */}
        <Resources />
      </main>

      {/* Footer */}
      <Footer onTeleport={handleTeleport} />
    </div>
  );
}
