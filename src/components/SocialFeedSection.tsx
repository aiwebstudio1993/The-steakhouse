import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Instagram, ExternalLink, X, Send } from 'lucide-react';
import { SOCIAL_POSTS } from '../data/restaurantData';
import { SocialPost } from '../types';

export const SocialFeedSection: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>(SOCIAL_POSTS);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [activePostForComments, setActivePostForComments] = useState<SocialPost | null>(null);
  const [newCommentText, setNewCommentText] = useState<string>('');

  const toggleLike = (postId: string) => {
    const isLiked = !!likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !isLiked }));
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            likes: isLiked ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activePostForComments) return;

    const updatedPost = {
      ...activePostForComments,
      commentsCount: activePostForComments.commentsCount + 1,
      comments: [
        ...activePostForComments.comments,
        { user: 'you_diner', text: newCommentText.trim() },
      ],
    };

    setPosts((prev) => prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    setActivePostForComments(updatedPost);
    setNewCommentText('');
  };

  return (
    <section className="py-24 bg-[#0a0a0c] text-[#e8e6e3] relative border-t border-[#1a1a22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
              <Instagram className="w-3.5 h-3.5" />
              <span>Live Culinary Dispatch</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#f3f0ea] mt-2 tracking-[0.06em]">
              Culinary Updates & Social Feed
            </h2>
            <p className="text-sm text-[#9c9a96] mt-2 max-w-xl">
              Fresh shipments from Miyazaki, Himalayan dry-aging room unlocks, and nightly woodfire hearth specials direct from our kitchen.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-[#181820] hover:bg-[#22222e] text-[#e8e6e3] hover:text-[#d4af37] border border-[#2a2a38] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Instagram className="w-4 h-4 text-[#d4af37]" />
            <span>Follow @TheSteakhouseNYC</span>
            <ExternalLink className="w-3 h-3 text-[#777]" />
          </a>
        </div>

        {/* Social Feed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => {
            const isLiked = !!likedPosts[post.id];
            return (
              <div
                key={post.id}
                className="bg-[#121217] border border-[#202028] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#333342] transition-colors shadow-lg group"
              >
                <div>
                  {/* Post Header */}
                  <div className="p-3.5 flex items-center justify-between border-b border-[#1c1c24] text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#d4af37] text-black font-bold text-[10px] flex items-center justify-center font-serif-luxury">
                        S
                      </div>
                      <span className="font-semibold text-[#dedbd4]">{post.handle}</span>
                    </div>
                    <span className="text-[11px] text-[#777] font-mono">{post.timestamp}</span>
                  </div>

                  {/* Post Image with Hover overlay */}
                  <div
                    className="relative aspect-square overflow-hidden bg-black cursor-pointer"
                    onClick={() => setActivePostForComments(post)}
                  >
                    <img
                      src={post.image}
                      alt={post.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white text-xs font-semibold">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4 fill-white" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" /> {post.commentsCount}
                      </span>
                    </div>
                  </div>

                  {/* Post Actions & Caption */}
                  <div className="p-4 space-y-2.5">
                    {/* Action Bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className="text-[#aaa] hover:text-rose-500 transition-colors cursor-pointer"
                          aria-label="Like post"
                        >
                          <Heart
                            className={`w-4 h-4 transition-transform active:scale-125 ${
                              isLiked ? 'text-rose-500 fill-rose-500' : ''
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => setActivePostForComments(post)}
                          className="text-[#aaa] hover:text-white transition-colors cursor-pointer"
                          aria-label="View comments"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[11px] font-mono text-[#888] tabular-nums">
                        {post.likes.toLocaleString()} likes
                      </span>
                    </div>

                    {/* Caption */}
                    <p className="text-xs text-[#9d9b96] leading-relaxed line-clamp-3">
                      <strong className="text-[#dedbd4] mr-1.5">{post.handle}</strong>
                      {post.caption}
                    </p>
                  </div>
                </div>

                {/* View Comments trigger */}
                <div className="px-4 pb-3 pt-0">
                  <button
                    onClick={() => setActivePostForComments(post)}
                    className="text-[11px] text-[#777] hover:text-[#d4af37] transition-colors cursor-pointer block"
                  >
                    View all {post.commentsCount} comments
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Post Comments Modal */}
        {activePostForComments && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#141419] border border-[#2c2c38] rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col sm:flex-row max-h-[85vh]">
              {/* Image side */}
              <div className="sm:w-1/2 bg-black relative">
                <img
                  src={activePostForComments.image}
                  alt={activePostForComments.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Comments side */}
              <div className="sm:w-1/2 p-5 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#24242e] pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-[#e8e6e3]">{activePostForComments.handle}</span>
                    <span className="text-[10px] text-[#888]">{activePostForComments.timestamp}</span>
                  </div>
                  <button
                    onClick={() => setActivePostForComments(null)}
                    className="text-[#888] hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs text-[#bbb]">
                  <p className="leading-relaxed text-[#ccc] border-b border-[#1c1c24] pb-2">
                    {activePostForComments.caption}
                  </p>

                  <div className="space-y-2 pt-1">
                    {activePostForComments.comments.map((c, i) => (
                      <div key={i} className="text-xs">
                        <strong className="text-[#d4af37] mr-1.5">{c.user}:</strong>
                        <span className="text-[#999]">{c.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add comment input */}
                <form onSubmit={handleAddComment} className="pt-3 border-t border-[#24242e] flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Add a culinary reflection..."
                    className="flex-1 bg-[#1a1a24] border border-[#2b2b3a] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="submit"
                    className="p-1.5 bg-[#d4af37] text-black rounded hover:bg-[#e5be49] transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
