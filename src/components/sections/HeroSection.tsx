import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TextReveal from '../TextReveal';
// Import the new Neural Network component
import NeuralNetworkScene from '../NeuralNetworkScene';

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail(""); // Clear input
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white">

      {/* ------------------------------------------------------ */}
      {/* 1. BACKGROUND LAYER: NEURAL NETWORK SCENE              */}
      {/* ------------------------------------------------------ */}
      <div className="absolute inset-0 z-0">
        <NeuralNetworkScene />
      </div>

      {/* Corner Info */}
      <motion.div
        className="absolute top-8 left-8 text-xs font-satoshi text-neutral-500 tracking-widest z-20 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p>COHORT_1.0</p>
        <p className="mt-1">2026.EDITION</p>
      </motion.div>

      <motion.div
        className="absolute top-8 right-8 text-xs font-satoshi text-neutral-500 tracking-widest text-right z-20 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p>STATUS:</p>
        <p className="mt-1">LISTENING_ON_PORT_8080</p>
      </motion.div>

      {/* HERO TEXT */}
      <div className="relative z-10 text-center px-4 mb-12">
        <TextReveal delay={0.2}>
          <h1 className="font-syne font-extrabold tracking-tighter uppercase leading-[0.9] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.8)] text-6xl md:text-8xl lg:text-[8rem]">
            BUILDERS
          </h1>
        </TextReveal>

        <TextReveal delay={0.4}>
          <h1 className="font-syne font-extrabold tracking-tighter uppercase leading-[0.9] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.8)] text-6xl md:text-8xl lg:text-[8rem]">
            GRANT
          </h1>
        </TextReveal>
      </div>

      {/* WAITLIST FORM AREA */}
      <motion.div
        className="relative z-20 flex flex-col items-center gap-6 w-full max-w-md px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <AnimatePresence mode='wait'>
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-4 border border-green-500/30 bg-green-500/10 rounded-lg backdrop-blur-md"
            >
              <h3 className="text-xl font-bold text-green-400 mb-1">You're in! 🚀</h3>
              <p className="text-sm text-green-200/70">Check your inbox for confirmation.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col sm:flex-row gap-2 w-full"
            >
              <input
                type="email"
                placeholder="enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="
                  flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 
                  text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/40 
                  transition-all backdrop-blur-sm font-satoshi
                "
                required
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="
                  bg-white text-black font-bold px-6 py-3 rounded-lg
                  hover:bg-neutral-200 transition-colors disabled:opacity-50
                  font-satoshi tracking-wide
                "
              >
                {status === "loading" ? "JOINING..." : "JOIN WAITLIST"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Subtext */}
        {status === "error" && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs">
            Something went wrong. Please try again.
          </motion.p>
        )}

        {status === "idle" && (
          <motion.p
            className="text-xs md:text-sm font-satoshi text-neutral-500 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            Your Github matters more than your resume.
          </motion.p>
        )}
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