import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { 
  Menu, X, Github, Linkedin, Twitter, Mail, ExternalLink, 
  Download, User, Code, Briefcase, Award, Phone, Sun, Moon,
  Calendar, MapPin, ChevronRight, Star, Zap, Database, Globe,
  Cpu, Smartphone, Cloud, Book, Target, Users, CheckCircle,
  Send, ArrowUp, Eye, Play, Pause
} from 'lucide-react';

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
  const sectionsRef = useRef([]);

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
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-200/20 dark:border-gray-700/20' : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <button onClick={() => scrollToSection('home')} className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
                  Abhinav
                </button>
              </div>
              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        activeSection === item.id
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Dark Mode Toggle */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Toggle menu"
                  >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2 ${
                      activeSection === item.id
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
                <span className="wave text-4xl md:text-6xl">👋</span> Hi, I'm{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Abhinav
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Web Developer & AI Explorer
              </h2>
              <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                B.Tech CSE student crafting future-ready web solutions and building with AI innovations.
              </p>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-gray-700/20">
                    <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Download className="h-5 w-5 group-hover:animate-bounce" />
                  Download Resume
                </button>
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="group border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Code className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  View Projects
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  I'm Abhinav, a final-year Computer Science student at the University of Lucknow. 
                  Passionate about building smart web applications and exploring Generative AI, I turn 
                  ideas into impactful digital solutions.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  I constantly upgrade my skills through hands-on projects, certifications, and 
                  collaborative learning. My goal is to bridge the gap between traditional web 
                  development and cutting-edge AI technologies.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center group hover:scale-105 transition-transform duration-300">
                    <Book className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2 group-hover:animate-pulse" />
                    <h3 className="font-semibold text-sm">B.Tech CSE'26</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">@ University of Lucknow</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center group hover:scale-105 transition-transform duration-300">
                    <Globe className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2 group-hover:animate-pulse" />
                    <h3 className="font-semibold text-sm">MERN Stack</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Developer</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg text-center group hover:scale-105 transition-transform duration-300">
                    <Cpu className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2 group-hover:animate-pulse" />
                    <h3 className="font-semibold text-sm">Generative AI</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Enthusiast</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
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
              </div>
            </div>
          </div>
        </section>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
            aria-label="Back to top"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Portfolio;