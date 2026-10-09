import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const ContactSection: React.FC = () => {
  const [inquiryType, setInquiryType] = useState('Private Dining & Vault Buyout');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('12-24 Guests');
  const [targetDate, setTargetDate] = useState('');
  const [message, setMessage] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What is the dress code at The Steakhouse?',
      a: 'We adhere to a Smart Elegant standard. Collared shirts or jackets are encouraged for gentlemen; tailored evening wear for ladies. Athletic attire, beach sandals, and distressed caps are prohibited in dining rooms.',
    },
    {
      q: 'What is your corkage and private cellar policy?',
      a: 'Guests may bring up to two 750ml bottles per party not currently represented on our cellar list ($85 corkage per bottle). For private vault buyouts, sommelier curation is included.',
    },
    {
      q: 'Is valet parking provided?',
      a: 'Yes. Complimentary white-glove valet service is available along our 4th Avenue portico from 4:30 PM until close for all confirmed dining reservations.',
    },
    {
      q: 'Can dietary preferences and allergies be accommodated?',
      a: 'Absolutely. While our focus is prime dry-aged heritage beef, our kitchen provides dedicated gluten-free preparations, dairy-free arrosé techniques, and seasonal roasted hearth vegetables.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const ref = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(ref);
  };

  return (
    <section id="contact" className="py-24 bg-[#0e0e12] text-[#e8e6e3] relative border-t border-[#1a1a22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
            Concierge & Events
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#f3f0ea] mt-2 mb-4 tracking-[0.06em]">
            Private Dining & Inquiries
          </h2>
          <p className="text-sm text-[#9c9a96] leading-relaxed">
            For private wine cellar buyouts, bespoke dry-aging tastings, executive corporate events, or hospitality inquiries, connect with our concierge team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#121217] border border-[#24242e] rounded-xl p-6 sm:p-10 shadow-2xl">
            {submittedRef ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950/50 border border-emerald-500/60 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-2xl text-[#f3f0ea]">
                  Inquiry Transmitted
                </h3>
                <p className="text-xs text-[#a09e9a] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>. Our Private Dining Director has received your request under reference code <strong className="text-[#d4af37] font-mono">{submittedRef}</strong> and will follow up within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmittedRef(null);
                      setMessage('');
                    }}
                    className="px-6 py-2.5 bg-[#20202a] hover:bg-[#2c2c3a] text-xs font-semibold uppercase tracking-wider rounded text-white transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#999] mb-1.5 font-medium">
                    Nature of Inquiry *
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-[#181820] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3.5 py-2.5 focus:outline-none focus:border-[#d4af37]"
                  >
                    <option>Private Dining & Vault Buyout</option>
                    <option>Executive Corporate Dinner</option>
                    <option>Sommelier Cellar Tasting Masterclass</option>
                    <option>Press, Media & Production Filming</option>
                    <option>General Guest Hospitality Inquiry</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#999] mb-1 font-medium">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lord Alexander"
                      className="w-full bg-[#181820] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#999] mb-1 font-medium">
                      Corporate or Host Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alexander@domain.com"
                      className="w-full bg-[#181820] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#999] mb-1 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (212) 555-0199"
                      className="w-full bg-[#181820] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#999] mb-1 font-medium">
                      Estimated Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-[#181820] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                    >
                      <option>1–4 Guests</option>
                      <option>5–10 Guests</option>
                      <option>12–24 Guests (Cellar Vault)</option>
                      <option>30–75 Guests (Full Hearth Buyout)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#999] mb-1 font-medium">
                      Target Date
                    </label>
                    <input
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="w-full bg-[#181820] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#999] mb-1 font-medium">
                    Message & Event Vision *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details regarding preferred cuts, wine pairings, AV requirements, or bespoke requests..."
                    className="w-full bg-[#181820] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#d4af37] hover:bg-[#e5be49] text-[#0b0b0d] font-bold text-xs uppercase tracking-[0.2em] rounded transition-all duration-200 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Concierge</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & FAQs (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Coordinates Card */}
            <div className="bg-[#121217] border border-[#24242e] rounded-xl p-6 space-y-4">
              <h3 className="font-serif-luxury text-lg text-[#f3f0ea] border-b border-[#22222a] pb-3">
                Direct Contact
              </h3>

              <div className="space-y-3 text-xs text-[#b5b3ae]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Location</strong>
                    <span>{RESTAURANT_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Host Stand & Concierge</strong>
                    <span>{RESTAURANT_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Direct Inquiries</strong>
                    <span>{RESTAURANT_INFO.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dining Policies Accordion */}
            <div className="bg-[#121217] border border-[#24242e] rounded-xl p-6 space-y-3">
              <h4 className="font-serif-luxury text-base text-[#f3f0ea] mb-2">
                House Policies & Dining Etiquette
              </h4>

              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-[#22222c] rounded-lg overflow-hidden bg-[#16161d]">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full p-3 text-left text-xs font-semibold text-[#dedbd4] hover:text-[#d4af37] flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openFaq === index ? 'rotate-180 text-[#d4af37]' : ''
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="p-3 pt-0 text-xs text-[#9d9b96] leading-relaxed border-t border-[#202028]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
