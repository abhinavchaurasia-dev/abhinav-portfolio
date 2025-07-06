# 🌐 Abhinav Chaurasia – Developer Portfolio

Welcome to my personal portfolio website built with modern web technologies.  
This site showcases my projects, skills, experience, and certifications—all in a responsive, visually appealing format.

## 🚀 Live Site

**🔗 [Visit Portfolio](https://abhinav-portfolio.vercel.app)**

---

## 📁 Project Structure

```
├── public/                   # Static assets (e.g., profilePhoto.jpg)
├── src/                      # Application source code
│   ├── components/           # Reusable components
│   │   ├── Layout/           # Navbar, Footer
│   │   ├── Sections/         # Hero, About, Projects, Skills, etc.
│   │   └── UI/               # UI helpers like Loading, BackToTop
│   ├── data/                 # Data files (projects.js, skills.js …)
│   ├── hooks/                # Custom React hooks
│   └── utils/                # Utility functions
├── .env                      # Environment variables (git‑ignored)
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.js            # Vite bundler config
└── README.md
```

---

## 💡 Features

- ⚛️ Built with **React + Vite**
- 🎨 Styled using **Tailwind CSS**
- 🌙 Automatic **Dark Mode**
- 📨 Contact form powered by **EmailJS**
- 🔄 Smooth animations via **Framer Motion**
- 🧠 Modular, reusable component architecture
- 💼 Resume, GitHub, and LinkedIn integrated

---

## 📦 Tech Stack

| Frontend (Vite) | Styling | Deployment | Animation |
|-----------------|---------|------------|-----------|
| React + Vite    | Tailwind CSS | Vercel | Framer Motion |

---

## 📥 Installation

```bash
git clone https://github.com/abhinavchaurasia-dev/abhinav-portfolio.git
cd abhinav-portfolio
npm install
npm run dev
```

---

## 🛠️ Customization

- **Content:** edit files in `src/data/`
- **Sections:** tweak UI in `src/components/Sections/`
- **Assets:** replace images in `public/`

---

## 📧 Contact Form (EmailJS)

1. Sign up at **EmailJS** → create service & template  
2. Add keys to `.env` (not committed):

   ```env
   VITE_EMAILJS_SERVICE_ID=xxx
   VITE_EMAILJS_TEMPLATE_ID=xxx
   VITE_EMAILJS_PUBLIC_KEY=xxx
   ```

3. Form code lives in `ContactSection.jsx`.

---

## 🔒 Environment Variables

`.env` is **git‑ignored** to keep keys safe.  
Set the same keys in Vercel → Settings → Environment Variables for production.

---

## 🌍 Deployment

Hosted on **Vercel**.  
Every push to `main` triggers an automatic deployment.

---

## 🏆 Achievements

- **GATE 2025 Qualified** – CSE  
- **GATE DA 2025 Qualified** – Data Science & AI

---

## 📝 License

MIT License

---

## 🙋‍♂️ About Me

I am **Abhinav Chaurasia**, a frontend & full‑stack developer who loves clean design and efficient code.

Connect with me on [LinkedIn](https://linkedin.com/in/abhinavchaurasia-dev) or check out my projects on [GitHub](https://github.com/abhinavchaurasia-dev).