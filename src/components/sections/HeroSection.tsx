import { motion } from 'framer-motion';
import MagneticButton from '../MagneticButton';
import TextReveal from '../TextReveal';

export default function HeroSection() {
  const scrollToApplication = () => {
    const element = document.getElementById('application');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Corner Technical Text */}
      <motion.div 
        className="absolute top-8 left-8 text-xs font-satoshi text-muted-foreground tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p>BATCH_01</p>
        <p className="mt-1">2024.EDITION</p>
      </motion.div>

      <motion.div 
        className="absolute top-8 right-8 text-xs font-satoshi text-muted-foreground tracking-widest text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p>STATUS: OPEN</p>
        <p className="mt-1">APPLICATIONS</p>
      </motion.div>

      {/* Main Hero Text */}
      <div className="relative z-10 text-center px-4">
        <TextReveal delay={0.2}>
          <h1 className="font-syne text-hero font-extrabold text-foreground drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
            RAW.
          </h1>
        </TextReveal>
        <TextReveal delay={0.4}>
          <h1 className="font-syne text-hero font-extrabold text-foreground -mt-4 md:-mt-8 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
            TALENT.
          </h1>
        </TextReveal>
      </div>

      {/* CTA Button */}
      <motion.div
        className="absolute bottom-24 md:bottom-32"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <MagneticButton onClick={scrollToApplication}>
          Apply
        </MagneticButton>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-foreground/50 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
