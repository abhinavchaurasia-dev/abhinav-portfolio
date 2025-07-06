
import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { fadeInUp, scaleOnHover } from '../../utils/animations';
import profilePhoto from '../../assets/profilePhoto.jpg';


const AboutSection = () => {
  return (
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
  <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center overflow-hidden relative">
    <div className="relative bg-gradient-to-br from-blue-500 to-purple-500 p-1 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
      <div className="w-64 h-64 rounded-3xl overflow-hidden">
        <img
          src={profilePhoto}
          alt="Abhinav - Profile Photo"
          className="w-full h-full object-cover object-center"
          style={{ objectPosition: 'center 20%' }}
        />
      </div>
    </div>
  </div>
</motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
