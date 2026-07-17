"use client";

import { useEffect, useState, useRef, createRef } from 'react';
import styles from './InteractiveText.module.css';

interface InteractiveTextProps {
  text: string;
  className?: string;
  delayOffset?: number;
}

export default function InteractiveText({ text, className = "", delayOffset = 0 }: InteractiveTextProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAssembled, setIsAssembled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Small delay to ensure CSS transitions trigger after initial render
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    // Calculate total time for the entrance animation to finish
    // Base 1.5s transition + max delay
    const totalChars = text.length;
    const maxDelay = totalChars * 15; // 0.015s * 1000
    
    const assembleTimer = setTimeout(() => {
      setIsAssembled(true);
    }, 1500 + maxDelay + 200);

    return () => {
      clearTimeout(timer);
      clearTimeout(assembleTimer);
    };
  }, [text]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Do absolutely nothing until the CSS entrance animation is completely finished!
    // Otherwise, mouse movements will rip the letters out of their assembly and break the layout.
    if (!isAssembled) return;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    charRefs.current.forEach((charNode) => {
      if (!charNode) return;
      const rect = charNode.getBoundingClientRect();
      const charX = rect.left + rect.width / 2;
      const charY = rect.top + rect.height / 2;

      const distX = mouseX - charX;
      const distY = mouseY - charY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      // Max distance for the wave effect
      const maxDistance = 150;
      
      if (distance < maxDistance) {
        // Calculate intensity based on distance (0 to 1)
        const intensity = 1 - distance / maxDistance;
        
        // Push the letters away slightly in 3D and lift them
        const xOffset = (distX / distance) * -15 * intensity;
        const yOffset = (distY / distance) * -15 * intensity - (10 * intensity);
        const rotateX = (distY / distance) * -30 * intensity;
        const rotateY = (distX / distance) * 30 * intensity;
        const scale = 1 + (0.3 * intensity);

        charNode.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        charNode.style.color = 'var(--color-accent)';
        charNode.style.textShadow = `0 10px 20px rgba(198, 168, 124, ${0.6 * intensity})`;
        // Use a slow, deliberate transition even when actively hovering
        charNode.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), color 0.6s ease, text-shadow 0.6s ease'; 
      } else {
        charNode.style.transform = '';
        charNode.style.color = '';
        charNode.style.textShadow = '';
        // Very slow, heavy spring back to normal
        charNode.style.transition = 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), color 1.2s ease, text-shadow 1.2s ease'; 
      }
    });
  };

  const handleMouseLeave = () => {
    if (!isAssembled) return;
    charRefs.current.forEach((charNode) => {
      if (!charNode) return;
      charNode.style.transform = '';
      charNode.style.color = '';
      charNode.style.textShadow = '';
      charNode.style.transition = 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), color 1.2s ease, text-shadow 1.2s ease';
    });
  };

  // Split text by words, then by characters to preserve word wrapping
  const words = text.split(" ");

  let charIndex = 0;

  return (
    <div 
      ref={containerRef} 
      className={`${styles.container} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className={styles.word}>
          {word.split("").map((char, cIdx) => {
            const currentIdx = charIndex++;
            // Generate deterministic pseudo-random values based on index for the scatter effect
            const randomX = (Math.sin(currentIdx * 12.3) * 100).toFixed(2);
            const randomY = (Math.cos(currentIdx * 43.1) * 100).toFixed(2);
            const randomRot = (Math.sin(currentIdx * 9.2) * 180).toFixed(2);
            
            // Drastically reduce the delay per character so long sentences don't take forever
            const delay = delayOffset + currentIdx * 0.015;

            return (
              <span
                key={cIdx}
                ref={(el) => { charRefs.current[currentIdx] = el; }}
                className={`${styles.char} ${isMounted ? styles.assembled : ''}`}
                style={{
                  transitionDelay: `${delay}s`,
                  // If not mounted, apply the scatter transforms. If mounted, it falls back to CSS class defaults (translate 0, rotate 0)
                  ...( !isMounted ? {
                    transform: `translate3d(${randomX}px, ${randomY}px, 0) rotateZ(${randomRot}deg) scale(0.5)`,
                    opacity: 0,
                    filter: 'blur(10px)'
                  } : {} )
                }}
              >
                {char}
              </span>
            );
          })}
          {/* Add a space after each word except the last one */}
          {wIdx < words.length - 1 && <span className={styles.space}>&nbsp;</span>}
        </span>
      ))}
    </div>
  );
}
