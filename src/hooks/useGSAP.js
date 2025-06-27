import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  const contextRef = useRef();

  useEffect(() => {
    contextRef.current = gsap.context(() => {});
    return () => contextRef.current?.revert();
  }, []);

  return contextRef.current;
};

export const useFadeInUp = (trigger, delay = 0) => {
  useEffect(() => {
    gsap.fromTo(
      trigger,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, [trigger, delay]);
};

export const useStaggerAnimation = (container, items) => {
  useEffect(() => {
    gsap.fromTo(
      `${container} ${items}`,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, [container, items]);
};