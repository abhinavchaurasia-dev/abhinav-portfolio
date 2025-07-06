
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { fadeInUp } from '../../utils/animations';
import emailjs from 'emailjs-com';

const ContactSection = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    subject: '', 
    message: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const formRef = useRef();

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setSubmitStatus('validation_error');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'abhinav.dev.contact@gmail.com',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus(''), 5000);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
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
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Subject of your message"
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
                  ⚠️ Please fill in all required fields.
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
