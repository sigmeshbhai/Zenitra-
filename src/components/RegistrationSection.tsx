import React, { useState } from 'react';
import {
  ZENITRA_EVENTS,
  validateRegistration,
  calculateTotalFee,
  generateRegistrationTicketId,
  RegistrationInput
} from '../utils/registration.ts';
import {
  Sparkles,
  QrCode,
  FileCheck2,
  Download,
  Building,
  User,
  Mail,
  Phone,
  CheckCircle,
  Printer,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface RegistrationSectionProps {
  preSelectedEventId?: string | null;
  onClearPreSelectedEvent?: () => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  preSelectedEventId,
  onClearPreSelectedEvent
}) => {
  const [regMode, setRegMode] = useState<'form' | 'qr'>('form');
  const [regType, setRegType] = useState<'individual' | 'delegation'>('individual');
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [school, setSchool] = useState('');
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>(
    preSelectedEventId ? [preSelectedEventId] : ['vox-nova']
  );
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Submission State
  const [submittedTicket, setSubmittedTicket] = useState<{
    ticketId: string;
    name: string;
    school: string;
    type: 'individual' | 'delegation';
    events: string[];
    total: number;
    timestamp: string;
  } | null>(null);

  // Sync if preSelectedEventId changes
  React.useEffect(() => {
    if (preSelectedEventId && !selectedEventIds.includes(preSelectedEventId)) {
      setSelectedEventIds((prev) => [...prev, preSelectedEventId]);
    }
  }, [preSelectedEventId]);

  const handleToggleEvent = (eventId: string) => {
    if (selectedEventIds.includes(eventId)) {
      setSelectedEventIds(selectedEventIds.filter((id) => id !== eventId));
    } else {
      setSelectedEventIds([...selectedEventIds, eventId]);
    }
  };

  const feeSummary = calculateTotalFee(selectedEventIds, regType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const inputData: RegistrationInput = {
      name,
      email,
      phone,
      school,
      selectedEventIds,
      type: regType,
      notes,
    };

    const validation = validateRegistration(inputData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const prefix = selectedEventIds.length > 0 ? selectedEventIds[0].slice(0, 3) : 'REG';
    const newTicketId = generateRegistrationTicketId(prefix);

    const eventNames = selectedEventIds
      .map((id) => ZENITRA_EVENTS.find((e) => e.id === id)?.name || id);

    setSubmittedTicket({
      ticketId: newTicketId,
      name,
      school,
      type: regType,
      events: eventNames,
      total: feeSummary.total,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    });
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setName('');
    setEmail('');
    setPhone('');
    setSchool('');
    setSelectedEventIds(['vox-nova']);
    setNotes('');
    setErrors({});
    if (onClearPreSelectedEvent) {
      onClearPreSelectedEvent();
    }
  };

  const handlePrintPass = () => {
    window.print();
  };

  return (
    <section
      id="registration"
      className="py-24 relative overflow-hidden bg-transparent"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#8a1426]/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#f3c57a] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OFFICIAL REGISTRATION PORTAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-white tracking-wide uppercase">
            Register for Zenitra '26
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            Reserve your contingent slots for Christ Junior College - Residential's inter-school fest. Register online or scan the official QR code card.
          </p>

          {/* Mode Tabs */}
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl mt-4">
            <button
              onClick={() => setRegMode('form')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                regMode === 'form'
                  ? 'bg-gradient-to-r from-[#8f1627] to-[#590b17] text-white shadow-lg border border-white/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <FileCheck2 className="w-4 h-4 text-[#f3c57a]" />
              <span>Digital Application Form</span>
            </button>

            <button
              onClick={() => setRegMode('qr')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                regMode === 'qr'
                  ? 'bg-gradient-to-r from-[#8f1627] to-[#590b17] text-white shadow-lg border border-white/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <QrCode className="w-4 h-4 text-[#f3c57a]" />
              <span>Official QR Card (Zenitra'26)</span>
            </button>
          </div>
        </div>

        {/* Content Mode A: Digital Form OR Success Ticket */}
        {regMode === 'form' ? (
          submittedTicket ? (
            /* Ticket Confirmation View */
            <div className="max-w-2xl mx-auto bg-black/50 border border-white/20 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/90 relative overflow-hidden animate-in zoom-in-95 duration-200">
              {/* Top status */}
              <div className="text-center space-y-2 pb-6 border-b border-white/10">
                <div className="w-14 h-14 mx-auto rounded-full bg-white/5 border border-[#f3c57a] flex items-center justify-center text-[#f3c57a] mb-2 shadow-lg shadow-[#8a1426]/30">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif-display font-bold text-white">
                  Registration Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light">
                  Your contingent admission pass has been generated. Please keep this digital receipt for campus gate entry.
                </p>
              </div>

              {/* Pass Card Details */}
              <div className="py-6 space-y-5">
                <div className="bg-black/70 border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <span className="text-[10px] uppercase font-mono-num text-neutral-500 block">Pass Reference</span>
                      <span className="font-mono-num font-bold text-lg text-[#f3c57a] tracking-wider">{submittedTicket.ticketId}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-mono-num text-neutral-500 block">Category</span>
                      <span className="text-xs uppercase font-semibold text-white bg-white/5 px-2.5 py-1 rounded border border-white/10">
                        {submittedTicket.type}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-neutral-500 block">Delegate / Team Head</span>
                      <span className="font-semibold text-white text-sm">{submittedTicket.name}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Representing Institution</span>
                      <span className="font-semibold text-white text-sm">{submittedTicket.school}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Fest Commencing</span>
                      <span className="font-semibold text-white">Nov 06, 2026 · 09:00 AM IST</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Total Registered Fee</span>
                      <span className="font-mono-num font-bold text-[#f3c57a] text-sm">₹{submittedTicket.total}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <span className="text-[11px] text-neutral-500 block mb-1.5 font-medium">Enrolled Events:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {submittedTicket.events.map((ev, i) => (
                        <span key={i} className="text-xs bg-white/5 text-neutral-200 px-2.5 py-1 rounded-lg border border-white/10">
                          {ev}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 text-xs text-neutral-300">
                  <ShieldCheck className="w-5 h-5 text-[#f3c57a] shrink-0" />
                  <span>A copy of your registration credential has been logged with the CJCIB CAS Secretariat. Present this reference code at the registration desk for delegate kits.</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handlePrintPass}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#8f1627] to-[#590b17] hover:from-[#aa1c31] hover:to-[#730f20] text-white text-xs font-semibold border border-white/20 flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4 text-[#ffe2b8]" />
                  <span>Print Admission Pass</span>
                </button>

                <button
                  onClick={handleReset}
                  className="py-3 px-5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium border border-white/10 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>New Registration</span>
                </button>
              </div>
            </div>
          ) : (
            /* Digital Form */
            <form
              onSubmit={handleSubmit}
              className="bg-black/40 border border-white/15 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/80 space-y-8"
              noValidate
            >
              {/* Step 1: Type Selection */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#f3c57a] font-bold mb-3">
                  01. Registration Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRegType('individual')}
                    className={`p-4 rounded-2xl text-left border transition-all flex items-start gap-3.5 ${
                      regType === 'individual'
                        ? 'bg-black/70 border-[#f3c57a] shadow-lg'
                        : 'bg-black/40 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <User className="w-5 h-5 text-[#f3c57a] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-serif-display font-bold text-white text-sm block">Individual Delegate</span>
                      <span className="text-xs text-neutral-400 font-light">Solo entry for specific events (Cosplay, Art, Dance Battle)</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegType('delegation')}
                    className={`p-4 rounded-2xl text-left border transition-all flex items-start gap-3.5 ${
                      regType === 'delegation'
                        ? 'bg-black/70 border-[#f3c57a] shadow-lg'
                        : 'bg-black/40 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Building className="w-5 h-5 text-[#f3c57a] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-serif-display font-bold text-white text-sm block">School Delegation / Contingent</span>
                      <span className="text-xs text-neutral-400 font-light">Official contingent with multiple teams (10% discount on 4+ events)</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 2: Delegate Info */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#f3c57a] font-bold mb-3">
                  02. Delegate & Institution Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-300 mb-1.5 font-medium">
                      {regType === 'individual' ? 'Full Name of Delegate' : 'Contingent Head / Faculty Advisor'} *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Aarav Sharma"
                        className={`w-full pl-10 pr-4 py-2.5 bg-black/60 text-sm text-white placeholder-neutral-500 rounded-xl border ${
                          errors.name ? 'border-red-500' : 'border-white/10'
                        } focus:outline-none focus:border-[#f3c57a]`}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 mb-1.5 font-medium">
                      School / Junior College Name *
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        placeholder="e.g. Greenwood High / National Public School"
                        className={`w-full pl-10 pr-4 py-2.5 bg-black/60 text-sm text-white placeholder-neutral-500 rounded-xl border ${
                          errors.school ? 'border-red-500' : 'border-white/10'
                        } focus:outline-none focus:border-[#f3c57a]`}
                      />
                    </div>
                    {errors.school && <p className="text-xs text-red-400 mt-1">{errors.school}</p>}
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 mb-1.5 font-medium">
                      Official Contact Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@school.edu or personal@gmail.com"
                        className={`w-full pl-10 pr-4 py-2.5 bg-black/60 text-sm text-white placeholder-neutral-500 rounded-xl border ${
                          errors.email ? 'border-red-500' : 'border-white/10'
                        } focus:outline-none focus:border-[#f3c57a]`}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 mb-1.5 font-medium">
                      Phone Number (WhatsApp for updates) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className={`w-full pl-10 pr-4 py-2.5 bg-black/60 text-sm text-white placeholder-neutral-500 rounded-xl border ${
                          errors.phone ? 'border-red-500' : 'border-white/10'
                        } focus:outline-none focus:border-[#f3c57a]`}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Step 3: Event Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs uppercase tracking-widest text-[#f3c57a] font-bold">
                    03. Select Committees & Events *
                  </label>
                  <span className="text-xs text-neutral-400">
                    {selectedEventIds.length} event{selectedEventIds.length === 1 ? '' : 's'} selected
                  </span>
                </div>

                {errors.selectedEventIds && (
                  <p className="text-xs text-red-400 mb-2">{errors.selectedEventIds}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3.5">
                  {ZENITRA_EVENTS.map((event) => {
                    const isChecked = selectedEventIds.includes(event.id);
                    return (
                      <div
                        key={event.id}
                        onClick={() => handleToggleEvent(event.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                          isChecked
                            ? 'bg-black/80 border-[#f3c57a] shadow-lg'
                            : 'bg-black/40 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleEvent(event.id)}
                          className="mt-1 accent-[#8f1627] rounded cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-serif-display font-bold text-sm text-white truncate">
                              {event.name}
                            </span>
                            <span className="font-mono-num text-xs font-semibold text-[#f3c57a] shrink-0">
                              ₹{event.fee}
                            </span>
                          </div>
                          <div className="text-[11px] text-neutral-400 flex items-center gap-2 mt-1 font-light">
                            <span>Day {event.day} · {event.time}</span>
                            <span className="text-neutral-600">·</span>
                            <span>{event.venue}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Special Logistics or Notes */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#f3c57a] font-bold mb-2">
                  04. Contingent Notes or Inquiries (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mention instrument load-in requirements, team size breakdown, or dietary notes..."
                  className="w-full p-3.5 bg-black/60 text-xs text-white placeholder-neutral-500 rounded-xl border border-white/10 focus:outline-none focus:border-[#f3c57a]"
                />
              </div>

              {/* Step 5: Summary & Payment Fee Bar */}
              <div className="bg-black/60 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-300">
                  <span>Subtotal ({selectedEventIds.length} events)</span>
                  <span className="font-mono-num font-semibold text-white">₹{feeSummary.subtotal}</span>
                </div>

                {feeSummary.discount > 0 && (
                  <div className="flex items-center justify-between text-xs text-emerald-400">
                    <span>Delegation Volume Discount (10% off for 4+ events)</span>
                    <span className="font-mono-num font-semibold">-₹{feeSummary.discount}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-neutral-200 font-bold block">
                      Total Payable Fee
                    </span>
                    <span className="text-[10px] text-neutral-500">Payable via UPI or cash at CJCIB desk</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-num font-bold text-2xl text-[#f3c57a]">
                      ₹{feeSummary.total}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#941729] via-[#751120] to-[#540c17] hover:from-[#aa1d33] hover:to-[#690f1d] text-white font-semibold text-base shadow-xl shadow-[#751120]/40 border border-white/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-5 h-5 text-[#ffe2b8]" />
                <span>Submit Application & Generate Entry Pass</span>
              </button>
            </form>
          )
        ) : (
          /* Content Mode B: Scan QR Card with Authentic User Asset */
          <div className="max-w-xl mx-auto bg-black/40 border border-white/15 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/80 space-y-6 text-center">
            <div className="space-y-2">
              <span className="text-xs font-mono-num uppercase tracking-wider text-[#f3c57a] bg-white/5 px-3 py-1 rounded-full border border-white/10">
                SCAN & REGISTER ON MOBILE
              </span>
              <h3 className="text-2xl font-serif-display font-bold text-white">
                Official Zenitra '26 QR Code
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light">
                Point your smartphone camera or UPI app at the official registration card below to open the mobile signup form or complete instant contingent registration.
              </p>
            </div>

            {/* Displaying authentic asset from prompt: /assets/aistudio/image_6e599558.png */}
            <div className="relative group max-w-xs mx-auto rounded-2xl overflow-hidden border border-white/15 bg-black/80 p-3 shadow-xl">
              <img
                src="/assets/aistudio/image_6e599558.png"
                alt="Official Zenitra '26 QR Code Card for Registration"
                className="w-full h-auto rounded-xl mx-auto transform group-hover:scale-[1.02] transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="mt-3 text-xs text-[#f3c57a] font-mono-num font-semibold">
                ZENITRA '26 VERIFIED CODE
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs text-neutral-300 max-w-sm mx-auto font-light">
              <p>
                Having trouble scanning? You can also use our instant digital application form or email your delegation list directly to <strong className="text-white font-medium">zenitra@cjcib.in</strong>.
              </p>
              <div className="flex justify-center gap-3">
                <a
                  href="/assets/aistudio/image_6e599558.png"
                  download="Zenitra_26_Registration_QR.png"
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#f3c57a] font-medium border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Save QR Card</span>
                </a>
                <button
                  onClick={() => setRegMode('form')}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8f1627] to-[#590b17] text-white font-semibold transition-colors flex items-center gap-1.5 border border-white/10"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Fill Form Instead</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
