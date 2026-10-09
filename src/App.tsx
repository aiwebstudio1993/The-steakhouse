/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ReservationSection } from './components/ReservationSection';
import { MenuSection } from './components/MenuSection';
import { PreparationMethods } from './components/PreparationMethods';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InteractiveMap } from './components/InteractiveMap';
import { SocialFeedSection } from './components/SocialFeedSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Calendar } from 'lucide-react';

export default function App() {
  const [showStickyBooking, setShowStickyBooking] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show mobile sticky booking after scrolling past hero (approx 500px)
      setShowStickyBooking(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToReservations = () => {
    const el = document.getElementById('reservations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-[#e8e6e3] selection:bg-[#d4af37]/30 selection:text-amber-200">
      {/* Strict 3-zone Header */}
      <Navbar onOpenReservation={scrollToReservations} />

      {/* Hero Section: High-Resolution Video of Steak Getting Cut, Minimal text only heading on first page */}
      <main>
        <Hero />

        {/* Online Reservation System */}
        <ReservationSection />

        {/* Digital Menu */}
        <MenuSection />

        {/* Chef's Signature Preparation Methods */}
        <PreparationMethods />

        {/* Photo Gallery */}
        <GallerySection />

        {/* Testimonials & Critics */}
        <TestimonialsSection />

        {/* Interactive Map & Navigation */}
        <InteractiveMap />

        {/* Integrated Social Media Culinary Feeds */}
        <SocialFeedSection />

        {/* Inquiries & Private Dining Contact */}
        <ContactSection />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Discreet Mobile Floating Booking Bar (Within <15% viewport height cap) */}
      {showStickyBooking && (
        <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
          <button
            onClick={scrollToReservations}
            className="w-full py-3 bg-[#d4af37] text-[#0b0b0d] font-bold text-xs uppercase tracking-[0.18em] rounded-lg shadow-2xl flex items-center justify-center gap-2 border border-amber-300/30 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve Table Online</span>
          </button>
        </div>
      )}
    </div>
  );
}
