import styles from './AboutSection.module.css';
import ScrollReveal from './ScrollReveal';

export default function AboutSection() {
  return (
    <section id="about" className={styles.about}>
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
