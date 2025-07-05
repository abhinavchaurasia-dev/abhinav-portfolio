
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './App.css';
import { 
  Menu, X, Github, Linkedin, Twitter, Mail, ExternalLink, 
  Download, User, Code, Briefcase, Award, Phone, Sun, Moon,
  Calendar, MapPin, ChevronRight, Star, Zap, Database, Globe,
  Cpu, Smartphone, Cloud, Book, Target, Users, CheckCircle,
  Send, ArrowUp, Eye, Play, Pause
} from 'lucide-react';

// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || 
             (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const observerRef = useRef(null);
  const formRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      setShowBackToTop(scrollPosition > 300);
    };

    const observerOptions = {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    observerRef.current = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      observerRef.current.observe(section);
    });

    window.addEventListener('scroll', handleScroll);

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const result = await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        formRef.current,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );
      
      console.log('Email sent successfully:', result.text);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  const projects = [
    {
      title: "InternTrackr",
      subtitle: "Internship Progress Tracker",
      description: "A full-stack platform for students to log internship details, track tasks, and store mentor feedback – all in one dashboard.",
      tech: ["MongoDB", "Express.js", "React", "Node.js"],
      github: "https://github.com/Abhinav-Chaurasia-220304/interntrackr",
      live: "https://interntrackr.vercel.app",
      icon: Target,
      featured: true
    },
    {
      title: "CoverGenie",
      subtitle: "AI-Powered Cover Letter Generator",
      description: "Generates personalized cover letters using GenAI APIs by analyzing resumes and job descriptions – tailored for every opportunity.",
      tech: ["React", "OpenRouter API", "LangChain"],
      github: "https://github.com/Abhinav-Chaurasia-220304/covergenie",
      live: "https://covergenie.vercel.app",
      icon: Cpu,
      featured: true
    },
    {
      title: "SnapNoteQR",
      subtitle: "QR Notepad for Fast Sharing",
      description: "Type notes and share them instantly as QR codes. Simplify how you capture and share ideas on the go.",
      tech: ["HTML", "TailwindCSS", "JavaScript", "QR APIs"],
      github: "https://github.com/Abhinav-Chaurasia-220304/snapnoteqr",
      live: "https://snapnoteqr.vercel.app",
      icon: Smartphone,
      featured: false
    }
  ];

  const skillCategories = [
    {
      category: "Languages",
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "Python", level: 85 },
        { name: "SQL", level: 80 }
      ],
      icon: Code
    },
    {
      category: "Frontend",
      skills: [
        { name: "React", level: 90 },
        { name: "HTML", level: 95 },
        { name: "CSS", level: 90 },
        { name: "Tailwind", level: 85 }
      ],
      icon: Globe
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 80 }
      ],
      icon: Database
    },
    {
      category: "Databases",
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "MySQL", level: 80 }
      ],
      icon: Database
    },
    {
      category: "AI Tools",
      skills: [
        { name: "OpenRouter", level: 75 },
        { name: "LangChain", level: 70 },
        { name: "Prompt Engineering", level: 80 }
      ],
      icon: Cpu
    },
    {
      category: "Dev Tools",
      skills: [
        { name: "Git", level: 90 },
        { name: "GitHub", level: 90 },
        { name: "VS Code", level: 95 },
        { name: "Postman", level: 85 }
      ],
      icon: Code
    },
    {
      category: "Cloud & Deployment",
      skills: [
        { name: "Netlify", level: 80 },
        { name: "Vercel", level: 85 }
      ],
      icon: Cloud
    }
  ];

  const certifications = [
    {
      title: "Microsoft Certified: Azure AI Fundamentals",
      issuer: "Microsoft",
      date: "Oct 2024",
      icon: "🏅",
      credentialId: "AI-100",
      skills: ["Azure AI", "Machine Learning", "Cognitive Services"]
    },
    {
      title: "Google IT Automation with Python",
      issuer: "Google",
      date: "Jun 2024",
      icon: "🧰",
      credentialId: "PY-AUTO-2024",
      skills: ["Python", "Automation", "Git"]
    },
    {
      title: "Google IT Support Specialization",
      issuer: "Google",
      date: "Jun 2024",
      icon: "🔧",
      credentialId: "IT-SUP-2024",
      skills: ["IT Support", "Networking", "Security"]
    },
    {
      title: "Google UX Design Specialization",
      issuer: "Google",
      date: "Jun 2024",
      icon: "🎨",
      credentialId: "UX-DES-2024",
      skills: ["User Research", "Prototyping", "Design Systems"]
    },
    {
      title: "Reinforcement Learning",
      issuer: "University of Alberta",
      date: "Jun 2024",
      icon: "🧠",
      credentialId: "RL-2024",
      skills: ["Machine Learning", "AI", "Python"]
    }
  ];

  const stats = [
    { label: "Projects Completed", value: "15+", icon: Code },
    { label: "Technologies", value: "20+", icon: Zap },
    { label: "Certifications", value: "5", icon: Award },
    { label: "Years Learning", value: "3+", icon: Book }
  ];

  const experience = [
    {
      title: "Campus Ambassador",
      company: "GeeksforGeeks",
      period: "Jul 2023 – Jul 2024",
      type: "Remote Internship",
      location: "Remote",
      description: "Organized campus-wide GfG initiatives, created promotional tech content, and acted as college POC for GfG events.",
      responsibilities: [
        "Organized campus-wide GfG initiatives",
        "Created promotional tech content",
        "Acted as college POC for GfG events"
      ],
      icon: Users
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-200/20 dark:border-gray-700/20' : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0"
              >
                <button onClick={() => scrollToSection('home')} className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Abhinav
                </button>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        activeSection === item.id
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Dark Mode Toggle */}
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleDarkMode}
                  className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  <AnimatePresence mode="wait">
                    {isDarkMode ? (
                      <motion.div
                        key="sun"
                        initial={{ opacity: 0, rotate: -180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Sun className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ opacity: 0, rotate: 180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Moon className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Toggle menu"
                  >
                    <AnimatePresence mode="wait">
                      {isMenuOpen ? (
                        <motion.div
                          key="close"
                          initial={{ opacity: 0, rotate: -90 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X className="h-6 w-6" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ opacity: 0, rotate: 90 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: -90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Menu className="h-6 w-6" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2 ${
                        activeSection === item.id
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              animate={{ 
                x: [0, 100, 0],
                y: [0, -100, 0],
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            />
            <motion.div 
              animate={{ 
                x: [0, -100, 0],
                y: [0, 100, 0],
              }}
              transition={{ 
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ 
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                <motion.span 
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="inline-block text-4xl md:text-6xl"
                >
                  👋
                </motion.span>{' '}
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Abhinav
                </span>
              </motion.h1>

              <motion.h2 
                variants={fadeInUp}
                className="text-xl md:text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300"
              >
                Web Developer & AI Explorer
              </motion.h2>

              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              >
                B.Tech CSE student crafting future-ready web solutions and building with AI innovations.
              </motion.p>

              {/* Stats */}
              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-gray-700/20"
                  >
                    <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Download className="h-5 w-5 group-hover:animate-bounce" />
                  Download Resume
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('projects')}
                  className="group border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Code className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  View Projects
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">About Me</motion.h2>
              <motion.div variants={fadeInUp} className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></motion.div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="space-y-6"
              >
                <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  I'm Abhinav, a final-year Computer Science student at the University of Lucknow. 
                  Passionate about building smart web applications and exploring Generative AI, I turn 
                  ideas into impactful digital solutions.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  I constantly upgrade my skills through hands-on projects, certifications, and 
                  collaborative learning. My goal is to bridge the gap between traditional web 
                  development and cutting-edge AI technologies.
                </motion.p>

                <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                  <motion.div whileHover={{ scale: 1.05 }} className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center group transition-transform duration-300">
                    <Book className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2 group-hover:animate-pulse" />
                    <h3 className="font-semibold text-sm">B.Tech CSE'26</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">@ University of Lucknow</p>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center group transition-transform duration-300">
                    <Globe className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2 group-hover:animate-pulse" />
                    <h3 className="font-semibold text-sm">MERN Stack</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Developer</p>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg text-center group transition-transform duration-300">
                    <Cpu className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2 group-hover:animate-pulse" />
                    <h3 className="font-semibold text-sm">Generative AI</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Enthusiast</p>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="flex justify-center"
              >
                <div className="relative">
                  <div className="w-80 h-80 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                    <div className="w-72 h-72 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <User className="h-32 w-32 text-gray-400" />
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</motion.h2>
              <motion.div variants={fadeInUp} className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></motion.div>
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Here are some of my recent projects showcasing my skills in web development and AI integration.
              </motion.p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`group bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    project.featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                  }`}
                >
                  {project.featured && (
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold px-3 py-1 text-center">
                      Featured Project
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg mr-4"
                      >
                        <project.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{project.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <motion.a 
                        href={project.github} 
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/link"
                      >
                        <Github className="h-4 w-4 group-hover/link:animate-pulse" />
                        GitHub
                      </motion.a>
                      <motion.a 
                        href={project.live} 
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/link"
                      >
                        <ExternalLink className="h-4 w-4 group-hover/link:animate-pulse" />
                        Live Demo
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</motion.h2>
              <motion.div variants={fadeInUp} className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></motion.div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {skillCategories.map((category, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center mb-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg mr-4"
                    >
                      <category.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold">{category.category}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {skill.name}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: skillIndex * 0.1 }}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">Work Experience</motion.h2>
              <motion.div variants={fadeInUp} className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></motion.div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              {experience.map((exp, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg"
                    >
                      <exp.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {exp.title}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {exp.period}
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
                          {exp.company}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs mr-2">
                            {exp.type}
                          </span>
                          <MapPin className="h-4 w-4 mr-1" />
                          {exp.location}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {exp.description}
                      </p>
                      <div className="space-y-2">
                        {exp.responsibilities.map((resp, respIndex) => (
                          <div key={respIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{resp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">Certifications</motion.h2>
              <motion.div variants={fadeInUp} className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></motion.div>
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400">
                Professional certifications and achievements
              </motion.p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center mb-4">
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="text-3xl mr-3"
                    >
                      {cert.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight">
                        {cert.title}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    {cert.date}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Credential ID: {cert.credentialId}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
                Get In Touch
              </motion.h2>
              <motion.div variants={fadeInUp} className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></motion.div>
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Have a project in mind or want to collaborate? I'd love to hear from you!
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
              >
                <h3 className="text-2xl font-bold mb-6">Send Message</h3>
                <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-md font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                  
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-600 dark:text-green-400 text-center"
                    >
                      Message sent successfully!
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 dark:text-red-400 text-center"
                    >
                      Failed to send message. Please try again.
                    </motion.div>
                  )}
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="space-y-8"
              >
                <motion.div variants={fadeInUp}>
                  <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    I'm always open to discussing new opportunities, creative ideas or partnerships.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-4">
                  <motion.a
                    href="mailto:abhinavc037@gmail.com"
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Mail className="h-6 w-6" />
                    <span>abhinavc037@gmail.com</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://github.com/Abhinav-Chaurasia-220304"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Github className="h-6 w-6" />
                    <span>GitHub</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://www.linkedin.com/in/abhinav-chaurasia-83741b257"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                    <span>LinkedIn</span>
                  </motion.a>

                  <motion.a
                    href="https://x.com/Abhinav_C_22"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Twitter className="h-6 w-6" />
                    <span>Twitter</span>
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-400">
                  © 2025 Abhinav Chaurasia. Built with ❤️ using React & TailwindCSS
                </p>
              </div>
              <div className="flex space-x-6">
                <motion.a 
                  href="https://github.com/Abhinav-Chaurasia-220304" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/abhinav-chaurasia-83741b257" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a 
                  href="https://x.com/Abhinav_C_22" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
                <motion.a 
                  href="mailto:abhinavc037@gmail.com" 
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </footer>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
              aria-label="Back to top"
            >
              <ArrowUp className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Main App component with Router
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
      </Routes>
    </Router>
  );
};

export default App;
