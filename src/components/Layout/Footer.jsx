
import React from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
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
  );
};

export default Footer;
