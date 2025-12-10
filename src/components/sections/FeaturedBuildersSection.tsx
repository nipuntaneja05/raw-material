import { useState } from 'react';
import { motion } from 'framer-motion';

const projects = [
  { id: 1, name: "NEURAL.OS", category: "AI Infrastructure", year: "2024" },
  { id: 2, name: "VOID.DEV", category: "Developer Tools", year: "2024" },
  { id: 3, name: "FLUX.SH", category: "Cloud Platform", year: "2024" },
  { id: 4, name: "ZERO.IO", category: "Web3 Protocol", year: "2024" },
];

export default function FeaturedBuildersSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="min-h-screen py-32 px-8 md:px-16 lg:px-24 bg-background-soft">
      <div className="max-w-7xl mx-auto">
        <motion.p 
          className="text-xs font-satoshi tracking-[0.3em] text-muted-foreground mb-16 uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Featured Builders
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="relative aspect-[4/3] bg-card overflow-hidden cursor-pointer group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Placeholder Image - Grayscale */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-background" />
              
              {/* Noise texture */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Project Info Overlay */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-background/90" />
                <div className="relative z-10 text-center">
                  <span className="text-xs font-satoshi tracking-[0.3em] text-muted-foreground uppercase">
                    {project.category}
                  </span>
                  <h3 className="font-syne text-display font-extrabold text-foreground mt-4">
                    {project.name}
                  </h3>
                  <span className="text-sm font-satoshi text-muted-foreground mt-4 block">
                    {project.year}
                  </span>
                </div>
              </motion.div>

              {/* Default State - Small Label */}
              <motion.div
                className="absolute bottom-6 left-6"
                animate={{ opacity: hoveredId === project.id ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xs font-satoshi tracking-[0.2em] text-foreground/60 uppercase">
                  {project.name}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
