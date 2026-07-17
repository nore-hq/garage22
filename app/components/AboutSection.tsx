"use client";

import styles from './AboutSection.module.css';
import ScrollReveal from './ScrollReveal';
import { useEffect, useRef } from 'react';

export default function AboutSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("About video autoplay blocked", e));
    }
  }, []);

  return (
    <section id="about" className={styles.about}>
      {/* Background Video */}
      <video
        ref={videoRef}
        className={styles.videoBg}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/garagre22-porche-video.mp4" type="video/mp4" />
      </video>
      <div className={styles.videoOverlay}></div>

      <div className={styles.container}>
        <ScrollReveal className={styles.content}>
          <h2 className={styles.title}>The Standard of Excellence</h2>
          <div className={styles.divider}></div>
          <p className={styles.text}>
            Located in the heart of Kazhakootam, Trivandrum, Garage 22 represents the pinnacle of automotive craftsmanship. We don't just repair vehicles; we restore them to their intended glory.
          </p>
          <p className={styles.text}>
            Our facility is equipped with state-of-the-art technology and staffed by master technicians who treat every automobile with the reverence it deserves. From routine maintenance to comprehensive detailing, experience unparalleled service designed for the most discerning car owners.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
