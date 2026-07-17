"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './HeroSection.module.css';
import Link from 'next/link';
import Image from 'next/image';
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
      <div className={styles.videoWrapper}>
        <video
          ref={loopVideoRef}
          src="/videos/video-main.mp4"
          autoPlay
          muted
          loop
          playsInline
          className={styles.loopVideo}
        />
        <video
          ref={introVideoRef}
          src="/videos/into-video.mp4"
          autoPlay
          muted
          playsInline
          className={`${styles.introVideo} ${introFinished ? styles.fadeOut : ''}`}
          onEnded={() => setIntroFinished(true)}
        />
        {/* G22 Logo overlay inside the video wrapper so it perfectly tracks the Gemini watermark */}
        <div className={styles.watermarkCover}>
          <Image src="/images/logo.jpeg" alt="Garage 22" fill style={{ objectFit: 'contain' }} />
        </div>
      </div>

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
