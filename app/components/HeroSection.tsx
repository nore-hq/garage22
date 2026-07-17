"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './HeroSection.module.css';
import Link from 'next/link';
import InteractiveText from './InteractiveText';

export default function HeroSection() {
  const [introFinished, setIntroFinished] = useState(false);
  const loopVideoRef = useRef<HTMLVideoElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loopVideoRef.current) {
      loopVideoRef.current.play().catch(e => console.log("Loop video autoplay blocked", e));
    }
    if (introVideoRef.current) {
      introVideoRef.current.play().catch(e => console.log("Intro video autoplay blocked", e));
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!contentRef.current) return;
      // Calculate slight offset based on mouse position relative to center of screen
      const x = (window.innerWidth / 2 - e.clientX) / 40;
      const y = (window.innerHeight / 2 - e.clientY) / 40;
      contentRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Background looping video */}
      <video
        ref={loopVideoRef}
        className={`${styles.videoBg} ${styles.loopVideo}`}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/video-main.mp4" type="video/mp4" />
      </video>

      {/* Intro video on top */}
      <video
        ref={introVideoRef}
        className={`${styles.videoBg} ${styles.introVideo} ${introFinished ? styles.fadeOut : ''}`}
        autoPlay
        muted
        playsInline
        onEnded={() => setIntroFinished(true)}
      >
        <source src="/videos/into-video.mp4" type="video/mp4" />
      </video>

      <div className={styles.overlay}></div>
      
      <div ref={contentRef} className={styles.content}>
        <InteractiveText text="Perfection in Motion" className={styles.title} delayOffset={0.2} />
        <InteractiveText text="The pinnacle of automotive care in Trivandrum. Elevating your vehicle to its finest state." className={styles.subtitle} delayOffset={0.8} />
        <div className={styles.actions}>
          <Link href="#services" className={styles.primaryBtn}>Explore Services</Link>
        </div>
      </div>
    </section>
  );
}
