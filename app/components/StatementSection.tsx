"use client";

import InteractiveText from './InteractiveText';
import styles from './StatementSection.module.css';

export default function StatementSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <InteractiveText 
            text="THE EPITOME OF AUTOMOTIVE EXCELLENCE" 
            className={styles.title} 
            delayOffset={0.2} 
          />
          <div className={styles.divider}></div>
          <InteractiveText 
            text="Simply the best garage ever." 
            className={styles.subtitle} 
            delayOffset={1.5} 
          />
        </div>
      </div>
    </section>
  );
}
