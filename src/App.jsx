import React, { useState, useEffect } from 'react';
import Navigation from './components/Layout/Navigation';
import HeroSection from './components/Sections/HeroSection';
import AboutSection from './components/Sections/AboutSection';
import ProjectsSection from './components/Sections/ProjectsSection';
import SkillsSection from './components/Sections/SkillsSection';
import ExperienceSection from './components/Sections/ExperienceSection';
import CertificationsSection from './components/Sections/CertificationsSection';
import ContactSection from './components/Sections/ContactSection';
import Footer from './components/Layout/Footer';
import BackToTop from './components/UI/BackToTop';
import LoadingScreen from './components/UI/LoadingScreen';
import { useScrollTracking } from './hooks/useScrollTracking';
import { useDarkMode } from './hooks/useDarkMode';
import { scrollToSection } from './utils/scrollUtils';
import './App.css';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { activeSection, isScrolled, showBackToTop } = useScrollTracking();
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Navigation
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          activeSection={activeSection}
          isScrolled={isScrolled}
          scrollToSection={scrollToSection}
        />

        <HeroSection scrollToSection={scrollToSection} />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
        <Footer />

        <BackToTop 
          showBackToTop={showBackToTop} 
          scrollToSection={scrollToSection} 
        />
      </div>
    </div>
  );
};

export default Portfolio;