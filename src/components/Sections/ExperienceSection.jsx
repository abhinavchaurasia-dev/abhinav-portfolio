
import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { experience } from '../../data/experience';

const ExperienceSection = () => {
  return (
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
  );
};

export default ExperienceSection;
