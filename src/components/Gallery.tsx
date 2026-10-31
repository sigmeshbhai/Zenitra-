import React, { useState } from 'react';
import { Camera, Eye, X } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'stage' | 'culture' | 'theatrics' | 'awards';
  categoryLabel: string;
  caption: string;
  imageUrl?: string;
  gradient: string;
  iconText: string;
}

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-poster',
      title: 'Zenitra 2026 Keynote Stage Identity',
      category: 'stage',
      categoryLabel: 'Stage & Keynote',
      caption: 'The dramatic six-spotlight visual insignia uniting performing arts, music, dance, theatre, journalism, and photography.',
      imageUrl: '/assets/aistudio/image_781fa78b.png',
      gradient: 'from-[#420912] to-[#120205]',
      iconText: 'ZENITRA KEYNOTE'
    },
    {
      id: 'g-schedule',
      title: 'Official Fest Program & Timetable',
      category: 'culture',
      categoryLabel: 'Festival Culture',
      caption: 'Curated timeline covering IB Auditorium, Conference Hall, TOK Room, and Rock Garden across two electrifying days.',
      imageUrl: '/assets/aistudio/image_f430b7d1.png',
      gradient: 'from-[#380710] to-[#0e0205]',
      iconText: 'SCHEDULE MATRIX'
    },
    {
      id: 'g-vox',
      title: 'Acoustic Ensembles & Choral Harmonies',
      category: 'stage',
      categoryLabel: 'Stage & Keynote',
      caption: 'Live acoustic vocals reverberating inside the IB Auditorium during the VOX Nova choral championship.',
      gradient: 'from-[#61101e] via-[#3a0812] to-[#140205]',
      iconText: 'VOX NOVA CHOIR'
    },
    {
      id: 'g-obscura',
      title: 'The Obscura Interrogation Chambers',
      category: 'theatrics',
      categoryLabel: 'Theatrics & Mystery',
      caption: 'Investigators dissecting forensic ciphers and questioning enigmatic witnesses in the Conference Hall.',
      gradient: 'from-[#2b0813] via-[#480d19] to-[#0d0205]',
      iconText: 'OBSCURA INQUIRY'
    },
    {
      id: 'g-dance',
      title: 'Mayhem Street Dance Cypher',
      category: 'stage',
      categoryLabel: 'Stage & Keynote',
      caption: 'Under the twilight canopy of the Rock Garden, dancers unleash spontaneous freestyle choreography to live DJ breaks.',
      gradient: 'from-[#54111d] via-[#2f0710] to-[#100204]',
      iconText: 'ROCK GARDEN CYPHER'
    },
    {
      id: 'g-cosplay',
      title: 'Identity Not Found: Theatrical Runway',
      category: 'theatrics',
      categoryLabel: 'Theatrics & Mystery',
      caption: 'Masterful cosplay creations bringing fantasy, anime, and cinematic legends to life in the IB Auditorium.',
      gradient: 'from-[#450d18] via-[#631422] to-[#140205]',
      iconText: 'COSPLAY SHOWCASE'
    },
    {
      id: 'g-art',
      title: 'Easel Enigma Live Canvas Synthesis',
      category: 'culture',
      categoryLabel: 'Festival Culture',
      caption: 'Artists translating impromptu philosophical themes into acrylic, charcoal, and mixed media in the TOK Room.',
      gradient: 'from-[#420d18] via-[#2c0810] to-[#120205]',
      iconText: 'EASEL ENIGMA'
    },
    {
      id: 'g-valedictory',
      title: 'Grand Valedictory & Trophy Presentation',
      category: 'awards',
      categoryLabel: 'Awards Ceremony',
      caption: 'Over ₹50,000 in cash awards and the Zenitra Overall Rolling Trophy awarded to the champion contingent.',
      gradient: 'from-[#6e1323] via-[#3f0812] to-[#120205]',
      iconText: 'VALEDICTORY AWARDS'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Moments' },
    { id: 'stage', label: 'Stage & Keynote' },
    { id: 'theatrics', label: 'Theatrics & Mystery' },
    { id: 'culture', label: 'Festival Culture' },
    { id: 'awards', label: 'Awards & Trophies' },
  ];

  const filteredItems = galleryItems.filter((item) => {
    return selectedCategory === 'all' || item.category === selectedCategory;
  });

  return (
    <section
      id="gallery"
      className="py-24 relative overflow-hidden bg-transparent"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-[#8a1426]/12 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.28em] text-[#f3c57a] font-semibold">
              ATMOSPHERE & MOMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-white tracking-wide uppercase">
              Fest Gallery
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 max-w-xl font-light leading-relaxed">
              Glimpses of artistic flair, intense competition, and student camaraderie across Zenitra and Christ Junior College - Residential.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs text-neutral-300 bg-black/40 px-4 py-2.5 rounded-2xl border border-white/10 backdrop-blur-md">
            <Camera className="w-4 h-4 text-[#f3c57a]" />
            <span>Official Media Bureau · Christ Junior College</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl overflow-x-auto mb-10 max-w-2xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all whitespace-nowrap focus:outline-none ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#8f1627] to-[#590b17] text-white shadow-lg border border-white/20 font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group relative cursor-pointer rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 bg-black/40 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:shadow-[#7a1322]/30 aspect-square flex flex-col justify-end shadow-xl shadow-black/70"
            >
              {/* Background image or stylized backdrop */}
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} flex items-center justify-center p-6 text-center group-hover:scale-105 transition-transform duration-500`}
                >
                  <div className="space-y-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 mx-auto rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-[#f3c57a]">
                      <Camera className="w-5 h-5" />
                    </div>
                    <span className="font-serif-display font-bold text-xs tracking-widest text-[#f5dbaf] block">
                      {item.iconText}
                    </span>
                  </div>
                </div>
              )}

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Card Footer Content */}
              <div className="relative z-10 p-5 space-y-1.5">
                <span className="text-[10px] uppercase font-mono-num font-semibold text-[#f3c57a] bg-black/70 px-2 py-0.5 rounded border border-white/10 inline-block">
                  {item.categoryLabel}
                </span>
                <h4 className="font-serif-display font-bold text-sm text-white group-hover:text-[#f3c57a] transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-neutral-300 line-clamp-1 font-light">
                  {item.caption}
                </p>
              </div>

              {/* Hover inspect badge */}
              <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-sm border border-white/15 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#100103]/95 rounded-3xl overflow-hidden border border-white/15 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-black/60">
              <div>
                <span className="text-xs font-mono-num text-[#f3c57a]">{activePhoto.categoryLabel}</span>
                <h3 className="font-serif-display font-bold text-lg text-white">{activePhoto.title}</h3>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close photo view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 bg-black flex flex-col items-center justify-center min-h-[300px] max-h-[65vh] overflow-y-auto">
              {activePhoto.imageUrl ? (
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="max-h-[55vh] w-auto rounded-2xl shadow-2xl border border-white/10"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div
                  className={`w-full h-72 rounded-2xl bg-gradient-to-br ${activePhoto.gradient} border border-white/10 flex flex-col items-center justify-center p-6 text-center shadow-inner`}
                >
                  <div className="w-16 h-16 rounded-full bg-black/70 border border-white/15 flex items-center justify-center text-[#f3c57a] mb-3">
                    <Camera className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-display font-bold text-xl text-white">{activePhoto.title}</h4>
                  <p className="text-xs font-mono-num text-[#f3c57a] mt-1">{activePhoto.iconText}</p>
                </div>
              )}
              <p className="text-xs sm:text-sm text-neutral-300 text-center mt-4 max-w-xl leading-relaxed font-light">
                {activePhoto.caption}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-black/60 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 px-6">
              <span>Zenitra '26 Official Archive</span>
              <span className="font-mono-num">Christ Junior College - Residential</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
