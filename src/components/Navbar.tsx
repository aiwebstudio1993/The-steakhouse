import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, Calendar, Phone, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'Reservations', href: '#reservations' },
    { name: 'The Craft', href: '#craft' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[#0b0b0d]/95 backdrop-blur-md border-[#222228] py-3.5 shadow-xl shadow-black/40'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Title (Single text element wordmark in display face) */}
          <a
            href="#"
            className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#e8e6e3] hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0"
          >
            THE STEAKHOUSE
          </a>

          {/* Zone 2: 4–6 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs tracking-[0.15em] uppercase font-medium text-[#c4c2be]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenReservation}
              className="px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-semibold tracking-[0.12em] uppercase text-[#0b0b0d] bg-[#d4af37] hover:bg-[#e5be49] active:bg-[#c59b27] rounded transition-all duration-200 shadow-md shadow-amber-950/20 whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#e8e6e3] hover:text-[#d4af37] transition-colors rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-[#d4af37]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black/80 backdrop-blur-md flex flex-col justify-between pt-24 pb-8 px-6">
          <div className="space-y-6">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif-luxury text-xl tracking-[0.15em] text-[#e8e6e3] hover:text-[#d4af37] transition-colors py-2 border-b border-[#222228]"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3.5 text-center text-sm font-semibold tracking-[0.15em] uppercase text-[#0b0b0d] bg-[#d4af37] rounded transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table Online</span>
            </button>
          </div>

          <div className="pt-6 border-t border-[#222228] text-xs text-[#999] space-y-2">
            <div className="flex items-center gap-2 text-[#ccc]">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{RESTAURANT_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2 text-[#ccc]">
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{RESTAURANT_INFO.phone}</span>
            </div>
            <p className="text-[11px] text-[#777] pt-1">{RESTAURANT_INFO.hours.dinner}</p>
          </div>
        </div>
      )}
    </>
  );
};
