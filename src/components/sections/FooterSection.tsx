import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About', href: '#' },
      { label: 'Manifesto', href: '#manifesto' },
      // { label: 'Apply', href: '#application' },
    ],
    social: [
      { label: 'Twitter', href: 'https://x.com/buildersgrant' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/builders-grant/?viewAsMember=true' },
      // { label: 'Email', href: 'mailto:hello@buildersgrant.com' },
    ],
    // legal: [
    //   { label: 'Terms of Service', href: '#' },
    //   { label: 'Privacy Policy', href: '#' },
    //   { label: 'Cookie Policy', href: '#' },
    // ],
  };

  return (
    <footer className="bg-background border-t border-border">
      {/* Main Footer Content */}
      <div className="py-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Large Brand Name */}
          <motion.h2
            className="font-syne text-5xl md:text-7xl lg:text-8xl font-extrabold text-foreground mb-20 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            BUILDERS
            <br />
            GRANT.
          </motion.h2>

          {/* Links Grid */}
          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8 mb-16 max-w-5xl mx-auto w-full">
            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <h4 className="font-satoshi text-xs tracking-[0.2em] text-muted-foreground uppercase mb-6">
                Company
              </h4>
              <nav className="flex flex-col gap-4">
                {footerLinks.company.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-satoshi text-sm text-foreground/80 hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-left md:text-right"
            >
              <h4 className="font-satoshi text-xs tracking-[0.2em] text-muted-foreground uppercase mb-6">
                Connect
              </h4>
              <nav className="flex flex-col gap-4 md:items-end">
                {footerLinks.social.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-satoshi text-sm text-foreground/80 hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>

            {/* Legal */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="font-satoshi text-xs tracking-[0.2em] text-muted-foreground uppercase mb-6">
                Legal
              </h4>
              <nav className="flex flex-col gap-4">
                {footerLinks.legal.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-satoshi text-sm text-foreground/80 hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div> */}
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-3 font-satoshi text-xs text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase tracking-wider mx-auto mb-16"
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
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border py-6 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-satoshi text-muted-foreground/60">
            © {currentYear} The Builders Grant. All rights reserved.
          </p>
          <p className="text-xs font-satoshi text-muted-foreground/40">
            Built with obsession.
          </p>
        </div>
      </div>
    </footer>
  );
}
