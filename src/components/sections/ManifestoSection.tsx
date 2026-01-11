import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const words = "We don't fund business plans. We fund the obsession to build. The late nights. The half-finished GitHub repos. The ideas that keep you up at night. If you're building something real, we want in.".split(' ');

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="min-h-screen flex items-center py-32 px-8 md:px-16 lg:px-24 bg-background/95 backdrop-blur-sm"
    >
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-xs font-satoshi tracking-[0.3em] text-muted-foreground mb-16 uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          The Manifesto
        </motion.p>

        <p className="font-syne text-xl sm:text-2xl md:text-4xl lg:text-5xl leading-relaxed font-medium">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;

            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}

function Word({ children, progress, range }: {
  children: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <motion.span
      className="inline-block mr-[0.25em] transition-colors duration-300"
      style={{ opacity }}
    >
      {children}
    </motion.span>
  );
}
