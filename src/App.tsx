import { useState } from 'react';
import { motion } from 'framer-motion';
import PageLoader from './components/PageLoader';
import DockNav from './components/DockNav';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import PassionsSection from './components/PassionsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import GradualBlur from './components/react-bits/GradualBlur';
import { useLenis } from './hooks/useLenis';
import { useCustomCursor } from './hooks/useCustomCursor';

export default function App() {
  useLenis();
  useCustomCursor();

  const [loading, setLoading] = useState(true);

  return (
    <>
      <PageLoader onDone={() => setLoading(false)} />

      {/* Global sticky GradualBlur — always at bottom of viewport */}
      <GradualBlur
        position="bottom"
        height="6rem"
        strength={2.5}
        divCount={7}
        curve="bezier"
        exponential
        opacity={0.95}
        target="page"
        zIndex={45}
      />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={loading ? { y: 40, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
        className="relative"
      >
        <DockNav />

        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <PassionsSection />
          <ContactSection />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
