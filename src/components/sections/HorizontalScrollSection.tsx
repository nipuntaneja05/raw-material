import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const slides = [
  { text: "No Equity.", subtext: "Keep what you build." },
  { text: "No Pitch Decks.", subtext: "Show us the code." },
  { text: "Just Code.", subtext: "That's all we need." },
];

export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["hsl(0, 0%, 2%)", "hsl(0, 0%, 5%)", "hsl(0, 0%, 7%)"]
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-background"
    >
      <motion.div
        className="sticky top-0 h-screen flex items-center overflow-hidden"
        style={{ backgroundColor }}
      >
        <motion.p
          className="absolute top-8 left-4 sm:left-8 text-xs font-satoshi tracking-[0.3em] text-muted-foreground uppercase z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          The STRUCTURE
        </motion.p>

        <motion.div
          className="flex"
          style={{ x }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="w-screen h-screen flex flex-col items-center justify-center px-4 sm:px-8"
            >
              <motion.span
                className="text-xs font-satoshi tracking-[0.3em] text-muted-foreground mb-8 uppercase"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                0{i + 1}
              </motion.span>
              <h2 className="font-syne text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-foreground text-center px-4">
                {slide.text}
              </h2>
              <p className="font-satoshi text-base sm:text-lg md:text-xl text-muted-foreground mt-6 text-center max-w-md px-4">
                {slide.subtext}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
