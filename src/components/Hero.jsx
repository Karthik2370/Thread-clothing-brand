import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const ctaRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(titleRef.current?.children,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.2'
    )
    .fromTo(scrollRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.1'
    );

    // Floating animation for scroll indicator
    gsap.to(scrollRef.current, {
      y: 10,
      duration: 1.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }, []);

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white relative overflow-hidden pt-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={titleRef} className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-4 tracking-tight">
            <span className="block">MINIMAL</span>
            <span className="block">THREADS</span>
          </h1>
        </div>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Discover premium t-shirts crafted for the modern minimalist. 
          Quality meets simplicity in every thread.
        </p>
        
        <div ref={ctaRef} className="mb-16">
          <button 
            onClick={scrollToProducts}
            className="bg-black text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Explore Collection
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToProducts}
      >
        <div className="flex flex-col items-center text-gray-500 hover:text-black transition-colors duration-300">
          <span className="text-sm mb-2 font-medium">Scroll Down</span>
          <ChevronDown size={20} />
        </div>
      </div>
    </section>
  );
};

export default Hero;