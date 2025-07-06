import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage and system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialDarkMode = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    setIsDarkMode(initialDarkMode);
    updateTheme(initialDarkMode);
  }, []);

  const updateTheme = (darkMode) => {
    const root = document.documentElement;
    
    if (darkMode) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    updateTheme(newMode);
  };

  return [isDarkMode, setIsDarkMode, toggleDarkMode];
};

export { useDarkMode };
export default useDarkMode;