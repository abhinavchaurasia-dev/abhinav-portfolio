
import { Briefcase, Bot, Smartphone } from 'lucide-react';

export const projects = [
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
