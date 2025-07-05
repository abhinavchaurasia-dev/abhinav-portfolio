import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Sun, Moon, ChevronUp, ExternalLink, Github, Mail, 
  User, Code, Zap, Briefcase, Award, Phone, MapPin, Calendar,
  Users, Database, Globe, Smartphone, Bot, Cpu, GitBranch,
  Terminal, Cloud, Book, Linkedin, Twitter
} from 'lucide-react';
import emailjs from 'emailjs-com';

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
    sections.forEach(section => observerRef.current.observe(section));

    window.addEventListener('scroll', handleScroll);

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', isDarkMode);
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Replace with your EmailJS service details
      await emailjs.sendForm(
        'your_service_id',
        'your_template_id',
        formRef.current,
        'your_public_key'
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
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
      github: "#",
      live: "#",
      icon: Briefcase
    },
    {
      title: "CoverGenie",
      subtitle: "AI-Powered Cover Letter Generator",
      description: "Generates personalized cover letters using GenAI APIs by analyzing resumes and job descriptions – tailored for every opportunity.",
      tech: ["React", "OpenRouter API", "LangChain"],
      github: "#",
      live: "#",
      icon: Bot
    },
    {
      title: "SnapNoteQR",
      subtitle: "QR Notepad for Fast Sharing",
      description: "Type notes and share them instantly as QR codes. Simplify how you capture and share ideas on the go.",
      tech: ["HTML", "TailwindCSS", "JavaScript", "QR APIs"],
      github: "#",
      live: "#",
      icon: Smartphone
    }
  ];

  const skills = {
    "Languages": ["JavaScript", "Python", "SQL"],
    "Frontend": ["React", "HTML", "CSS", "Tailwind"],
    "Backend": ["Node.js", "Express.js"],
    "Databases": ["MongoDB", "MySQL"],
    "AI Tools": ["OpenRouter", "LangChain", "Prompt Engineering"],
    "Dev Tools": ["Git", "GitHub", "VS Code", "Postman"],
    "Cloud & Deployment": ["Netlify", "Vercel"],
    "Currently Learning": ["Advanced JS", "API development", "GenAI architectures"]
  };

  const certifications = [
    {
      title: "Microsoft Certified: Azure AI Fundamentals",
      issuer: "Microsoft",
      date: "Oct 2024",
      credentialId: "ABC123",
      link: "#",
      icon: Bot
    },
    {
      title: "Google IT Automation with Python",
      issuer: "Google",
      date: "Jun 2024",
      credentialId: "GCP456",
      link: "#",
      icon: Cpu
    },
    {
      title: "Google IT Support Specialization",
      issuer: "Google",
      date: "Jun 2024",
      credentialId: "GIT789",
      link: "#",
      icon: Terminal
    },
    {
      title: "Google UX Design Specialization",
      issuer: "Google",
      date: "Jun 2024",
      credentialId: "GUX012",
      link: "#",
      icon: Globe
    },
    {
      title: "Reinforcement Learning",
      issuer: "University of Alberta",
      date: "Jun 2024",
      credentialId: "UAB345",
      link: "#",
      icon: Book
    }
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

  const scaleOnHover = {
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

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
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                          activeSection === item.id
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon size={16} />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Theme Toggle & Mobile Menu */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="md:hidden">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
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
                className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2 ${
                          activeSection === item.id
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon size={18} />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="block text-gray-900 dark:text-white">👋 Hi, I'm </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Abhinav
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4">
                Web Developer & AI Explorer
              </p>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                B.Tech CSE student crafting future-ready web solutions and building with AI innovations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  📄 Resume
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-full font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-300 flex items-center gap-2"
                >
                  🚀 View Projects
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-full font-semibold hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-all duration-300 flex items-center gap-2"
                >
                  📬 Contact Me
                </motion.button>
              </div>
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
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="space-y-6"
              >
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
                  <motion.div
                    variants={scaleOnHover}
                    whileHover="hover"
                    className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  >
                    <h3 className="font-semibold text-blue-600 dark:text-blue-400">🎓 B.Tech CSE'26</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">@ LU</p>
                  </motion.div>
                  <motion.div
                    variants={scaleOnHover}
                    whileHover="hover"
                    className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                  >
                    <h3 className="font-semibold text-green-600 dark:text-green-400">🌐 MERN Stack</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Developer</p>
                  </motion.div>
                  <motion.div
                    variants={scaleOnHover}
                    whileHover="hover"
                    className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                  >
                    <h3 className="font-semibold text-purple-600 dark:text-purple-400">🤖 Generative AI</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Enthusiast</p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative"
              >
                <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center">
                  <User size={120} className="text-gray-400 dark:text-gray-600" />
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
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Here are some of my recent projects showcasing my skills in web development and AI integration.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, index) => {
                const Icon = project.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ y: -10 }}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                          <Icon size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{project.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, techIndex) => (
                          <span key={techIndex} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <a
                          href={project.github}
                          className="flex items-center gap-1 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm"
                        >
                          <Github size={16} />
                          GitHub
                        </a>
                        <a
                          href={project.live}
                          className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
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
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              {Object.entries(skills).map(([category, skillList], index) => (
                <motion.div
                  key={category}
                  variants={fadeInUp}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200"
                      >
                        {skill}
                      </motion.span>
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
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              {experience.map((exp, index) => {
                const Icon = exp.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                          <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">{exp.company}</p>
                          <span className="text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded">
                            {exp.type}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{exp.description}</p>
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">Key Responsibilities:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                            {exp.responsibilities.map((resp, respIndex) => (
                              <li key={respIndex}>{resp}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
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
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                        <Icon size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{cert.date}</span>
                          {cert.link && (
                            <a
                              href={cert.link}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{cert.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{cert.issuer}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Credential ID: {cert.credentialId}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Let's connect! I'm open to internships, freelance work, or just a chat about tech.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send a Message</h3>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  {submitStatus === 'success' && (
                    <p className="text-green-600 dark:text-green-400 text-center">Message sent successfully!</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-red-600 dark:text-red-400 text-center">Failed to send message. Please try again.</p>
                  )}
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h3>
                  <div className="space-y-4">
                    <a
                      href="mailto:abhinavc037@gmail.com"
                      className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Mail className="text-blue-600" size={20} />
                      <span className="text-gray-900 dark:text-white">abhinavc037@gmail.com</span>
                    </a>

                    <a
                      href="https://github.com/Abhinav-Chaurasia-220304"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Github className="text-gray-800 dark:text-gray-200" size={20} />
                      <span className="text-gray-900 dark:text-white">@Abhinav-Chaurasia-220304</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/abhinav-chaurasia-83741b257"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Linkedin className="text-blue-600" size={20} />
                      <span className="text-gray-900 dark:text-white">@AbhinavChaurasia</span>
                    </a>

                    <a
                      href="https://x.com/Abhinav_C_22"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Twitter className="text-blue-400" size={20} />
                      <span className="text-gray-900 dark:text-white">@Abhinav_C_22</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center items-center gap-6 mb-6">
                <a
                  href="mailto:abhinavc037@gmail.com"
                  className="p-3 bg-gray-800 dark:bg-gray-800 rounded-full hover:bg-gray-700 dark:hover:bg-gray-700 transition-colors"
                >
                  <Mail size={20} />
                </a>
                <a
                  href="https://github.com/Abhinav-Chaurasia-220304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 dark:bg-gray-800 rounded-full hover:bg-gray-700 dark:hover:bg-gray-700 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/abhinav-chaurasia-83741b257"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 dark:bg-gray-800 rounded-full hover:bg-gray-700 dark:hover:bg-gray-700 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://x.com/Abhinav_C_22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 dark:bg-gray-800 rounded-full hover:bg-gray-700 dark:hover:bg-gray-700 transition-colors"
                >
                  <Twitter size={20} />
                </a>
              </div>
              <p className="text-gray-400">
                © 2025 Abhinav Chaurasia | Built with ❤️ using React & TailwindCSS
              </p>
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
              onClick={() => scrollToSection('home')}
              className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
            >
              <ChevronUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Portfolio;