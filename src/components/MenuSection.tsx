import React, { useState } from 'react';
import { Sparkles, Wine, Flame, Info, Check, X } from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem, Currency } from '../types';

export const MenuSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cuts' | 'starters' | 'sauces' | 'sides' | 'cellar'>('cuts');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'gluten-free' | 'dairy-free' | 'chef-choice'>('all');
  const [activeDoneness, setActiveDoneness] = useState<number>(1); // 1 = Medium Rare
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);

  const currencyRates: Record<Currency, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1.0 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
  };

  const formatPrice = (usd: number) => {
    const { symbol, rate } = currencyRates[currency];
    const converted = Math.round(usd * rate);
    return `${symbol}${converted}`;
  };

  const categories = [
    { id: 'cuts', label: 'Prime Cuts & Dry-Aged' },
    { id: 'starters', label: 'Raw & Hearth Starters' },
    { id: 'sauces', label: 'Chef’s Sauces & Butters' },
    { id: 'sides', label: 'Artisanal Sides' },
    { id: 'cellar', label: 'Sommelier Cellar' },
    { id: 'all', label: 'Full Menu' },
  ];

  const donenessLevels = [
    {
      name: 'Blue Rare',
      temp: '115°F · 46°C',
      color: 'from-rose-950 via-rose-900 to-amber-950',
      description: 'Cool red center, soft velvet texture, seared briefly on screaming live embers.',
    },
    {
      name: 'Rare',
      temp: '125°F · 52°C',
      color: 'from-rose-800 via-rose-700 to-amber-900',
      description: 'Warm ruby red throughout, tender, maximum juiciness and natural beef fats.',
    },
    {
      name: 'Medium Rare',
      temp: '130°F · 54°C',
      badge: "Chef's Ideal",
      color: 'from-red-600 via-rose-600 to-amber-800',
      description: 'Warm pink center with ruby ring. Fat fully renders for supreme umami butteriness.',
    },
    {
      name: 'Medium',
      temp: '140°F · 60°C',
      color: 'from-pink-500 via-red-500 to-amber-700',
      description: 'Solid warm pink center, firm texture, caramelized caramelized exterior crust.',
    },
    {
      name: 'Medium Well',
      temp: '150°F · 65°C',
      color: 'from-stone-400 via-rose-400 to-stone-700',
      description: 'Slightest whisper of pink at the center, dark mahogany crust.',
    },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDietary =
      dietaryFilter === 'all' || (item.dietary && item.dietary.includes(dietaryFilter as any));
    return matchesCat && matchesDietary;
  });

  return (
    <section id="menu" className="py-24 bg-[#0b0b0d] text-[#e8e6e3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
            Seasonal Culinary Program
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#f3f0ea] mt-2 mb-4 tracking-[0.06em]">
            Digital Menu
          </h2>
          <p className="text-sm text-[#9c9a96] leading-relaxed">
            Every cut is responsibly sourced from heritage family-owned American pastures and certified Japanese farms, dry-aged in our Himalayan salt chamber, and roasted over live white oak embers.
          </p>

          {/* Currency Switcher & Dietary Filter Strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-4 border-t border-[#1f1f26]">
            {/* Currency selector */}
            <div className="flex items-center gap-1 bg-[#141419] border border-[#24242e] rounded p-0.5 text-xs">
              <span className="px-2 text-[11px] text-[#777] uppercase font-medium">Currency:</span>
              {(['USD', 'EUR', 'GBP'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2.5 py-1 font-semibold rounded text-xs transition-colors cursor-pointer ${
                    currency === curr ? 'bg-[#d4af37] text-[#0b0b0d]' : 'text-[#888] hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            {/* Dietary Filter Segmented Control */}
            <div className="flex items-center gap-1 bg-[#141419] border border-[#24242e] rounded p-0.5 text-xs">
              <span className="px-2 text-[11px] text-[#777] uppercase font-medium">Filter:</span>
              {[
                { id: 'all', label: 'All' },
                { id: 'chef-choice', label: "Chef's Picks" },
                { id: 'gluten-free', label: 'Gluten-Free' },
                { id: 'dairy-free', label: 'Dairy-Free' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setDietaryFilter(f.id as any)}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    dietaryFilter === f.id ? 'bg-[#292936] text-[#d4af37]' : 'text-[#888] hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Steak Doneness & Thermal Visualizer */}
        <div className="bg-[#121217] border border-[#24242e] rounded-lg p-6 mb-14 max-w-4xl mx-auto shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-[#24242e] pb-4">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#d4af37]" />
                Thermal Calibration Guide
              </span>
              <h3 className="font-serif-luxury text-lg text-[#f3f0ea]">
                Signature Meat Doneness Spectrum
              </h3>
            </div>
            <div className="text-xs text-[#888]">
              Target Core Temperature · Resting Monitored
            </div>
          </div>

          {/* Doneness Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
            {donenessLevels.map((lvl, index) => (
              <button
                key={lvl.name}
                onClick={() => setActiveDoneness(index)}
                className={`p-3 rounded text-left transition-all border cursor-pointer ${
                  activeDoneness === index
                    ? 'bg-[#1e1c17] border-[#d4af37] shadow-sm'
                    : 'bg-[#181820] border-[#252530] hover:border-[#383846]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${
                      activeDoneness === index ? 'text-[#d4af37]' : 'text-[#e8e6e3]'
                    }`}
                  >
                    {lvl.name}
                  </span>
                  {lvl.badge && (
                    <span className="text-[9px] font-mono text-[#d4af37] uppercase">★ Ideal</span>
                  )}
                </div>
                <div className="font-mono text-[11px] text-[#777] mt-1 tabular-nums">{lvl.temp}</div>
              </button>
            ))}
          </div>

          {/* Visual gradient bar simulating steak center */}
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 overflow-hidden relative p-0.5 border border-[#333]">
              <div
                className={`h-full w-full rounded transition-all duration-500 bg-gradient-to-r ${donenessLevels[activeDoneness].color}`}
              />
            </div>
            <p className="text-xs text-[#a09e9a] italic leading-relaxed pt-1">
              {donenessLevels[activeDoneness].description}
            </p>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#d4af37] text-[#0b0b0d]'
                  : 'bg-[#141419] text-[#999] border border-[#22222a] hover:text-white hover:border-[#363644]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#121217] border border-[#202028] rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#383848] transition-all duration-300 group shadow-lg"
            >
              <div>
                {/* Visual Lead (if image available) */}
                {item.image && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#181820]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent opacity-80" />
                    {item.agingDays && (
                      <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-[#d4af37] border border-[#d4af37]/30 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded">
                        {item.agingDays}-Day Salt Aged
                      </div>
                    )}
                  </div>
                )}

                {/* Card Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  {/* Clean unboxed metadata (anti-pill rule) */}
                  <div className="flex items-center gap-2 text-[11px] text-[#7e7c78] uppercase tracking-wider">
                    {item.origin && <span>{item.origin.split(',')[0]}</span>}
                    {item.origin && item.weight && <span>·</span>}
                    {item.weight && <span>{item.weight}</span>}
                    {item.marbleScore && (
                      <>
                        <span>·</span>
                        <span className="text-[#c59b27]">{item.marbleScore}</span>
                      </>
                    )}
                  </div>

                  {/* Title & Price */}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif-luxury text-lg text-[#f3f0ea] group-hover:text-[#d4af37] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <span className="font-mono text-base font-bold text-[#d4af37] tabular-nums whitespace-nowrap">
                      {formatPrice(item.priceUSD)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#999] leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  {/* Wine pairing hint if available */}
                  {item.winePairing && (
                    <div className="pt-2 flex items-center gap-2 text-[11px] text-[#8e8c88] border-t border-[#1c1c24]">
                      <Wine className="w-3 h-3 text-[#d4af37] shrink-0" />
                      <span className="truncate">Pairing: {item.winePairing}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                <button
                  onClick={() => setSelectedItemForModal(item)}
                  className="w-full py-2 text-xs font-semibold uppercase tracking-wider text-[#bbb] hover:text-[#d4af37] bg-[#171720] hover:bg-[#1f1f2b] border border-[#272733] rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Inspect Cut & Provenance</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cut / Dish Inspection Modal */}
        {selectedItemForModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#141419] border border-[#2c2c38] rounded-lg max-w-2xl w-full overflow-hidden shadow-2xl relative text-left">
              {/* Close button */}
              <button
                onClick={() => setSelectedItemForModal(null)}
                className="absolute top-4 right-4 z-10 p-2 text-[#999] hover:text-white bg-black/50 rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image Header */}
              {selectedItemForModal.image && (
                <div className="w-full h-56 relative bg-black">
                  <img
                    src={selectedItemForModal.image}
                    alt={selectedItemForModal.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141419] to-transparent" />
                </div>
              )}

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                      {selectedItemForModal.category.toUpperCase()} · CRAFT SPECIFICATION
                    </span>
                    <h3 className="font-serif-luxury text-2xl text-[#f5f2ec] mt-1">
                      {selectedItemForModal.name}
                    </h3>
                  </div>
                  <span className="font-mono text-2xl font-bold text-[#d4af37] tabular-nums">
                    {formatPrice(selectedItemForModal.priceUSD)}
                  </span>
                </div>

                <p className="text-sm text-[#b0aeaa] leading-relaxed">
                  {selectedItemForModal.description}
                </p>

                {/* Technical Provenance List */}
                <div className="grid grid-cols-2 gap-3 bg-[#1a1a22] border border-[#262634] rounded p-4 text-xs">
                  {selectedItemForModal.origin && (
                    <div>
                      <span className="text-[#777] block text-[10px] uppercase">Pasture Origin</span>
                      <span className="text-[#e8e6e3] font-medium">{selectedItemForModal.origin}</span>
                    </div>
                  )}
                  {selectedItemForModal.agingDays && (
                    <div>
                      <span className="text-[#777] block text-[10px] uppercase">Dry-Aging Cycle</span>
                      <span className="text-[#e8e6e3] font-medium">{selectedItemForModal.agingDays} Days Himalayan Salt</span>
                    </div>
                  )}
                  {selectedItemForModal.marbleScore && (
                    <div>
                      <span className="text-[#777] block text-[10px] uppercase">Marbling Grade</span>
                      <span className="text-[#d4af37] font-medium">{selectedItemForModal.marbleScore}</span>
                    </div>
                  )}
                  {selectedItemForModal.recommendedDoneness && (
                    <div>
                      <span className="text-[#777] block text-[10px] uppercase">Chef Recommends</span>
                      <span className="text-[#e8e6e3] font-medium">{selectedItemForModal.recommendedDoneness}</span>
                    </div>
                  )}
                </div>

                {selectedItemForModal.winePairing && (
                  <div className="bg-[#1c1815] border border-[#3d3320] rounded p-3 text-xs flex items-center gap-3">
                    <Wine className="w-5 h-5 text-[#d4af37] shrink-0" />
                    <div>
                      <span className="text-[#d4af37] font-semibold uppercase text-[10px] block">
                        Sommelier Reserve Wine Pairing
                      </span>
                      <span className="text-[#e8e6e3]">{selectedItemForModal.winePairing}</span>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <a
                    href="#reservations"
                    onClick={() => setSelectedItemForModal(null)}
                    className="px-6 py-2.5 bg-[#d4af37] hover:bg-[#e5be49] text-[#0b0b0d] font-bold text-xs uppercase tracking-wider rounded transition-colors text-center cursor-pointer"
                  >
                    Reserve Table to Taste
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
