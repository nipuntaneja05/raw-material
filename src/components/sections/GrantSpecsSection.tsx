import { motion } from 'framer-motion';
import TextReveal from '../TextReveal';

const specs = [
  { number: "01", title: "The Cash.", value: "₹5k Grant.", description: "No strings attached." },
  { number: "02", title: "The Network.", value: "Direct access.", description: "To top industry mentors." },
  { number: "03", title: "The Community .", value: "Real Builders .", description: "To help you become 10X." },
  { number: "04", title: "The Visibility .", value: "Public Proofing .", description: "Showcase your work." },
];

export default function GrantSpecsSection() {
  return (
    <section className="min-h-screen py-32 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-xs font-satoshi tracking-[0.3em] text-muted-foreground mb-16 uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          The Specs
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
          {specs.map((spec, i) => (
            <motion.div
              key={i}
              className="grid-cell border-b border-r border-border p-6 sm:p-8 md:p-12 lg:p-16 cursor-pointer group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <span className="text-xs font-satoshi tracking-[0.3em] text-muted-foreground group-hover:text-background/60 transition-colors duration-300">
                  {spec.number}
                </span>

                <TextReveal delay={i * 0.1} className="mt-4">
                  <h3 className="font-syne text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-background transition-colors duration-300">
                    {spec.title}
                  </h3>
                </TextReveal>

                <h4 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground group-hover:text-background transition-colors duration-300 mt-4">
                  {spec.value}
                </h4>

                <p className="font-satoshi text-xs sm:text-sm text-muted-foreground group-hover:text-background/70 transition-colors duration-300 mt-4">
                  {spec.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
