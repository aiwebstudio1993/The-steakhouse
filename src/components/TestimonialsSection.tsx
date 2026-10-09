import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, Quote, X } from 'lucide-react';
import { TESTIMONIALS } from '../data/restaurantData';
import { Testimonial } from '../types';

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS);
  const [modalOpen, setModalOpen] = useState(false);

  // New review form state
  const [name, setName] = useState('');
  const [role, setRole] = useState('Verified Diner');
  const [rating, setRating] = useState(5);
  const [dishOrdered, setDishOrdered] = useState('45-Day Bone-In Ribeye');
  const [comment, setComment] = useState('');
  const [submitNotice, setSubmitNotice] = useState<string | null>(null);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newRev: Testimonial = {
      id: `rev-${Date.now()}`,
      author: name,
      role: role || 'Verified Guest',
      source: 'Guestbook Submission',
      rating,
      comment,
      date: 'Just now',
      dishOrdered,
      verified: true,
      avatarText: name.slice(0, 2).toUpperCase(),
    };

    setReviews([newRev, ...reviews]);
    setSubmitNotice('Thank you! Your dining review has been added to our guestbook.');
    setTimeout(() => {
      setSubmitNotice(null);
      setModalOpen(false);
      setName('');
      setComment('');
    }, 1800);
  };

  return (
    <section id="testimonials" className="py-24 bg-[#0a0a0d] text-[#e8e6e3] relative border-t border-[#1a1a22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
              Critical Acclaim & Guest Reflections
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#f3f0ea] mt-2 tracking-[0.06em]">
              Testimonials
            </h2>
            <p className="text-sm text-[#9c9a96] mt-2 max-w-xl">
              From Michelin Guide inspectors to anniversary celebrants, discover what culinary critics and guests say about our hearth and salt-aging craft.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-3 bg-[#181822] hover:bg-[#222230] text-[#d4af37] border border-[#d4af37]/40 rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Leave a Dining Review</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#121217] border border-[#22222c] rounded-lg p-6 sm:p-8 flex flex-col justify-between hover:border-[#383848] transition-colors relative"
            >
              <div className="space-y-4">
                {/* Rating Stars & Source */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#d4af37]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[#888] tracking-wider uppercase">
                    {rev.source}
                  </span>
                </div>

                {/* Quote */}
                <p className="font-serif-editorial text-lg text-[#dedbd4] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-6 mt-6 border-t border-[#1e1e28] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1e1c18] border border-[#d4af37]/40 flex items-center justify-center font-serif-luxury text-xs text-[#d4af37] font-bold">
                    {rev.avatarText}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#f3f0ea] flex items-center gap-1.5">
                      {rev.author}
                      {rev.verified && (
                        <span title="Verified diner">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                        </span>
                      )}
                    </h4>
                    <span className="text-xs text-[#7e7c78] block">{rev.role}</span>
                  </div>
                </div>

                <div className="text-right text-[11px] text-[#777]">
                  <span className="block text-[#aaa] font-medium">{rev.dishOrdered}</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leave Review Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#141419] border border-[#2e2e3a] rounded-lg max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#888] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Guestbook Entry
              </span>
              <h3 className="font-serif-luxury text-2xl text-[#f3f0ea] mt-1 mb-4">
                Share Your Dining Experience
              </h3>

              {submitNotice ? (
                <div className="p-4 bg-emerald-950/40 border border-emerald-800 text-emerald-300 rounded text-xs text-center">
                  {submitNotice}
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#999] mb-1 font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Charlotte Montgomery"
                      className="w-full bg-[#191922] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#999] mb-1 font-medium">
                        Rating (Stars)
                      </label>
                      <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full bg-[#191922] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                        <option value={4}>★★★★☆ (4 Stars - Superb)</option>
                        <option value={3}>★★★☆☆ (3 Stars - Good)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#999] mb-1 font-medium">
                        Dish Ordered
                      </label>
                      <input
                        type="text"
                        value={dishOrdered}
                        onChange={(e) => setDishOrdered(e.target.value)}
                        placeholder="e.g. 45-Day Ribeye & Burrata"
                        className="w-full bg-[#191922] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#999] mb-1 font-medium">
                      Review & Reflections *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Describe the flavor, doneness, hearth ambience, service..."
                      className="w-full bg-[#191922] border border-[#292936] text-[#e8e6e3] text-sm rounded px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#d4af37] hover:bg-[#e5be49] text-[#0b0b0d] font-bold text-xs uppercase tracking-widest rounded transition-colors cursor-pointer"
                  >
                    Submit Review to Guestbook
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
