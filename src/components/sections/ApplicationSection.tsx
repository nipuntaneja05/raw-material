import { useState } from 'react';
import { motion } from 'framer-motion';
import TextReveal from '../TextReveal';

export default function ApplicationSection() {
  const [link, setLink] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (link.trim()) {
      alert(`Submitted: ${link}`);
      setLink('');
    }
  };

  return (
    <section 
      id="application"
      className="min-h-screen flex items-center py-32 px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-4xl mx-auto w-full">
        <motion.p 
          className="text-xs font-satoshi tracking-[0.3em] text-muted-foreground mb-16 uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Application
        </motion.p>

        <TextReveal>
          <h2 className="font-syne text-title font-extrabold text-foreground mb-4">
            Show us what
          </h2>
        </TextReveal>
        <TextReveal delay={0.1}>
          <h2 className="font-syne text-title font-extrabold text-foreground mb-16">
            you built.
          </h2>
        </TextReveal>

        <motion.form 
          onSubmit={handleSubmit}
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Terminal-style Input */}
          <div className="relative">
            <div className="flex items-center gap-4 font-mono text-sm text-muted-foreground mb-2">
              <span className="text-foreground">→</span>
              <span>paste_link</span>
            </div>
            
            <div className={`relative border-b-2 transition-colors duration-300 ${isFocused ? 'border-foreground' : 'border-border'}`}>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="github.com/you/project"
                className="w-full bg-transparent font-satoshi text-xl md:text-2xl text-foreground placeholder:text-muted-foreground/40 py-4 focus:outline-none"
              />
              {isFocused && !link && (
                <span className="terminal-cursor absolute right-0 top-1/2 -translate-y-1/2" />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="group relative overflow-hidden border border-foreground px-12 py-4 font-syne text-lg font-bold uppercase tracking-wider text-foreground transition-colors duration-500 hover:text-background"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Ship It</span>
            <motion.div
              className="absolute inset-0 bg-foreground"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.button>

          <p className="text-xs font-satoshi text-muted-foreground/60 mt-8">
            We accept GitHub repos, live demos, or any link to your work.
            <br />
            No pitch decks. No slide shows. Just the thing you made.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
