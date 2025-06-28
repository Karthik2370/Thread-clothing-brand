import React, { useRef, useEffect } from 'react';
import { Award, Truck, RefreshCw } from 'lucide-react';
import { useFadeInUp, useStaggerAnimation } from '../hooks/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef();
  const storyTextRef = useRef();
  const storyImgRef = useRef();
  
  useFadeInUp('.about-header');
  useStaggerAnimation('.features-grid', '.feature-item');

  useEffect(() => {
    if (storyTextRef.current && storyImgRef.current) {
      gsap.fromTo(
        storyTextRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: storyTextRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo(
        storyImgRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: storyImgRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Crafted from the finest materials with attention to every detail. Our t-shirts are built to last and improve with every wear.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Free shipping on all orders over ₹2000. Express delivery available. Your perfect tee is just days away.'
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      description: '30-day hassle-free returns. Not satisfied? Send it back for a full refund, no questions asked.'
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="about-header text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 transition-colors duration-300">
            Why Choose Thread?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            We believe in the power of simplicity. Every piece in our collection 
            is thoughtfully designed to elevate your wardrobe with timeless style 
            and uncompromising quality.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-item text-center p-6 sm:p-8 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-full mb-6 transition-colors duration-300">
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div ref={storyTextRef}>
            <h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-6 transition-colors duration-300">Our Story</h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
              <p>
                Founded in 2020, Thread emerged from a simple idea: clothing should be 
                beautiful, comfortable, and sustainable. We set out to create the perfect 
                t-shirt collection for the modern minimalist.
              </p>
              <p>
                Every piece is carefully crafted using premium materials and ethical 
                manufacturing processes. We believe in quality over quantity, creating 
                pieces that will be treasured for years to come.
              </p>
              <p>
                Today, Thread continues to push the boundaries of minimalist fashion, 
                proving that simple can be extraordinary.
              </p>
            </div>
          </div>
          <div className="relative" ref={storyImgRef}>
            <img 
              src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="About us"
              className="rounded-lg shadow-lg w-full h-64 sm:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;