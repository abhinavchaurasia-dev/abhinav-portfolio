
import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) {
        return savedMode === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', isDarkMode.toString());

      document.documentElement.classList.remove('dark');
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      }

      // Add structured data for SEO
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Abhinav Chaurasia",
        "jobTitle": "Web Developer & AI Explorer",
        "description": "B.Tech CSE student crafting future-ready web solutions and building with AI innovations",
        "url": "https://abhinavchaurasia.vercel.app",
        "sameAs": [
          "https://github.com/Abhinav-Chaurasia-220304",
          "https://www.linkedin.com/in/abhinav-chaurasia-83741b257",
          "https://x.com/Abhinav_C_22"
        ],
        "alumniOf": "University of Lucknow",
        "knowsAbout": ["Web Development", "React", "Node.js", "MongoDB", "Artificial Intelligence", "JavaScript", "Python"],
        "email": "abhinavc037@gmail.com"
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);

      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }
      document.head.appendChild(script);
    }
  }, [isDarkMode]);

  return { isDarkMode, setIsDarkMode };
};
