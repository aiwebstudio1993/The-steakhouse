import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Sparkles, Check, Download, Search, AlertCircle, ShieldCheck } from 'lucide-react';
import { Reservation } from '../types';

export const ReservationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'book' | 'lookup'>('book');

  // Booking Form State
  const [guests, setGuests] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string>('19:30');
  const [seatingArea, setSeatingArea] = useState<'hearth' | 'ember-counter' | 'cellar-vault' | 'terrace'>('hearth');
  const [guestName, setGuestName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('Date Night');
  const [meatPreference, setMeatPreference] = useState<string>('Dry-Aged Ribeye');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  
  // Confirmation State
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [simulatedNotification, setSimulatedNotification] = useState<string | null>(null);

  // Existing Reservations Store (Mock memory store for demo & lookup)
  const [savedReservations, setSavedReservations] = useState<Reservation[]>([
    {
      id: 'STK-8492',
      guestName: 'Jonathan Thorne',
      email: 'j.thorne@example.com',
      phone: '+1 (555) 234-5678',
      date: '2026-10-15',
      time: '20:00',
      guests: 4,
      seatingArea: 'cellar-vault',
      occasion: 'Anniversary',
      meatPreference: 'Tomahawk & A5 Wagyu',
      specialRequests: 'Sommelier cellar pairing requested.',
      status: 'confirmed',
      createdAt: '2026-10-08',
    },
  ]);

  // Lookup State
  const [lookupCode, setLookupCode] = useState<string>('');
  const [foundReservation, setFoundReservation] = useState<Reservation | null | undefined>(undefined);

  const availableTimeSlots = [
    { time: '17:00', label: '5:00 PM', available: true },
    { time: '17:30', label: '5:30 PM', available: true },
    { time: '18:00', label: '6:00 PM', available: true },
    { time: '18:30', label: '6:30 PM', available: false },
    { time: '19:00', label: '7:00 PM', available: true },
    { time: '19:30', label: '7:30 PM', available: true },
    { time: '20:00', label: '8:00 PM', available: true },
    { time: '20:30', label: '8:30 PM', available: false },
    { time: '21:00', label: '9:00 PM', available: true },
    { time: '21:30', label: '9:30 PM', available: true },
  ];

  const seatingOptions = [
    {
      id: 'hearth',
      name: 'The Hearth Room',
      desc: 'Central dining room surrounded by live white oak flames and warm ambient candlelight.',
    },
    {
      id: 'ember-counter',
      name: "Ember Chef's Counter",
      desc: 'Interactive 8-seat stone counter directly in front of the 1,200°F binchotan hearth.',
    },
    {
      id: 'cellar-vault',
      name: 'The Cellar Vault',
      desc: 'Intimate leather booth encased within our two-story curated glass wine cellar.',
    },
    {
      id: 'terrace',
      name: 'Garden Hearth Terrace',
      desc: 'Enclosed, heated courtyard with private stone firepits and garden greenery.',
    },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !email || !phone) return;

    const newCode = `STK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReservation: Reservation = {
      id: newCode,
      guestName,
      email,
      phone,
      date: selectedDate,
      time: selectedTime,
      guests,
      seatingArea,
      occasion,
      meatPreference,
      specialRequests,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setSavedReservations((prev) => [newReservation, ...prev]);
    setConfirmedReservation(newReservation);
    setSimulatedNotification(`Instant SMS & Email confirmed to ${email} and ${phone}`);
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const query = lookupCode.trim().toUpperCase();
    const match = savedReservations.find(
      (r) => r.id.toUpperCase() === query || r.phone.includes(query) || r.email.toLowerCase() === query.toLowerCase()
    );
    setFoundReservation(match || null);
  };

  const downloadIcsCalendar = (reservation: Reservation) => {
    const formattedDate = reservation.date.replace(/-/g, '');
    const startTimeStr = reservation.time.replace(':', '') + '00';
    const endTimeHours = (parseInt(reservation.time.split(':')[0], 10) + 2).toString().padStart(2, '0');
    const endTimeStr = endTimeHours + reservation.time.split(':')[1] + '00';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//The Steakhouse//Reservation//EN',
      'BEGIN:VEVENT',
      `UID:${reservation.id}@thesteakhouse.com`,
      `DTSTAMP:${formattedDate}T${startTimeStr}Z`,
      `DTSTART:${formattedDate}T${startTimeStr}`,
      `DTEND:${formattedDate}T${endTimeStr}`,
      `SUMMARY:Dinner at The Steakhouse (${reservation.guests} Guests)`,
      `DESCRIPTION:Reservation Reference: ${reservation.id}\\nArea: ${reservation.seatingArea}\\nOccasion: ${reservation.occasion}\\nAddress: 412 Artisan Hearth Way, Meatpacking District, NY`,
      'LOCATION:412 Artisan Hearth Way, Meatpacking District, NY 10014',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `TheSteakhouse-${reservation.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="reservations" className="py-24 bg-[#0e0e12] relative overflow-hidden border-t border-[#1f1f26]">
      {/* Background glow subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-950/10 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
            Table Reservations
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#f3f0ea] mt-2 mb-4 tracking-[0.08em]">
            Reserve Your Experience
          </h2>
          <p className="text-sm text-[#9c9a96] leading-relaxed">
            Due to our 45-day Himalayan salt aging cycle and limited nightly woodfire hearth seatings, we encourage reservations up to 30 days in advance.
          </p>

          {/* Mode Switcher */}
          <div className="inline-flex p-1 bg-[#16161c] border border-[#262630] rounded mt-6">
            <button
              onClick={() => setActiveTab('book')}
              className={`px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-colors rounded ${
                activeTab === 'book'
                  ? 'bg-[#d4af37] text-[#0b0b0d] shadow-sm'
                  : 'text-[#a09e9a] hover:text-[#f3f0ea]'
              }`}
            >
              New Reservation
            </button>
            <button
              onClick={() => setActiveTab('lookup')}
              className={`px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-colors rounded ${
                activeTab === 'lookup'
                  ? 'bg-[#d4af37] text-[#0b0b0d] shadow-sm'
                  : 'text-[#a09e9a] hover:text-[#f3f0ea]'
              }`}
            >
              Find / Manage Reservation
            </button>
          </div>
        </div>

        {/* Tab 1: New Reservation Flow */}
        {activeTab === 'book' && (
          <div>
            {!confirmedReservation ? (
              <form
                onSubmit={handleBookingSubmit}
                className="bg-[#121217] border border-[#24242e] rounded-lg p-6 sm:p-10 shadow-2xl backdrop-blur-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Left Column: Dining Details */}
                  <div className="space-y-6">
                    <h3 className="font-serif-luxury text-lg text-[#e8e6e3] tracking-wider border-b border-[#24242e] pb-3">
                      1. Party & Schedule
                    </h3>

                    {/* Guests selection */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#999] mb-2 font-medium">
                        Number of Guests
                      </label>
                      <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((num, idx) => {
                          const val = typeof num === 'number' ? num : 10;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setGuests(val)}
                              className={`py-2 text-xs font-semibold rounded border transition-colors ${
                                guests === val
                                  ? 'bg-[#d4af37] text-[#0b0b0d] border-[#d4af37]'
                                  : 'bg-[#181820] text-[#c4c2be] border-[#292936] hover:border-[#444454]'
                              }`}
                            >
                              {num}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Date picker */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#999] mb-2 font-medium">
                        Reservation Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={selectedDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full bg-[#181820] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3 py-2.5 focus:outline-none focus:border-[#d4af37]"
                          required
                        />
                      </div>
                    </div>

                    {/* Time slots */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#999] mb-2 font-medium">
                        Select Sitting Time
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {availableTimeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={!slot.available}
                            onClick={() => setSelectedTime(slot.time)}
                            className={`py-2 px-1 text-xs font-medium rounded border transition-all ${
                              !slot.available
                                ? 'bg-[#14141a]/50 text-[#555] border-[#1e1e26] cursor-not-allowed line-through'
                                : selectedTime === slot.time
                                ? 'bg-[#d4af37] text-[#0b0b0d] border-[#d4af37] font-semibold'
                                : 'bg-[#181820] text-[#c4c2be] border-[#292936] hover:border-[#444454]'
                            }`}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-[11px] text-[#6e6c68] mt-1.5 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#d4af37]" />
                        Seating duration is reserved for 2 hours.
                      </p>
                    </div>

                    {/* Seating Area Selection */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#999] mb-2 font-medium">
                        Atmosphere & Seating Area
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {seatingOptions.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSeatingArea(opt.id as any)}
                            className={`p-3 rounded border text-left transition-colors flex flex-col justify-between ${
                              seatingArea === opt.id
                                ? 'bg-[#1e1c18] border-[#d4af37]'
                                : 'bg-[#181820] border-[#292936] hover:border-[#383846]'
                            }`}
                          >
                            <span
                              className={`text-xs font-semibold ${
                                seatingArea === opt.id ? 'text-[#d4af37]' : 'text-[#e8e6e3]'
                              }`}
                            >
                              {opt.name}
                            </span>
                            <span className="text-[11px] text-[#888] mt-1 leading-snug">{opt.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Guest Information */}
                  <div className="space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <h3 className="font-serif-luxury text-lg text-[#e8e6e3] tracking-wider border-b border-[#24242e] pb-3">
                        2. Guest Details
                      </h3>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#999] mb-1 font-medium">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="e.g. Lord Alexander Wright"
                          className="w-full bg-[#181820] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#999] mb-1 font-medium">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@domain.com"
                            className="w-full bg-[#181820] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#999] mb-1 font-medium">
                            Mobile Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (212) 555-0199"
                            className="w-full bg-[#181820] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#999] mb-1 font-medium">
                            Occasion
                          </label>
                          <select
                            value={occasion}
                            onChange={(e) => setOccasion(e.target.value)}
                            className="w-full bg-[#181820] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                          >
                            <option>Date Night / Romantic</option>
                            <option>Anniversary Celebration</option>
                            <option>Birthday</option>
                            <option>Executive Business Dinner</option>
                            <option>Casual Epicurean Evening</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#999] mb-1 font-medium">
                            Target Cut Preference
                          </label>
                          <select
                            value={meatPreference}
                            onChange={(e) => setMeatPreference(e.target.value)}
                            className="w-full bg-[#181820] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                          >
                            <option>45-Day Dry-Aged Ribeye</option>
                            <option>Live-Fire Tomahawk (38oz)</option>
                            <option>A5 Miyazaki Japanese Wagyu</option>
                            <option>60-Day Salt-Vault Porterhouse</option>
                            <option>Chef's Choice / Sommelier Tasting</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#999] mb-1 font-medium">
                          Dietary Allergies & Special Notes
                        </label>
                        <textarea
                          rows={2}
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          placeholder="Please note any allergies, quiet table requests, or wine cellar pairing interests..."
                          className="w-full bg-[#181820] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                    </div>

                    {/* Booking Policies & Submit Button */}
                    <div className="pt-4 border-t border-[#24242e] space-y-3">
                      <div className="flex items-start gap-2 text-xs text-[#7e7c78]">
                        <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>
                          No deposit required. Cancellations accepted up to 6 hours prior to service. Complimentary valet parking included.
                        </span>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 bg-[#d4af37] hover:bg-[#e5be49] active:bg-[#c59b27] text-[#0b0b0d] font-bold text-xs uppercase tracking-[0.18em] rounded transition-all duration-200 shadow-lg cursor-pointer"
                      >
                        Confirm & Secure Reservation
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              /* Confirmation Screen */
              <div className="max-w-2xl mx-auto bg-[#141419] border border-[#30303c] rounded-lg p-8 sm:p-12 text-center shadow-2xl relative">
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto mb-6 text-[#d4af37]">
                  <Check className="w-8 h-8" />
                </div>

                <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
                  Reservation Confirmed
                </span>
                <h3 className="font-serif-luxury text-3xl text-[#f5f2eb] mt-1 mb-2">
                  Welcome to The Steakhouse
                </h3>
                <p className="text-sm text-[#a19f9b] mb-6">
                  Your table has been reserved for <strong className="text-white">{confirmedReservation.guestName}</strong>.
                </p>

                {/* Details Summary Card */}
                <div className="bg-[#1b1b22] border border-[#282834] rounded-lg p-5 text-left text-xs space-y-2.5 mb-6">
                  <div className="flex justify-between py-1 border-b border-[#252530]">
                    <span className="text-[#888]">Reservation Reference:</span>
                    <span className="font-mono text-[#d4af37] font-bold text-sm tracking-wider">
                      {confirmedReservation.id}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#252530]">
                    <span className="text-[#888]">Date & Sitting:</span>
                    <span className="text-[#e8e6e3] font-medium">
                      {confirmedReservation.date} at {confirmedReservation.time}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#252530]">
                    <span className="text-[#888]">Party Size:</span>
                    <span className="text-[#e8e6e3] font-medium">{confirmedReservation.guests} Guests</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#252530]">
                    <span className="text-[#888]">Dining Area:</span>
                    <span className="text-[#e8e6e3] capitalize font-medium">
                      {confirmedReservation.seatingArea.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#888]">Occasion / Cut:</span>
                    <span className="text-[#e8e6e3] font-medium">
                      {confirmedReservation.occasion} · {confirmedReservation.meatPreference}
                    </span>
                  </div>
                </div>

                {simulatedNotification && (
                  <div className="bg-[#1b261b] border border-[#2f4f2f] text-emerald-300 text-xs py-2 px-3 rounded mb-6 text-center">
                    {simulatedNotification}
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => downloadIcsCalendar(confirmedReservation)}
                    className="px-5 py-2.5 bg-[#252530] hover:bg-[#323242] text-[#e8e6e3] text-xs font-semibold tracking-wider uppercase rounded transition-colors flex items-center justify-center gap-2 border border-[#383848] cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Add to Calendar (.ics)</span>
                  </button>
                  <button
                    onClick={() => setConfirmedReservation(null)}
                    className="px-5 py-2.5 bg-[#d4af37] hover:bg-[#e5be49] text-[#0b0b0d] text-xs font-semibold tracking-wider uppercase rounded transition-colors cursor-pointer"
                  >
                    Make Another Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Lookup Existing Reservation */}
        {activeTab === 'lookup' && (
          <div className="max-w-xl mx-auto bg-[#121217] border border-[#24242e] rounded-lg p-6 sm:p-10 shadow-2xl">
            <h3 className="font-serif-luxury text-xl text-[#f3f0ea] mb-2 tracking-wide text-center">
              Find Existing Reservation
            </h3>
            <p className="text-xs text-[#999] text-center mb-6">
              Enter your booking reference code (e.g., <code className="text-[#d4af37]">STK-8492</code>), phone number, or email.
            </p>

            <form onSubmit={handleLookup} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={lookupCode}
                  onChange={(e) => setLookupCode(e.target.value)}
                  placeholder="Booking ID or Phone..."
                  className="flex-1 bg-[#181820] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3 py-2.5 focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#d4af37] hover:bg-[#e5be49] text-[#0b0b0d] font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </form>

            {foundReservation === null && (
              <div className="mt-6 p-4 bg-[#231717] border border-[#4a2222] rounded text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>No reservation found matching "{lookupCode}". Please verify your reference code or call our host stand directly.</span>
              </div>
            )}

            {foundReservation && (
              <div className="mt-6 bg-[#181820] border border-[#292936] rounded p-5 space-y-3">
                <div className="flex justify-between items-center border-b border-[#252530] pb-2">
                  <span className="font-serif-luxury text-sm text-[#f3f0ea]">{foundReservation.guestName}</span>
                  <span className="text-[11px] font-mono text-[#d4af37] bg-[#22221b] border border-[#423d24] px-2 py-0.5 rounded">
                    {foundReservation.id}
                  </span>
                </div>
                <div className="text-xs text-[#bbb] space-y-1">
                  <p>Date: <strong className="text-white">{foundReservation.date}</strong> at <strong className="text-white">{foundReservation.time}</strong></p>
                  <p>Party Size: {foundReservation.guests} Guests ({foundReservation.seatingArea.replace('-', ' ')})</p>
                  <p>Contact: {foundReservation.email} · {foundReservation.phone}</p>
                  {foundReservation.specialRequests && (
                    <p className="text-[#888] italic">Note: "{foundReservation.specialRequests}"</p>
                  )}
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => downloadIcsCalendar(foundReservation)}
                    className="flex-1 py-2 text-xs bg-[#242430] hover:bg-[#303040] text-[#e8e6e3] rounded border border-[#353545] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Download Calendar</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Cancel this reservation? Our team will release the table.')) {
                        setSavedReservations((prev) => prev.filter((r) => r.id !== foundReservation.id));
                        setFoundReservation(null);
                        alert('Reservation cancelled.');
                      }
                    }}
                    className="px-3 py-2 text-xs bg-red-950/40 hover:bg-red-900/60 text-red-300 rounded border border-red-800/40 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
