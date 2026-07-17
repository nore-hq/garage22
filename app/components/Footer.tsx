import styles from './Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandInfo}>
            <div className={styles.footerLogoWrapper}>
              <Image src="/images/logo.jpeg" alt="Garage 22 Logo" fill style={{ objectFit: 'contain' }} />
            </div>
            <h2 className={styles.logoText}>GARAGE 22</h2>
            <p className={styles.desc}>
              The ultimate destination for luxury automotive care in Kerala. We redefine perfection with every service.
            </p>
          </div>
          
          <div className={styles.contactInfo}>
            <h3 className={styles.heading}>Visit Us</h3>
            <p className={styles.detail}>Kazhakootam-Kilimanoor Road</p>
            <p className={styles.detail}>Kazhakuttam, Thiruvananthapuram</p>
            <p className={styles.detail}>Kerala, India</p>
            <Link 
              href="https://maps.app.goo.gl/nG69VWLVmY6ApBh38" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.mapLink}
            >
              View on Google Maps
            </Link>
          </div>

          <div className={styles.contactInfo}>
            <h3 className={styles.heading}>Connect</h3>
            <p className={styles.detail}>Phone: +91 98765 43210</p>
            <p className={styles.detail}>Email: service@garage22.in</p>
            <div className={styles.socials}>
              <Link 
                href="https://www.instagram.com/garage_2_2?igsh=MXZwd3htbmQ0MHI0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink}
              >
                Instagram
              </Link>
            </div>
          </div>
        </div>
        
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} Garage 22. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
