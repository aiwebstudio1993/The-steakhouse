import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'cuts' | 'hearth' | 'cocktails' | 'ambience'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const filteredItems = GALLERY_ITEMS.filter((item) => filter === 'all' || item.category === filter);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsZoomed(false);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    setIsZoomed(false);
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    setIsZoomed(false);
  };

  return (
    <section id="gallery" className="py-24 bg-[#0c0c0f] text-[#e8e6e3] relative border-t border-[#1a1a22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
            Visual Anthology
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#f3f0ea] mt-2 mb-4 tracking-[0.06em]">
            Photo Gallery
          </h2>
          <p className="text-sm text-[#9c9a96] leading-relaxed">
            Moments from our Himalayan salt dry-aging vault, live embers at 1,200°F, intimate dining rooms, and sommelier cellars.
          </p>

          {/* Filter segment */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Artifacts' },
              { id: 'cuts', label: 'Prime Cuts' },
              { id: 'hearth', label: 'The Live Hearth' },
              { id: 'cocktails', label: 'Cellar & Cocktails' },
              { id: 'ambience', label: 'Dining & Ambience' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer ${
                  filter === f.id
                    ? 'bg-[#d4af37] text-[#0b0b0d]'
                    : 'bg-[#141419] text-[#8e8c88] border border-[#23232c] hover:text-white hover:border-[#383846]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-[#15151c] border border-[#22222c] cursor-pointer shadow-lg hover:border-[#d4af37]/50 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">
                  {item.tagline}
                </span>
                <h3 className="font-serif-luxury text-base text-[#f5f2ec] font-semibold mt-0.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#aaa] mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.caption}
                </p>
                <div className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Maximize2 className="w-4 h-4 text-[#d4af37]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between text-white border-b border-[#222228] pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-[#d4af37]">
                  {filteredItems[lightboxIndex].tagline}
                </span>
                <span className="text-xs text-[#777]">
                  ({lightboxIndex + 1} of {filteredItems.length})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-2 rounded bg-[#1e1e26] hover:bg-[#2c2c38] text-[#c4c2be] transition-colors cursor-pointer"
                  title="Toggle Zoom"
                >
                  {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                </button>
                <button
                  onClick={closeLightbox}
                  className="p-2 rounded bg-[#1e1e26] hover:bg-[#2c2c38] text-[#c4c2be] hover:text-white transition-colors cursor-pointer"
                  title="Close Gallery Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Center Image Display */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4">
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div
                className={`transition-all duration-300 max-h-[75vh] max-w-[85vw] flex items-center justify-center ${
                  isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-h-[75vh] w-auto object-contain rounded shadow-2xl"
                />
              </div>

              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="text-center max-w-2xl mx-auto border-t border-[#222228] pt-4">
              <h4 className="font-serif-luxury text-lg text-[#f5f2ec]">
                {filteredItems[lightboxIndex].title}
              </h4>
              <p className="text-xs text-[#a09e9a] mt-1 leading-relaxed">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
