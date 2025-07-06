import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { fadeInUp } from '../../utils/animations';
import emailjs from 'emailjs-com';

const ContactSection = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    subject: '', 
    message: '',
    honeypot: '' // Honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const formRef = useRef();
  const recaptchaRef = useRef();

  // Regex patterns for validation
  const patterns = {
    name: /^[a-zA-Z\s'-]{2,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    subject: /^[a-zA-Z0-9\s\-_.,!?()]{5,100}$/,
    message: /^[\s\S]{10,1000}$/
  };

  // Error messages
  const errorMessages = {
    name: 'Name must be 2-50 characters long and contain only letters, spaces, hyphens, and apostrophes.',
    email: 'Please enter a valid email address.',
    subject: 'Subject must be 5-100 characters long and contain only letters, numbers, spaces, and basic punctuation.',
    message: 'Message must be between 10-1000 characters long.',
    honeypot: 'Bot detected. Please try again.',
    recaptcha: 'Please complete the reCAPTCHA verification.'
  };

  // Load reCAPTCHA v2 script
  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha) return;
      
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // Render reCAPTCHA v2 widget
        if (window.grecaptcha && recaptchaRef.current) {
          window.grecaptcha.render(recaptchaRef.current, {
            sitekey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
            callback: handleRecaptchaChange,
            'expired-callback': handleRecaptchaExpired,
            'error-callback': handleRecaptchaError
          });
        }
      };
      document.head.appendChild(script);
    };

    loadRecaptcha();
  }, []);

  // Handle reCAPTCHA v2 callback
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    // Clear reCAPTCHA error if it exists
    if (validationErrors.recaptcha) {
      setValidationErrors(prev => ({
        ...prev,
        recaptcha: ''
      }));
    }
  };

  // Handle reCAPTCHA expiration
  const handleRecaptchaExpired = () => {
    setRecaptchaToken('');
    setValidationErrors(prev => ({
      ...prev,
      recaptcha: 'reCAPTCHA has expired. Please verify again.'
    }));
  };

  // Handle reCAPTCHA error
  const handleRecaptchaError = () => {
    setRecaptchaToken('');
    setValidationErrors(prev => ({
      ...prev,
      recaptcha: 'reCAPTCHA error. Please try again.'
    }));
  };

  // Reset reCAPTCHA
  const resetRecaptcha = () => {
    if (window.grecaptcha) {
      window.grecaptcha.reset();
      setRecaptchaToken('');
    }
  };

  // Validate individual field
  const validateField = (name, value) => {
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    }
    
    if (patterns[name] && !patterns[name].test(value.trim())) {
      return errorMessages[name];
    }
    
    return '';
  };

  // Validate all fields
  const validateForm = () => {
    const errors = {};
    
    // Check honeypot
    if (formData.honeypot) {
      errors.honeypot = errorMessages.honeypot;
      return errors;
    }
    
    // Validate each field
    Object.keys(patterns).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });
    
    // Check reCAPTCHA v2
    if (!recaptchaToken) {
      errors.recaptcha = errorMessages.recaptcha;
    }
    
    return errors;
  };

  // Handle form field changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle field blur (validation on blur)
  const handleFieldBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    if (error) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    setValidationErrors({});

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsSubmitting(false);
      setSubmitStatus('validation_error');
      return;
    }

    // Additional security checks
    const suspiciousPatterns = [
      /https?:\/\//gi, // URLs
      /<script/gi,     // Script tags
      /javascript:/gi, // JavaScript protocols
      /eval\(/gi,      // Eval functions
      /onclick|onload|onerror/gi // Event handlers
    ];

    const isSuspicious = suspiciousPatterns.some(pattern => 
      pattern.test(formData.message) || pattern.test(formData.subject)
    );

    if (isSuspicious) {
      setSubmitStatus('security_error');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          to_email: 'abhinav.dev.contact@gmail.com',
          'g-recaptcha-response': recaptchaToken,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
        resetRecaptcha(); // Reset reCAPTCHA after successful submission
        setTimeout(() => setSubmitStatus(''), 5000);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      resetRecaptcha(); // Reset reCAPTCHA on error
      setTimeout(() => setSubmitStatus(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send a Message</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - hidden from users */}
              <div style={{ display: 'none' }}>
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleFormChange}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  onBlur={handleFieldBlur}
                  required
                  maxLength="50"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors ${
                    validationErrors.name 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-700'
                  }`}
                  placeholder="Your Name"
                />
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {validationErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  onBlur={handleFieldBlur}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors ${
                    validationErrors.email 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-700'
                  }`}
                  placeholder="your.email@example.com"
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {validationErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  onBlur={handleFieldBlur}
                  required
                  maxLength="100"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors ${
                    validationErrors.subject 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-700'
                  }`}
                  placeholder="Subject of your message"
                />
                {validationErrors.subject && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {validationErrors.subject}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  onBlur={handleFieldBlur}
                  required
                  rows={5}
                  maxLength="1000"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none transition-colors ${
                    validationErrors.message 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-700'
                  }`}
                  placeholder="Your message... (10-1000 characters)"
                />
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {formData.message.length}/1000 characters
                </div>
                {validationErrors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {validationErrors.message}
                  </p>
                )}
              </div>

              {/* reCAPTCHA v2 Widget */}
              <div className="flex justify-center">
                <div 
                  ref={recaptchaRef}
                  className={`${validationErrors.recaptcha ? 'ring-2 ring-red-500 rounded' : ''}`}
                ></div>
              </div>
              
              {validationErrors.recaptcha && (
                <p className="text-sm text-red-600 dark:text-red-400 text-center">
                  {validationErrors.recaptcha}
                </p>
              )}

              {/* reCAPTCHA notice */}
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p>
                  🔒 This form is protected by reCAPTCHA and the Google{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{' '}
                  apply.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <div className="text-green-600 dark:text-green-400 text-center bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  ✅ Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="text-red-600 dark:text-red-400 text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  ❌ Failed to send message. Please try again or contact me directly.
                </div>
              )}
              {submitStatus === 'validation_error' && (
                <div className="text-yellow-600 dark:text-yellow-400 text-center bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                  ⚠️ Please fix the errors above and try again.
                </div>
              )}
              {submitStatus === 'security_error' && (
                <div className="text-red-600 dark:text-red-400 text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  🛡️ Security check failed. Please remove any suspicious content and try again.
                </div>
              )}
            </form>
          </motion.div>

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

            {/* Security features info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-200">
                🔐 Security Features
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-2">
                <li>• Input validation and sanitization</li>
                <li>• Anti-spam protection</li>
                <li>• reCAPTCHA v2 verification</li>
                <li>• Malicious content detection</li>
                <li>• Bot detection (honeypot)</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;