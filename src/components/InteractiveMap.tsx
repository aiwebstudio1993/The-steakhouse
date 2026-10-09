import React, { useState } from 'react';
import { MapPin, Navigation, Car, Train, Clock, ExternalLink, Plus, Minus, RotateCcw } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface MapPoint {
  id: string;
  name: string;
  category: 'restaurant' | 'valet' | 'transit' | 'landmark';
  x: number; // percentage coordinates on vector map
  y: number;
  description: string;
}

export const InteractiveMap: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedPoint, setSelectedPoint] = useState<string>('steakhouse');
  const [directionMode, setDirectionMode] = useState<'driving' | 'transit' | null>(null);

  const points: MapPoint[] = [
    {
      id: 'steakhouse',
      name: 'The Steakhouse (Main Hearth Entrance)',
      category: 'restaurant',
      x: 52,
      y: 48,
      description: '412 Artisan Hearth Way. Grand oak double doors and reception host stand.',
    },
    {
      id: 'valet',
      name: 'White-Glove Valet Drop-Off',
      category: 'valet',
      x: 58,
      y: 43,
      description: '4th Avenue Portico. Attendant on duty 4:30 PM until closing. Complimentary for dinner guests.',
    },
    {
      id: 'transit-1',
      name: '14th St & 8th Ave Subway Station',
      category: 'transit',
      x: 35,
      y: 28,
      description: 'Lines A, C, E, L. 4-minute illuminated stroll through Meatpacking cobblestones.',
    },
    {
      id: 'transit-2',
      name: 'High Line Park Access (14th St Passage)',
      category: 'landmark',
      x: 74,
      y: 65,
      description: 'Scenic elevated walkway entrance directly overlooking the Hudson River.',
    },
    {
      id: 'cellar-door',
      name: 'Private Cellar Vault Entrance',
      category: 'restaurant',
      x: 50,
      y: 54,
      description: 'Discreet side entrance for VIP wine vault buyouts and private culinary tastings.',
    },
  ];

  const currentPoint = points.find((p) => p.id === selectedPoint) || points[0];

  return (
    <section id="location" className="py-24 bg-[#0c0c0f] text-[#e8e6e3] relative border-t border-[#1a1a22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
            Neighborhood & Arrival
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#f3f0ea] mt-2 mb-4 tracking-[0.06em]">
            Interactive Navigation
          </h2>
          <p className="text-sm text-[#9c9a96] leading-relaxed">
            Nestled along the historic cobblestone avenues of the Meatpacking District. Easily accessible via private vehicle with complimentary valet or transit.
          </p>
        </div>

        {/* Map & Direction Panel Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Vector Styled Map (7 Cols) */}
          <div className="lg:col-span-7 bg-[#101015] border border-[#23232e] rounded-xl overflow-hidden relative shadow-2xl min-h-[440px] flex flex-col justify-between">
            {/* Map Top Bar Controls */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="bg-[#14141c]/90 border border-[#2b2b3a] backdrop-blur-md rounded px-3 py-1.5 pointer-events-auto flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium text-[#e8e6e3]">Open Tonight: 5:00 PM – 11:30 PM</span>
              </div>

              {/* Zoom Buttons */}
              <div className="flex items-center gap-1 bg-[#14141c]/90 border border-[#2b2b3a] backdrop-blur-md rounded p-1 pointer-events-auto">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 1.75))}
                  className="p-1.5 hover:text-[#d4af37] transition-colors rounded text-white cursor-pointer"
                  title="Zoom In"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.85))}
                  className="p-1.5 hover:text-[#d4af37] transition-colors rounded text-white cursor-pointer"
                  title="Zoom Out"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 hover:text-[#d4af37] transition-colors rounded text-white cursor-pointer"
                  title="Reset Map View"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Custom SVG Dark Styled Map Canvas */}
            <div className="w-full h-full min-h-[440px] relative overflow-hidden bg-[#0d0d12]">
              <div
                className="w-full h-full transition-transform duration-300 origin-center absolute inset-0"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/* Vector Streets / Blocks Grid */}
                <svg
                  className="w-full h-full absolute inset-0 select-none opacity-85"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1000 700"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#080c14" />
                      <stop offset="100%" stopColor="#0b1320" />
                    </linearGradient>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="40" y2="0" stroke="#171720" strokeWidth="0.75" />
                      <line x1="0" y1="0" x2="0" y2="40" stroke="#171720" strokeWidth="0.75" />
                    </pattern>
                  </defs>

                  {/* Base grid background */}
                  <rect width="1000" height="700" fill="url(#grid)" />

                  {/* Hudson River on West Side */}
                  <path
                    d="M 0,0 L 220,0 C 200,200 180,450 160,700 L 0,700 Z"
                    fill="url(#riverGrad)"
                  />
                  <text x="70" y="360" fill="#293952" fontSize="18" letterSpacing="4" fontFamily="sans-serif">
                    HUDSON RIVER
                  </text>

                  {/* City Blocks / Buildings */}
                  <rect x="250" y="50" width="160" height="90" fill="#14141c" rx="4" />
                  <rect x="440" y="50" width="180" height="90" fill="#14141c" rx="4" />
                  <rect x="650" y="50" width="280" height="90" fill="#14141c" rx="4" />

                  <rect x="240" y="180" width="160" height="110" fill="#14141c" rx="4" />
                  <rect x="430" y="180" width="180" height="110" fill="#14141c" rx="4" />
                  <rect x="640" y="180" width="290" height="110" fill="#14141c" rx="4" />

                  {/* Artisan Hearth Way Block (Our block highlighted in subtle warm bronze) */}
                  <rect x="230" y="330" width="160" height="140" fill="#14141c" rx="4" />
                  <rect
                    x="420"
                    y="330"
                    width="190"
                    height="140"
                    fill="#18171f"
                    stroke="#d4af37"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    rx="4"
                  />
                  <rect x="640" y="330" width="300" height="140" fill="#14141c" rx="4" />

                  <rect x="220" y="510" width="160" height="140" fill="#14141c" rx="4" />
                  <rect x="410" y="510" width="190" height="140" fill="#14141c" rx="4" />
                  <rect x="630" y="510" width="310" height="140" fill="#14141c" rx="4" />

                  {/* Primary Avenues & Streets */}
                  {/* Vertical Avenues */}
                  <line x1="410" y1="0" x2="410" y2="700" stroke="#252533" strokeWidth="18" />
                  <line x1="625" y1="0" x2="625" y2="700" stroke="#252533" strokeWidth="22" />

                  {/* Horizontal Streets */}
                  <line x1="200" y1="160" x2="1000" y2="160" stroke="#252533" strokeWidth="14" />
                  <line x1="180" y1="310" x2="1000" y2="310" stroke="#333345" strokeWidth="20" />
                  <line x1="170" y1="490" x2="1000" y2="490" stroke="#252533" strokeWidth="14" />

                  {/* Street Labels */}
                  <text x="440" y="303" fill="#6c6b75" fontSize="11" letterSpacing="2" fontFamily="sans-serif">
                    ARTISAN HEARTH WAY (14TH ST)
                  </text>
                  <text x="635" y="60" fill="#6c6b75" fontSize="11" letterSpacing="2" fontFamily="sans-serif">
                    4TH AVENUE
                  </text>
                  <text x="420" y="60" fill="#6c6b75" fontSize="11" letterSpacing="2" fontFamily="sans-serif">
                    WASHINGTON ST
                  </text>

                  {/* High Line Elevated Trail Path */}
                  <path
                    d="M 720,700 L 730,450 Q 740,300 760,180 L 780,0"
                    stroke="#2e382e"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="6 4"
                  />
                  <text x="750" y="420" fill="#4d664d" fontSize="11" letterSpacing="1" fontFamily="sans-serif">
                    THE HIGH LINE
                  </text>
                </svg>

                {/* Interactive Points on Map */}
                {points.map((pt) => {
                  const isSelected = selectedPoint === pt.id;
                  const isMain = pt.id === 'steakhouse';
                  return (
                    <button
                      key={pt.id}
                      onClick={() => setSelectedPoint(pt.id)}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group cursor-pointer focus:outline-none"
                      style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                    >
                      <div className="relative flex items-center justify-center">
                        {isMain && (
                          <span className="absolute w-10 h-10 rounded-full bg-[#d4af37]/30 animate-ping" />
                        )}
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 border shadow-lg ${
                            isSelected
                              ? 'bg-[#d4af37] text-[#0b0b0d] border-white scale-125'
                              : isMain
                              ? 'bg-[#c59b27] text-[#0b0b0d] border-[#d4af37]'
                              : pt.category === 'valet'
                              ? 'bg-[#1e2638] text-sky-400 border-sky-600'
                              : pt.category === 'transit'
                              ? 'bg-[#291e38] text-purple-400 border-purple-600'
                              : 'bg-[#181820] text-[#aaa] border-[#383846]'
                          }`}
                        >
                          {pt.category === 'valet' ? (
                            <Car className="w-3.5 h-3.5" />
                          ) : pt.category === 'transit' ? (
                            <Train className="w-3.5 h-3.5" />
                          ) : (
                            <MapPin className="w-3.5 h-3.5" />
                          )}
                        </div>
                      </div>

                      {/* Tooltip Label */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 top-8 whitespace-nowrap px-2.5 py-1 rounded text-[11px] font-semibold border pointer-events-none transition-all ${
                          isSelected
                            ? 'bg-[#121218] border-[#d4af37] text-[#d4af37] shadow-xl'
                            : 'bg-black/80 border-white/10 text-white/90 opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        {pt.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Map Legend */}
            <div className="p-3 bg-[#13131b] border-t border-[#23232e] flex flex-wrap items-center justify-between text-[11px] text-[#888] gap-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" /> The Steakhouse
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Valet Portico
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Subway Transit
                </span>
              </div>
              <span className="text-[#666]">Click any pin to inspect arrival details</span>
            </div>
          </div>

          {/* Right Column: Address, Valet & Direction Cards (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            {/* Selected Location Card */}
            <div className="bg-[#121217] border border-[#24242e] rounded-xl p-6 shadow-xl space-y-4">
              <div className="flex items-start justify-between gap-3 border-b border-[#22222a] pb-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] block">
                    DESTINATION PROFILE
                  </span>
                  <h3 className="font-serif-luxury text-xl text-[#f5f2ec] mt-1 font-semibold">
                    {currentPoint.name}
                  </h3>
                </div>
                <div className="p-2 rounded bg-[#1c1c24] border border-[#2b2b38] text-[#d4af37]">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs text-[#a09e9a] leading-relaxed">
                {currentPoint.description}
              </p>

              <div className="bg-[#181820] border border-[#262634] rounded-lg p-3.5 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#ccc]">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span className="font-medium">{RESTAURANT_INFO.address}</span>
                </div>
                <div className="flex items-center gap-2 text-[#aaa]">
                  <Car className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span>{RESTAURANT_INFO.valet}</span>
                </div>
                <div className="flex items-center gap-2 text-[#aaa]">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span>{RESTAURANT_INFO.hours.dinner}</span>
                </div>
              </div>

              {/* Direct Navigation Links */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(RESTAURANT_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-[#1b1b24] hover:bg-[#252532] text-[#e8e6e3] rounded text-xs font-semibold text-center border border-[#2a2a38] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-[#777]" />
                </a>

                <a
                  href={`https://maps.apple.com/?address=${encodeURIComponent(RESTAURANT_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-[#1b1b24] hover:bg-[#252532] text-[#e8e6e3] rounded text-xs font-semibold text-center border border-[#2a2a38] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Apple Maps</span>
                  <ExternalLink className="w-3 h-3 text-[#777]" />
                </a>
              </div>
            </div>

            {/* Turn-by-Turn Arrival Guidance */}
            <div className="bg-[#121217] border border-[#24242e] rounded-xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#22222a] pb-3">
                <h4 className="text-xs uppercase tracking-wider text-[#999] font-semibold">
                  Arrival Route Options
                </h4>
                <div className="flex gap-1">
                  <button
                    onClick={() => setDirectionMode(directionMode === 'driving' ? null : 'driving')}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                      directionMode === 'driving' ? 'bg-[#d4af37] text-black font-semibold' : 'bg-[#1c1c24] text-[#aaa]'
                    }`}
                  >
                    Driving
                  </button>
                  <button
                    onClick={() => setDirectionMode(directionMode === 'transit' ? null : 'transit')}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                      directionMode === 'transit' ? 'bg-[#d4af37] text-black font-semibold' : 'bg-[#1c1c24] text-[#aaa]'
                    }`}
                  >
                    Subway
                  </button>
                </div>
              </div>

              {directionMode === 'driving' ? (
                <div className="text-xs text-[#9d9b96] space-y-2">
                  <p><strong>From West Side Highway:</strong> Take the 14th Street exit Eastbound into the Meatpacking District. Turn right onto 4th Avenue portico for white-glove valet.</p>
                  <p><strong>From Midtown / FDR Drive:</strong> Head West via 14th Street. Proceed past 8th Avenue toward the cobblestones.</p>
                </div>
              ) : directionMode === 'transit' ? (
                <div className="text-xs text-[#9d9b96] space-y-2">
                  <p><strong>Subway:</strong> Take the A, C, E, or L train to the <strong>14th St / 8th Ave</strong> station. Exit West towards Hudson Street.</p>
                  <p><strong>Stroll:</strong> A 4-minute walk along illuminated gas-lamp cobblestones brings you directly to our grand entrance.</p>
                </div>
              ) : (
                <p className="text-xs text-[#888] leading-relaxed">
                  Select Driving or Subway above for customized arrival instructions, or pull directly up to our 4th Avenue portico where our valet team greets all dining reservations.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
