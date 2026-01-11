import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MagneticButton from '../MagneticButton';
import TextReveal from '../TextReveal';
// Import the new Neural Network component
import NeuralNetworkScene from '../NeuralNetworkScene';

export default function HeroSection() {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate('/applications');
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* ------------------------------------------------------ */}
      {/* 1. BACKGROUND LAYER: NEURAL NETWORK SCENE              */}
      {/* ------------------------------------------------------ */}
      <div className="absolute inset-0 z-0">
        <NeuralNetworkScene />
      </div>

      {/* Corner Info */}
      <motion.div
        className="absolute top-8 left-8 text-xs font-satoshi text-muted-foreground tracking-widest z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p>COHORT_1.0</p>
        <p className="mt-1">2026.EDITION</p>
      </motion.div>

      <motion.div
        className="absolute top-8 right-8 text-xs font-satoshi text-muted-foreground tracking-widest text-right z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p>STATUS:</p>
        <p className="mt-1">LISTENING_ON_PORT_8080</p>
      </motion.div>

      {/* HERO TEXT: HOLLOW / OUTLINED STYLE (As requested in your snippet) */}
      <div className="relative z-10 text-center px-4">
        <TextReveal delay={0.2}>
          <h1
            className="
              font-syne
              font-extrabold
              tracking-tighter
              uppercase
              leading-[0.9]
              /* 1. Make the inside transparent */
              text-transparent
              /* 2. Add the White Stroke explicitly */
              [-webkit-text-stroke:2px_white]
              /* Sizes */
              text-6xl md:text-8xl lg:text-[8rem]
            "
          >
            BUILDERS
          </h1>
        </TextReveal>

        <TextReveal delay={0.4}>
          <h1
            className="
              font-syne
              font-extrabold
              tracking-tighter
              uppercase
              leading-[0.9]
              /* 1. Make the inside transparent */
              text-transparent
              /* 2. Add the White Stroke explicitly */
              [-webkit-text-stroke:2px_white]
              /* Sizes */
              text-6xl md:text-8xl lg:text-[8rem]
            "
          >
            GRANT
          </h1>
        </TextReveal>
      </div>

      {/* CTA */}
      <motion.div
        className="absolute bottom-24 md:bottom-32 z-20 flex flex-col items-center gap-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <MagneticButton onClick={handleApplyClick}>APPLY</MagneticButton>
        <motion.p
          className="text-sm md:text-base font-satoshi text-muted-foreground/80 tracking-wide"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          Your Github matters more than ur resume.
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}