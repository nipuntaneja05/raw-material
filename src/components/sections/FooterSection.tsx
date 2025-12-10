import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="min-h-[60vh] flex flex-col justify-between py-16 px-8 md:px-16 lg:px-24 border-t border-border">
      <div className="flex-1 flex items-center justify-center">
        <motion.h2 
          className="font-syne text-display md:text-hero font-extrabold text-foreground text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          BUILDERS
          <br />
          GRANT.
        </motion.h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Links */}
        <motion.nav 
          className="flex gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {['Manifesto', 'Twitter', 'Email'].map((link) => (
            <a
              key={link}
              href="#"
              className="font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase tracking-wider"
            >
              {link}
            </a>
          ))}
        </motion.nav>

        {/* Back to Top */}
        <motion.button
          onClick={scrollToTop}
          className="group flex items-center gap-3 font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase tracking-wider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ y: -2 }}
        >
          <span>Back to top</span>
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
        </motion.button>
      </div>

      {/* Copyright */}
      <motion.p 
        className="text-xs font-satoshi text-muted-foreground/40 text-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        viewport={{ once: true }}
      >
        © 2024 The Builders Grant. All rights reserved.
      </motion.p>
    </footer>
  );
}
