dark:text-gray-400">
  {skill.level}%
</span>
</div>
<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
<div 
  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
  style={{ width: `${skill.level}%` }}
></div>
</div>
</div>
))}
</div>
</div>
))}
</div>
</div>
</section>

{/* Experience Section */}
<section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center mb-16">
<h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
<div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
</div>

<div className="space-y-8">
{experience.map((exp, index) => (
<div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
<div className="flex items-start space-x-4">
<div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg group-hover:scale-110 transition-transform">
<exp.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
</div>
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
</div>
))}
</div>
</div>
</section>

{/* Certifications Section */}
<section id="certifications" className="py-20 bg-white dark:bg-gray-900">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center mb-16">
<h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications</h2>
<div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
<p className="text-lg text-gray-600 dark:text-gray-400">
Professional certifications and achievements
</p>
</div>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
{certifications.map((cert, index) => (
<div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
<div className="flex items-center mb-4">
<div className="text-3xl mr-3 group-hover:scale-110 transition-transform">
{cert.icon}
</div>
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
</div>
))}
</div>
</div>
</section>

{/* Contact Section */}
<section id="contact" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center mb-16">
<h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
<div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
<p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
Let's connect! I'm open to internships, freelance work, or just a chat about tech.
</p>
</div>

<div className="grid md:grid-cols-2 gap-12">
{/* Contact Form */}
<div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg">
<h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send a Message</h3>
<div className="space-y-6">
<div>
<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
Name
</label>
<input
type="text"
name="name"
value={formData.name}
onChange={handleFormChange}
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
className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
placeholder="your@email.com"
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
rows={5}
className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
placeholder="Your message..."
/>
</div>

<button
onClick={handleFormSubmit}
disabled={isSubmitting}
className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
isSubmitting
? 'bg-gray-400 cursor-not-allowed'
: 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
} text-white shadow-lg`}
>
{isSubmitting ? (
<>
<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
Sending...
</>
) : (
<>
<Send className="h-5 w-5" />
Send Message
</>
)}
</button>

{submitStatus === 'success' && (
<div className="text-green-600 dark:text-green-400 text-sm flex items-center gap-2">
<CheckCircle className="h-4 w-4" />
Message sent successfully! I'll get back to you soon.
</div>
)}

{submitStatus === 'error' && (
<div className="text-red-600 dark:text-red-400 text-sm">
Failed to send message. Please try again or contact me directly.
</div>
)}
</div>
</div>

{/* Contact Info */}
<div className="space-y-8">
<div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg">
<h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h3>
<div className="space-y-4">
<a 
href="mailto:abhinavc037@gmail.com"
className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
>
<div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg group-hover:scale-110 transition-transform">
<Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
</div>
<div>
<div className="font-semibold">Email</div>
<div className="text-sm">abhinavc037@gmail.com</div>
</div>
</a>

<a 
href="https://github.com/Abhinav-Chaurasia-220304"
target="_blank"
rel="noopener noreferrer"
className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
>
<div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg group-hover:scale-110 transition-transform">
<Github className="h-6 w-6 text-blue-600 dark:text-blue-400" />
</div>
<div>
<div className="font-semibold">GitHub</div>
<div className="text-sm">@Abhinav-Chaurasia-220304</div>
</div>
</a>

<a 
href="https://www.linkedin.com/in/abhinav-chaurasia-83741b257"
target="_blank"
rel="noopener noreferrer"
className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
>
<div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg group-hover:scale-110 transition-transform">
<Linkedin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
</div>
<div>
<div className="font-semibold">LinkedIn</div>
<div className="text-sm">@AbhinavChaurasia</div>
</div>
</a>

<a 
href="https://x.com/Abhinav_C_22"
target="_blank"
rel="noopener noreferrer"
className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
>
<div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg group-hover:scale-110 transition-transform">
<Twitter className="h-6 w-6 text-blue-600 dark:text-blue-400" />
</div>
<div>
<div className="font-semibold">Twitter</div>
<div className="text-sm">@Abhinav_C_22</div>
</div>
</a>
</div>
</div>

{/* Additional Info */}
<div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg">
<h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Let's Build Something Amazing!</h3>
<p className="text-gray-600 dark:text-gray-400 mb-4">
I'm always excited to work on new projects and collaborate with fellow developers.
</p>
<div className="flex items-center gap-2 text-green-600 dark:text-green-400">
<div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
<span className="text-sm font-medium">Available for new opportunities</span>
</div>
</div>
</div>
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
<a href="https://github.com/Abhinav-Chaurasia-220304" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
<Github className="h-5 w-5" />
</a>
<a href="https://www.linkedin.com/in/abhinav-chaurasia-83741b257" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
<Linkedin className="h-5 w-5" />
</a>
<a href="https://x.com/Abhinav_C_22" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
<Twitter className="h-5 w-5" />
</a>
<a href="mailto:abhinavc037@gmail.com" className="text-gray-400 hover:text-white transition-colors">
<Mail className="h-5 w-5" />
</a>
</div>
</div>
</div>
</footer>

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

{/* Custom Styles */}
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

.wave {
animation: wave 2s infinite;
transform-origin: 70% 70%;
}

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

@keyframes fadeIn {
from { opacity: 0; }
to { opacity: 1; }
}

@keyframes slideInUp {
from { 
opacity: 0; 
transform: translateY(30px); 
}
to { 
opacity: 1; 
transform: translateY(0); 
}
}

.animate-fadeIn {
animation: fadeIn 1s ease-out;
}

.animate-slideInUp {
animation: slideInUp 0.8s ease-out;
}

.animation-delay-200 {
animation-delay: 0.2s;
animation-fill-mode: both;
}

.animation-delay-400 {
animation-delay: 0.4s;
animation-fill-mode: both;
}

.animation-delay-600 {
animation-delay: 0.6s;
animation-fill-mode: both;
}

.animation-delay-800 {
animation-delay: 0.8s;
animation-fill-mode: both;
}

html {
scroll-behavior: smooth;
}
`}</style>
</div>
);
};

export default Portfolio;