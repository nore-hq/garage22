"use client";

import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        // Snap instantly on return to avoid flying across the screen
        posRef.current = { x: e.clientX, y: e.clientY };
        targetRef.current = { x: e.clientX, y: e.clientY };
        isVisible = true;
        cursorRef.current?.classList.remove(styles.hidden);
        dotRef.current?.classList.remove(styles.hidden);
      }

      targetRef.current = { x: e.clientX, y: e.clientY };
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseLeaveWindow = () => {
      isVisible = false;
      cursorRef.current?.classList.add(styles.hidden);
      dotRef.current?.classList.add(styles.hidden);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleMouseLeaveWindow();
      }
    };

    let reqId: number;

    // Smooth trailing animation for the outer ring
    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.12;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${posRef.current.x}px`;
        cursorRef.current.style.top = `${posRef.current.y}px`;
      }
      reqId = requestAnimationFrame(animate);
    };

    // Scale up on hover over interactive elements
    const handleMouseEnter = () => {
      cursorRef.current?.classList.add(styles.hover);
      dotRef.current?.classList.add(styles.dotHover);
    };
    const handleMouseLeave = () => {
      cursorRef.current?.classList.remove(styles.hover);
      dotRef.current?.classList.remove(styles.dotHover);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    // Start initially hidden
    handleMouseLeaveWindow();

    animate();

    // Attach hover listeners to all interactive elements
    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      cancelAnimationFrame(reqId);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={styles.cursor}></div>
      <div ref={dotRef} className={styles.dot}></div>
    </>
  );
}
