import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, EyeOff } from 'lucide-react';

const images = [
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
];

gsap.registerPlugin(ScrollTrigger);

const HeroGallery = () => {
  const galleryRef = useRef();
  const numSlides = images.length;
  const [showImages, setShowImages] = useState(true);

  useEffect(() => {
    if (!showImages) return;
    const gallery = galleryRef.current;
    let current = 0;
    let tween;
    let isUnmounted = false;

    function autoSwipe() {
      tween = gsap.to(gallery, {
        x: `-${(current + 1) * 100}vw`,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
          current++;
          if (current === numSlides) {
            gsap.set(gallery, { x: 0 });
            current = 0;
          }
          if (!isUnmounted) autoSwipe();
        },
      });
    }

    autoSwipe();
    return () => {
      isUnmounted = true;
      if (tween) tween.kill();
    };
  }, [numSlides, showImages]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Icon Toggle Button - top right, below sticky header */}
      <button
        className="fixed md:absolute top-20 right-4 md:top-24 md:right-12 z-30 bg-white/80 border border-gray-300 text-gray-700 rounded-full p-2 shadow hover:bg-white hover:text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black"
        style={{ width: 40, height: 40 }}
        onClick={() => setShowImages(v => !v)}
        aria-label={showImages ? 'Hide Images' : 'Show Images'}
        title={showImages ? 'Hide Images' : 'Show Images'}
      >
        {showImages ? <EyeOff size={22} /> : <Eye size={22} />}
      </button>
      {/* Gallery */}
      {showImages && (
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1, pointerEvents: 'none' }}>
          <div
            ref={galleryRef}
            className="flex h-full"
            style={{ width: `calc(${(numSlides + 1)} * 100vw)`, transition: 'none' }}
          >
            {images.concat(images[0]).map((src, i) => (
              <div
                key={i}
                className="gallery-slide flex-shrink-0 h-full"
                style={{ width: '100vw', height: '100vh' }}
              >
                <img
                  src={src}
                  alt="Minimal Threads Gallery"
                  className="object-cover w-full h-full brightness-90"
                  draggable="false"
                  style={{ aspectRatio: '16/9' }}
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/30 to-white/80 pointer-events-none" />
        </div>
      )}
      {/* Overlay Content */}
      <div className="relative z-10 text-center px-4 w-full flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-bold text-black mb-4 tracking-tight drop-shadow-lg mt-8 md:mt-0">
          <span className="block">MINIMAL</span>
          <span className="block">THREADS</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow">
          Discover premium t-shirts crafted for the modern minimalist. Quality meets simplicity in every thread.
        </p>
        <button
          className="bg-black text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black shadow-lg"
          onClick={() => {
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Explore Collection
        </button>
      </div>
    </section>
  );
};

export default HeroGallery; 