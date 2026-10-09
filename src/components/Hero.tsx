import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted in some browsers without user interaction
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('reservations') || document.getElementById('menu');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[640px] flex flex-col justify-between items-center overflow-hidden bg-[#0a0a0c]">
      {/* High-Resolution Background Video: Steak Getting Cut */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/gallery_prime_ribeye_1791544895790.jpg"
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover object-center transform scale-105 transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-90' : 'opacity-70'
          }`}
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-cutting-a-piece-of-grilled-meat-41484-large.mp4"
            type="video/mp4"
          />
          <source
            src="https://cdn.coverr.co/videos/coverr-slicing-a-juicy-steak-4795/1080p.mp4"
            type="video/mp4"
          />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-chef-slicing-a-grilled-meat-piece-42971-large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Cinematographic dark scrim for contrast and luxury mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-black/45 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.65)_100%)] pointer-events-none" />
      </div>

      {/* Top spacer for navbar balance */}
      <div className="w-full h-24" />

      {/* Center Zone: MINIMAL TEXT ONLY A HEADING ON THE FIRST PAGE */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center select-none flex flex-col items-center justify-center my-auto">
        <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.22em] text-[#f7f5f0] uppercase font-medium drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] transition-all duration-700">
          THE STEAKHOUSE
        </h1>
      </div>

      {/* Bottom Bar: Video playback controls & Subtle scroll cue */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-8 flex items-center justify-between text-[#a19f9c]">
        {/* Subtle Video Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-2 rounded bg-black/40 hover:bg-black/70 text-[#c4c2be] hover:text-[#d4af37] border border-white/10 backdrop-blur-sm transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
            title={isPlaying ? 'Pause video' : 'Play video'}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={toggleMute}
            className="p-2 rounded bg-black/40 hover:bg-black/70 text-[#c4c2be] hover:text-[#d4af37] border border-white/10 backdrop-blur-sm transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
            title={isMuted ? 'Unmute video' : 'Mute video'}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Minimalist Scroll Cue */}
        <button
          onClick={scrollToNext}
          className="group flex flex-col items-center gap-1.5 text-[11px] tracking-[0.25em] uppercase text-[#c4c2be] hover:text-[#d4af37] transition-colors cursor-pointer"
        >
          <span>Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-[#d4af37] transition-colors" />
        </button>

        {/* Discreet Location Indicator */}
        <div className="text-[11px] tracking-[0.2em] uppercase text-[#888] hidden sm:block">
          New York · Est. 2024
        </div>
      </div>
    </section>
  );
};
