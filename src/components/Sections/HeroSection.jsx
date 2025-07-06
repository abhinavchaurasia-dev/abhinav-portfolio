import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ scrollToSection }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 dark:bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 dark:bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 dark:bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-gray-900 dark:text-white">
              <span className="inline-block animate-wave">👋</span> Hi, I'm 
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Abhinav
            </span>
          </h1>

          <style jsx>{`
            @keyframes wave {
              0% { transform: rotate(0deg); }
              10% { transform: rotate(14deg); }
              20% { transform: rotate(-8deg); }
              30% { transform: rotate(14deg); }
              40% { transform: rotate(-4deg); }
              50% { transform: rotate(10deg); }
              60% { transform: rotate(0deg); }
              100% { transform: rotate(0deg); }
            }
            
            .animate-wave {
              animation: wave 2s ease-in-out infinite;
              transform-origin: 70% 70%;
            }
          `}</style>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4">
            Web Developer & AI Explorer
          </p>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            B.Tech CSE student crafting future-ready web solutions and building with AI innovations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="/resume.pdf"
              download="Abhinav_Chaurasia_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              📄 Download Resume
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-transparent rounded-full font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-300 flex items-center gap-2"
            >
              🚀 View Projects
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 bg-white dark:bg-transparent rounded-full font-semibold hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-all duration-300 flex items-center gap-2"
            >
              📬 Contact Me
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;