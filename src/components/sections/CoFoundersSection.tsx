import { motion } from 'framer-motion';

const founders = [
  {
    name: "Jahanvi Taneja",
    role: "Co-Founder",
    image: "/placeholder.svg"
  },
  {
    name: "Nipun Taneja",
    role: "Co-Founder",
    image: "/placeholder.svg"
  }
];

export default function CoFoundersSection() {
  return (
    <section className="py-32 px-8 md:px-16 lg:px-24 bg-background-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.p 
          className="text-xs font-satoshi tracking-[0.3em] text-muted-foreground mb-8 uppercase text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Ran By
        </motion.p>

        <motion.h2 
          className="font-syne text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          The Team
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-3xl mx-auto">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1] 
              }}
              viewport={{ once: true }}
            >
              {/* Image Placeholder */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 mb-8 group">
                <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/5 rounded-full" />
                <div className="w-full h-full rounded-full overflow-hidden border border-border bg-muted/10 flex items-center justify-center">
                  <div className="text-muted-foreground/50 font-satoshi text-sm tracking-wider uppercase">
                    Photo
                  </div>
                </div>
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-full bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Name */}
              <h3 className="font-syne text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
                {founder.name}
              </h3>

              {/* Role */}
              <p className="font-satoshi text-sm text-muted-foreground tracking-wider uppercase">
                {founder.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
