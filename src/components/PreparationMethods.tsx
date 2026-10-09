import React, { useState } from 'react';
import { Flame, Clock, Thermometer, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { PREPARATION_METHODS } from '../data/restaurantData';

export const PreparationMethods: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeMethod = PREPARATION_METHODS[activeStepIndex];

  return (
    <section id="craft" className="py-24 bg-[#0a0a0c] text-[#e8e6e3] relative border-t border-[#1a1a22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
            The Alchemy of Fire & Time
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#f3f0ea] mt-2 mb-4 tracking-[0.06em]">
            Signature Preparation Methods
          </h2>
          <p className="text-sm text-[#9c9a96] leading-relaxed">
            Great steak is not merely cooked; it is an uncompromising four-phase architectural craft spanning two months of humidity aging, thousand-degree woodfire chemistry, and calibrated tableside resting.
          </p>
        </div>

        {/* 4-Step Interactive Progression Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {PREPARATION_METHODS.map((method, index) => (
            <button
              key={method.id}
              onClick={() => setActiveStepIndex(index)}
              className={`p-4 sm:p-5 text-left rounded-lg border transition-all duration-300 cursor-pointer relative ${
                activeStepIndex === index
                  ? 'bg-[#181822] border-[#d4af37] shadow-lg shadow-amber-950/20'
                  : 'bg-[#101014] border-[#22222a] hover:border-[#333340]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`font-mono text-xs font-bold ${
                    activeStepIndex === index ? 'text-[#d4af37]' : 'text-[#666]'
                  }`}
                >
                  PHASE {method.stepNumber}
                </span>
                {activeStepIndex === index && (
                  <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                )}
              </div>
              <h3
                className={`font-serif-luxury text-sm font-semibold tracking-wide ${
                  activeStepIndex === index ? 'text-[#f5f2ec]' : 'text-[#a19f9b]'
                }`}
              >
                {method.title}
              </h3>
            </button>
          ))}
        </div>

        {/* Detailed Method Showcase */}
        <div className="bg-[#121217] border border-[#24242e] rounded-xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-8">
              <div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                  <span>Phase {activeMethod.stepNumber} of 04</span>
                  <span>·</span>
                  <span>{activeMethod.subtitle}</span>
                </div>

                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#f5f2ec] mb-4">
                  {activeMethod.title}
                </h3>

                <p className="text-sm text-[#b5b3ae] leading-relaxed mb-6">
                  {activeMethod.description}
                </p>

                {/* Scientific Breakdown Box */}
                <div className="bg-[#171720] border border-[#282836] rounded-lg p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Culinary Science & Biochemistry</span>
                  </div>
                  <p className="text-xs text-[#9d9b96] leading-relaxed">
                    {activeMethod.scientificDetail}
                  </p>
                </div>
              </div>

              {/* Metrics & Parameters */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#202028]">
                {activeMethod.temperature && (
                  <div>
                    <span className="flex items-center gap-1.5 text-[11px] text-[#777] uppercase font-medium">
                      <Thermometer className="w-3.5 h-3.5 text-[#d4af37]" />
                      Calibration Temp
                    </span>
                    <span className="font-mono text-sm font-bold text-[#e8e6e3] mt-0.5 block tabular-nums">
                      {activeMethod.temperature}
                    </span>
                  </div>
                )}
                {activeMethod.duration && (
                  <div>
                    <span className="flex items-center gap-1.5 text-[11px] text-[#777] uppercase font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                      Exposure Time
                    </span>
                    <span className="font-mono text-sm font-bold text-[#e8e6e3] mt-0.5 block tabular-nums">
                      {activeMethod.duration}
                    </span>
                  </div>
                )}
                <div className="col-span-2 sm:col-span-1">
                  <span className="flex items-center gap-1.5 text-[11px] text-[#777] uppercase font-medium">
                    <Award className="w-3.5 h-3.5 text-[#d4af37]" />
                    Purity Standard
                  </span>
                  <span className="text-xs font-medium text-[#e8e6e3] mt-0.5 block">
                    Zero Synthetic Heating
                  </span>
                </div>
              </div>

              {/* Key Pillars */}
              <div>
                <h4 className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-2.5">
                  Core Craft Pillars
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeMethod.keyAspects.map((aspect, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-[#c4c2be] bg-[#1a1a24] border border-[#2c2c3a] px-3 py-1.5 rounded"
                    >
                      {aspect}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Media / Chef Commentary Column (5 cols) */}
            <div className="lg:col-span-5 bg-[#0f0f13] border-t lg:border-t-0 lg:border-l border-[#24242e] p-6 sm:p-10 flex flex-col justify-between">
              {/* Image Preview for method */}
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-black relative border border-[#2a2a36] shadow-inner mb-6">
                <img
                  src={
                    activeStepIndex === 0
                      ? '/src/assets/images/gallery_prime_ribeye_1791544895790.jpg'
                      : activeStepIndex === 1
                      ? '/src/assets/images/gallery_tomahawk_sear_1791544914264.jpg'
                      : activeStepIndex === 2
                      ? '/src/assets/images/gallery_tomahawk_sear_1791544914264.jpg'
                      : '/src/assets/images/gallery_wagyu_a5_cut_1791544925870.jpg'
                  }
                  alt={activeMethod.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-[#e8e6e3] font-medium">
                  Hearth Station · Station 0{activeMethod.stepNumber}
                </div>
              </div>

              {/* Chef philosophy quote */}
              <div className="space-y-3">
                <div className="font-serif-editorial text-lg italic text-[#d4af37] leading-relaxed">
                  "{activeMethod.chefQuote}"
                </div>
                <div className="text-xs text-[#888] pt-2 border-t border-[#22222c]">
                  <strong className="text-[#e8e6e3] block">Chef Alistair Sterling</strong>
                  <span>Executive Pitmaster & Dry-Age Curator</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
