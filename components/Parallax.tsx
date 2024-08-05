'use client';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { useWindowSize } from '@studio-freight/hamo';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface WindowSize {
  width: number;
  height: number;
}

export function Parallax({
  className,
  children,
  speed = 1,
  id = 'parallax',
}: {
  className?: string;
  children?: React.ReactNode;
  speed?: number;
  id?: string;
}) {
  const trigger = useRef<HTMLDivElement>(null); // this is the element that will trigger the animation
  const target = useRef<HTMLDivElement>(null); // this is the element that will be animated
  const timeline = useRef<gsap.core.Timeline>(); // this is the timeline of the animation that will be created by gsap
  const windowSize = useWindowSize(); // Get window size
  const { width: windowWidth, height: windowHeight } =
    (windowSize as WindowSize) || {
      width: 0,
      height: 0,
    };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!trigger.current || !target.current) return;

    const y = windowWidth * speed * 0.1;
    const setY = gsap.quickSetter(target.current, 'y', 'px');

    timeline.current = gsap.timeline({
      scrollTrigger: {
        id: id,
        trigger: trigger.current, // this is the element that will trigger the animation
        scrub: true, // this will make the animation smooth and not jumpy when scrolling up and down the page
        start: 'top bottom', // this means the animation will start when the top of the trigger element reaches the bottom of the viewport
        end: 'bottom top', // this means the animation will end when the bottom of the trigger element reaches the top of the viewport
        onUpdate: (e) => {
          setY(e.progress * y);
        },
      },
    });

    return () => {
      timeline.current?.kill(); // this will kill the animation when the component unmounts
    };
  }, [id, speed, windowWidth]);

  return (
    <div ref={trigger} className={className}>
      <div ref={target}>{children}</div>
    </div>
  );
}
