import React, { useState } from 'react';
import { Mail, Check, Instagram, Facebook } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-[#08080a] text-[#8e8c88] border-t border-[#181820] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#181820]">
          {/* Brand & Ethos (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#f3f0ea] font-bold tracking-[0.2em] uppercase">
              THE STEAKHOUSE
            </h3>
            <p className="text-xs text-[#9d9b96] leading-relaxed max-w-sm">
              An unwavering dedication to heritage livestock, 45-day Himalayan salt dry-aging, and 1,200°F live-fire hearth alchemy in Manhattan's historic Meatpacking District.
            </p>
            <div className="text-xs text-[#777] space-y-1">
              <p>{RESTAURANT_INFO.address}</p>
              <p>{RESTAURANT_INFO.phone} · {RESTAURANT_INFO.email}</p>
            </div>
          </div>

          {/* Service Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
              Hours of Service
            </h4>
            <div className="text-xs text-[#999] space-y-2">
              <div>
                <span className="block text-white font-medium">Main Hearth Dining</span>
                <span>{RESTAURANT_INFO.hours.dinner}</span>
              </div>
              <div>
                <span className="block text-white font-medium">Ember Chef Counter</span>
                <span>{RESTAURANT_INFO.hours.emberCounter}</span>
              </div>
              <div>
                <span className="block text-white font-medium">The Cellar Vault Bar</span>
                <span>{RESTAURANT_INFO.hours.cellarBar}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
              Navigation
            </h4>
            <ul className="text-xs space-y-2">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Digital Menu
                </a>
              </li>
              <li>
                <a href="#reservations" className="hover:text-white transition-colors">
                  Online Reservations
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-white transition-colors">
                  Signature Preparation Methods
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  Critic Reviews & Testimonials
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  Interactive Map & Valet
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Private Events & Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Dispatch / Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
              Cellar & Dry-Age Dispatch
            </h4>
            <p className="text-xs text-[#888] leading-relaxed">
              Receive private allocations of rare 60-day dry-aged cuts and sommelier vintage cellar releases.
            </p>

            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="epicure@domain.com"
                  className="w-full bg-[#121217] border border-[#262634] rounded px-3 py-2 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#1c1c24] hover:bg-[#252530] text-[#d4af37] border border-[#303040] rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Enrolled in Dispatch</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-3.5 h-3.5" />
                    <span>Join Private List</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#666] gap-4">
          <p>© {new Date().getFullYear()} The Steakhouse Hospitality Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#aaa] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#aaa] transition-colors">Terms of Hospitality</a>
            <a href="#" className="hover:text-[#aaa] transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
