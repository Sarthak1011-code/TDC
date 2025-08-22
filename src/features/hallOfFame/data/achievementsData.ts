import { Trophy, Star, Award, Medal } from 'lucide-react';

export const icons = {
  Trophy,
  Star,
  Award,
  Medal
};

export interface Achievement {
  name: string;
  title: string;
  achievement: string;
  image: string;
  year: string;
  icon: keyof typeof icons;
}

export const achievements: Achievement[] = [
  {
    name: "Dipu Kumar(2nd Year)",
    title: "Android dev group lead",
    achievement: "5+ Projects and 4+ Certifications ",
    image: "vid/Hall1.jpeg",
    year: "2024",
    icon: "Trophy"
  },
  // ... rest of the achievements
];

export const sections = [
  { 
    title: "Android development", 
    description: "Recognizing technical mastery and certifications",
    gradient: "from-blue-500/10 to-purple-500/10",
    titleColor: "text-blue-600"
  },
  { 
    title: "Machine Learning", 
    description: "Creative usage of AI for problem solving",
    gradient: "from-emerald-500/10 to-teal-500/10",
    titleColor: "text-emerald-600"
  },
  { 
    title: "Web development", 
    description: "Developing and deploying Modern Websites",
    gradient: "from-orange-500/10 to-red-500/10",
    titleColor: "text-orange-600"
  },
  { 
    title: "Cyber Security", 
    description: "Managing and Protects websites from cyber attacks",
    gradient: "from-purple-500/10 to-pink-500/10",
    titleColor: "text-purple-600"
  }
];