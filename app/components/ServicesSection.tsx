"use client";

import styles from './ServicesSection.module.css';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';

const services = [
  {
    id: 1,
    title: 'Graphene & Ceramic Coatings',
    description: 'Premium 10H & 9H hydrophobic protection that shields your paint from UV rays, chemical stains, and minor scratches while delivering an unmatched, mirror-like gloss.'
  },
  {
    id: 2,
    title: 'Interior Detailing',
    description: 'Deep steam cleaning, leather restoration, anti-microbial treatment, and dashboard conditioning to restore your cabin to pristine, factory-fresh luxury.'
  },
  {
    id: 3,
    title: 'Exterior Detailing',
    description: 'Multi-stage foam wash, clay bar treatment, iron decontamination, and precision paint correction to remove swirl marks and reveal flawless depth.'
  },
  {
    id: 4,
    title: 'Complete Mechanical & Electrical Repairs',
    description: 'Expert diagnostics, engine overhauls, transmission servicing, suspension tuning, and complex wiring solutions handled by experienced specialists.'
  },
  {
    id: 5,
    title: 'Periodic Maintenance & Servicing',
    description: 'Manufacturer-recommended scheduled servicing, synthetic oil changes, filter replacements, and vital fluid top-ups to maintain peak performance.'
  },
  {
    id: 6,
    title: 'Denting & Booth Painting',
    description: 'Precision dent removal and factory-finish painting in a temperature-controlled dust-free booth, utilizing computerized color matching for seamless results.'
  },
  {
    id: 7,
    title: 'Advanced Collision Repair',
    description: 'Complete accident restoration using precision chassis alignment and genuine structural parts to ensure your vehicle meets original factory safety standards.'
  },
  {
    id: 8,
    title: 'Pre-Purchase Inspection',
    description: 'Comprehensive 150+ point inspection covering engine health, undercarriage, bodywork, and ECU scans so you can buy your next luxury vehicle with absolute confidence.'
  },
  {
    id: 9,
    title: '3D Wheel Alignment & Balancing',
    description: 'High-precision laser alignment and dynamic wheel balancing to eliminate steering vibrations, prevent uneven tire wear, and ensure straight-line stability.'
  },
  {
    id: 10,
    title: 'A/C Service & Repairs',
    description: 'Complete air conditioning system overhaul, refrigerant leak detection, compressor diagnostics, and anti-bacterial duct cleaning for crisp, ice-cold airflow.'
  }
];

// Added a custom 'scale' property to selectively zoom in specific logos
const brands = [
  { name: 'Apollo Tyres', logo: '/images/brands/apollo.png' },
  { name: 'CEAT', logo: '/images/brands/ceat.png' },
  { name: 'Bridgestone', logo: '/images/brands/bridgestone.png', scale: 1.50 },
  { name: 'Continental', logo: '/images/brands/continental.png' },
  { name: 'Goodyear', logo: '/images/brands/goodyear.png' },
  { name: 'Pirelli', logo: '/images/brands/pirelli.png', scale: 1.50 },
  { name: 'Yokohama', logo: '/images/brands/yokohama.png', scale: 1.50 },
  { name: 'Cooper Tires', logo: '/images/brands/cooper.png' },
];

export default function ServicesSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showBrochure, setShowBrochure] = useState(false);

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

          {/* Toggle Button */}
          <button
            className={styles.toggleBtn}
            onClick={() => setShowBrochure(!showBrochure)}
          >
            {showBrochure ? '← Back to Services Grid' : 'View Official Brochure →'}
          </button>
        </div>

        <ScrollReveal>
          {/* Viewport container holding both stacked views */}
          <div className={styles.viewPort}>

            {/* 1. Services Grid View */}
            <div className={`${styles.panel} ${styles.gridPanel} ${showBrochure ? styles.hiddenGrid : ''}`}>
              <div className={styles.grid}>
                {services.map((service) => (
                  <div key={service.id} className={styles.card}>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    <p className={styles.cardDesc}>{service.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Brochure Image View */}
            <div className={`${styles.panel} ${styles.brochurePanel} ${showBrochure ? styles.activeBrochure : ''}`}>
              <div className={styles.brochureWrapper}>
                <Image
                  src="/images/brochure.png"
                  alt="Official Services Brochure"
                  width={900}
                  height={1200}
                  className={styles.brochureImage}
                  priority={false}
                />
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* --- High-End Agency Logo Marquee --- */}
        <div className={styles.marqueeSection}>
          <p className={styles.marqueeTitle}>We Work With :</p>

          <div className={styles.marqueeContainer}>
            <div className={styles.marqueeTrack}>
              {[...brands, ...brands].map((brand, index) => (
                <div key={index} className={styles.brandCard}>
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={140}
                    height={50}
                    className={styles.brandImage}
                    style={{ transform: `scale(${brand.scale || 1})` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}