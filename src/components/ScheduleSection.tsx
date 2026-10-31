import React, { useState } from 'react';
import { ZENITRA_EVENTS } from '../utils/registration.ts';
import { Calendar, Clock, MapPin, Eye, Download, Search } from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [scheduleImageModalOpen, setScheduleImageModalOpen] = useState(false);

  const dayEvents = ZENITRA_EVENTS.filter((e) => e.day === activeDay).filter((e) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q) ||
      e.time.toLowerCase().includes(q)
    );
  });

  return (
    <section
      id="schedule"
      className="py-24 relative overflow-hidden bg-transparent"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#8a1426]/12 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.28em] text-[#f3c57a] font-semibold">
              OFFICIAL TIMETABLE & VENUES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-white tracking-wide uppercase">
              Fest Schedule
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 max-w-xl font-light leading-relaxed">
              Coordinated timeline across IB Auditorium, Conference Hall, TOK Room, and Rock Garden for November 06–07, 2026.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => setScheduleImageModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#f3c57a] text-xs font-semibold border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>Official Graphic</span>
            </button>
            <a
              href="/assets/aistudio/image_f430b7d1.png"
              download="Zenitra_2026_Official_Schedule.png"
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </a>
          </div>
        </div>

        {/* Filters Bar: Day 1 / Day 2 Tabs + Search (Frosted glass container) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-black/40 border border-white/10 backdrop-blur-md p-2 rounded-2xl shadow-xl">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveDay(1)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                activeDay === 1
                  ? 'bg-gradient-to-r from-[#8f1627] to-[#590b17] text-white shadow-lg border border-white/20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#f3c57a]" />
              <span>DAY 1 · NOV 06</span>
            </button>

            <button
              onClick={() => setActiveDay(2)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                activeDay === 2
                  ? 'bg-gradient-to-r from-[#8f1627] to-[#590b17] text-white shadow-lg border border-white/20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#f3c57a]" />
              <span>DAY 2 · NOV 07</span>
            </button>
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by event or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-black/50 text-xs text-white placeholder-neutral-500 rounded-xl border border-white/10 focus:outline-none focus:border-[#f3c57a]"
            />
          </div>
        </div>

        {/* Schedule Table (GWHMUN clean tabular aesthetic with frosted glassmorphism) */}
        <div className="bg-black/40 border border-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl shadow-black/80">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/60 border-b border-white/10 text-[11px] uppercase tracking-wider text-neutral-300 font-bold">
                  <th className="py-4 px-6">Time</th>
                  <th className="py-4 px-6">Event</th>
                  <th className="py-4 px-6">Venue</th>
                  <th className="py-4 px-6">Fee</th>
                  <th className="py-4 px-6 text-right">Prize Pool</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                {dayEvents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-neutral-500">
                      No events match your search term.
                    </td>
                  </tr>
                ) : (
                  dayEvents.map((event) => (
                    <tr
                      key={event.id}
                      className="hover:bg-white/[0.04] transition-colors group"
                    >
                      {/* Time */}
                      <td className="py-4 px-6 font-mono-num font-semibold text-[#f3c57a] whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#f3c57a]" />
                          <span>{event.time}</span>
                        </div>
                      </td>

                      {/* Event */}
                      <td className="py-4 px-6 font-serif-display font-bold text-white">
                        <span className="group-hover:text-[#f3c57a] transition-colors">{event.name}</span>
                      </td>

                      {/* Venue */}
                      <td className="py-4 px-6 text-neutral-300 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                          <span>{event.venue}</span>
                        </div>
                      </td>

                      {/* Fees */}
                      <td className="py-4 px-6 font-mono-num font-medium text-white whitespace-nowrap">
                        ₹{event.fee}
                      </td>

                      {/* Prizes */}
                      <td className="py-4 px-6 text-right font-mono-num text-xs whitespace-nowrap">
                        <span className="text-[#f3c57a] font-bold">1st: {event.prizes.first}</span>
                        {event.prizes.second && (
                          <span className="text-neutral-400 ml-2">2nd: {event.prizes.second}</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Schedule graphic preview snippet */}
        <div className="mt-8 bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#f3c57a] shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="font-serif-display font-semibold text-white text-sm">Official Schedule Broadcaster</p>
              <p className="text-xs text-neutral-400 font-light">Directly issued by Christ Junior College - Residential CAS Committee.</p>
            </div>
          </div>
          <button
            onClick={() => setScheduleImageModalOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#f3c57a] text-xs font-bold border border-white/15 transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            <span>Open High-Res Schedule Poster</span>
          </button>
        </div>

      </div>

      {/* Fullscreen Schedule Image Modal */}
      {scheduleImageModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setScheduleImageModalOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#100103]/95 rounded-3xl overflow-hidden border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/50">
              <div className="flex items-center gap-2">
                <span className="font-serif-display font-bold text-lg text-white">Zenitra '26</span>
                <span className="text-xs text-neutral-400">· Official Schedule</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/assets/aistudio/image_f430b7d1.png"
                  download="Zenitra_Schedule.png"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#f3c57a] text-xs font-medium flex items-center gap-1 border border-white/10"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  onClick={() => setScheduleImageModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="max-h-[80vh] overflow-y-auto p-4 flex justify-center bg-black">
              <img
                src="/assets/aistudio/image_f430b7d1.png"
                alt="Zenitra Schedule Large"
                className="max-h-[72vh] w-auto rounded-lg shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
