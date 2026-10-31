import React, { useState } from 'react';
import { ZENITRA_EVENTS, EventItem } from '../utils/registration.ts';
import { Award, MapPin, Users, FileText, ArrowRight, X, Sparkles } from 'lucide-react';

interface CommitteesProps {
  onSelectEventForRegistration: (eventId: string) => void;
}

export const Committees: React.FC<CommitteesProps> = ({ onSelectEventForRegistration }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Committees & Events' },
    { id: 'performing-arts', label: 'Performing Arts' },
    { id: 'literary-mystery', label: 'Literary & Mystery' },
    { id: 'visual-arts', label: 'Visual Arts' },
    { id: 'gaming-marketing', label: 'Gaming & Marketing' },
  ];

  const filteredEvents = ZENITRA_EVENTS.filter((event) => {
    return selectedCategory === 'all' || event.category === selectedCategory;
  });

  return (
    <section
      id="committees"
      className="py-24 relative overflow-hidden bg-transparent"
    >
      {/* Background ambient radial bloom */}
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-[#8a1426]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.28em] text-[#f3c57a] font-semibold">
              OFFICIAL COMPETITIONS & SIMULATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-white tracking-wide uppercase">
              Committees & Events
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 max-w-xl font-light leading-relaxed">
              Explore the 8 flagship events across Day 1 and Day 2. View official agendas, executive rules, and cash prize breakdowns.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs text-neutral-300 bg-black/40 px-4 py-2.5 rounded-2xl border border-white/10 backdrop-blur-md">
            <Award className="w-4 h-4 text-[#f3c57a]" />
            <span className="font-semibold text-white">Official Prize Certificates & Trophies for Top 3</span>
          </div>
        </div>

        {/* Category Tabs (Glassmorphism Segmented Control) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl overflow-x-auto mb-10 max-w-3xl">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all whitespace-nowrap focus:outline-none ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#8f1627] to-[#590b17] text-white shadow-lg border border-white/20 font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Committees Grid (Matching frosted glass style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-black/40 hover:bg-black/60 border border-white/10 hover:border-white/25 backdrop-blur-md rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/60 hover:shadow-2xl hover:shadow-[#7a1322]/20"
            >
              <div className="space-y-4">
                {/* Meta row: Category & Day */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#f3c57a]">{event.categoryLabel}</span>
                  <span className="font-mono-num text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/10">
                    Day {event.day} · {event.time}
                  </span>
                </div>

                {/* Event Name */}
                <div>
                  <h3 className="text-xl font-serif-display font-bold text-white group-hover:text-[#f3c57a] transition-colors">
                    {event.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-neutral-400 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#f3c57a]" />
                      {event.venue}
                    </span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#f3c57a]" />
                      {event.teamType === 'solo' ? 'Individual' : `${event.teamSize.min}–${event.teamSize.max} per team`}
                    </span>
                  </div>
                </div>

                {/* Synopsis */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3">
                  {event.description}
                </p>

                {/* Prize & Fee Bar */}
                <div className="bg-black/60 border border-white/10 rounded-2xl p-3.5 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase font-semibold">1st Prize</span>
                    <span className="font-mono-num font-bold text-[#f3c57a] text-sm">{event.prizes.first}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Entry Fee</span>
                    <span className="font-mono-num font-semibold text-white">₹{event.fee}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 mt-6 flex items-center gap-3">
                <button
                  onClick={() => setActiveModalEvent(event)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#f3c57a]" />
                  <span>Rulebook</span>
                </button>

                <button
                  onClick={() => onSelectEventForRegistration(event.id)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#8f1627] to-[#590b17] hover:from-[#aa1c31] hover:to-[#730f20] text-white text-xs font-semibold border border-white/20 shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Register</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#ffe2b8]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Background Guide / Committee Details Modal */}
      {activeModalEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveModalEvent(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#100103]/95 rounded-3xl overflow-hidden border border-white/15 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-black/50 flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono-num uppercase tracking-wider text-[#f3c57a] bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                  {activeModalEvent.categoryLabel} · Day {activeModalEvent.day}
                </span>
                <h3 className="text-2xl font-serif-display font-bold text-white mt-2">
                  {activeModalEvent.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 flex items-center gap-3">
                  <span>Venue: {activeModalEvent.venue}</span>
                  <span className="text-neutral-600">·</span>
                  <span>Time: {activeModalEvent.time}</span>
                </p>
              </div>
              <button
                onClick={() => setActiveModalEvent(null)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6 text-neutral-300 text-sm">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#f3c57a] font-bold mb-1">
                  Committee Synopsis & Agenda
                </h4>
                <p className="leading-relaxed text-white">
                  {activeModalEvent.agenda}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#f3c57a] font-bold mb-2">
                  Rules & Evaluation Rubric
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  {activeModalEvent.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-black/50 p-3 rounded-xl border border-white/10">
                      <span className="text-[#f3c57a] font-mono-num font-bold">0{idx + 1}.</span>
                      <span className="text-neutral-200">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prize Details */}
              <div className="bg-black/50 p-4 rounded-2xl border border-white/10">
                <h4 className="text-xs uppercase tracking-widest text-[#f3c57a] font-bold mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#f3c57a]" />
                  <span>Prize Distribution</span>
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-black/70 p-2.5 rounded-xl border border-white/10">
                    <span className="text-neutral-400 block text-[10px]">1st Place</span>
                    <span className="font-mono-num font-bold text-[#f3c57a] text-sm">{activeModalEvent.prizes.first}</span>
                  </div>
                  {activeModalEvent.prizes.second && (
                    <div className="bg-black/70 p-2.5 rounded-xl border border-white/10">
                      <span className="text-neutral-400 block text-[10px]">2nd Place</span>
                      <span className="font-mono-num font-bold text-white text-sm">{activeModalEvent.prizes.second}</span>
                    </div>
                  )}
                  {activeModalEvent.prizes.third && (
                    <div className="bg-black/70 p-2.5 rounded-xl border border-white/10">
                      <span className="text-neutral-400 block text-[10px]">3rd Place</span>
                      <span className="font-mono-num font-bold text-white text-sm">{activeModalEvent.prizes.third}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-black/50 flex items-center justify-between gap-4">
              <div className="text-xs text-neutral-400">
                Fee: <strong className="text-white font-mono-num">₹{activeModalEvent.fee}</strong>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModalEvent(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-neutral-300 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setActiveModalEvent(null);
                    onSelectEventForRegistration(activeModalEvent.id);
                  }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#8f1627] to-[#590b17] text-white text-xs font-semibold border border-white/20 shadow-md flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#ffe2b8]" />
                  <span>Register for this Event</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
