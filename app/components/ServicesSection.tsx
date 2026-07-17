"use client";

import styles from './ServicesSection.module.css';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';

const services = [
  {
    id: 1,
    title: 'Precision Maintenance',
    description: 'Comprehensive diagnostics and routine servicing to ensure optimal performance.',
    image: '/images/range-rover-image-front-of-garage22.jpeg'
  },
  {
    id: 2,
    title: 'Expert Repairs',
    description: 'Advanced mechanical and electrical repairs conducted by our master technicians.',
    image: '/images/lambo-at-night.png'
  },
  {
    id: 3,
    title: 'Premium Detailing',
    description: 'Meticulous cleaning, polishing, and protection to preserve your vehicle\'s immaculate finish.',
    image: '/images/Gemini_Generated_Image_xeh4fixeh4fixeh4.png'
  }
];

export default function ServicesSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Services video autoplay blocked", e));
    }
  }, []);

  return (
    <section id="services" className={styles.services}>
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
        <div className={styles.header}>
          <h2 className={styles.title}>Our Services</h2>
          <div className={styles.divider}></div>
        </div>

        <ScrollReveal className={styles.sliderContainer}>
          <button className={`${styles.sliderBtn} ${styles.prevBtn}`} onClick={prevSlide} aria-label="Previous service">
            &larr;
          </button>
          
          <div className={styles.sliderViewport}>
            <div 
              className={styles.sliderTrack} 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {services.map((service, index) => (
                <div key={service.id} className={styles.slide}>
                  <div className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, 80vw"
                      />
                      <div className={styles.imageOverlay}></div>
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{service.title}</h3>
                      <p className={styles.cardDesc}>{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className={`${styles.sliderBtn} ${styles.nextBtn}`} onClick={nextSlide} aria-label="Next service">
            &rarr;
          </button>
        </ScrollReveal>
        
        <div className={styles.sliderDots}>
          {services.map((_, index) => (
            <button 
              key={index} 
              className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
