import { Trophy, Star, Award, Medal } from 'lucide-react';
import { useRef } from 'react';

const icons = {
  Trophy,
  Star,
  Award,
  Medal
};

interface Achievement {
  name: string;
  title: string;
  achievement: string;
  image: string;
  year: string;
  icon: keyof typeof icons;
}


const achievements: Achievement[] = [
  {
    name: "Dipu Kumar(2nd Year)",
    title: "Android dev group lead",
    achievement: "5+ Projects and 4+ Certifications ",
    image: "vid/Hall1.jpeg",
    year: "2024",
    icon: "Trophy"
  },
  {
    name: "Aryan Sharma(3rd Year)",
    title: "Android group lead",
    achievement: "10+ Projects , Winner of 5 hackathons , Play Store deployement ",
    image: "vid/Hall2.jpeg",
    year: "2024",
    icon: "Trophy"
  },
  {
    name: "Aman Mishra(2nd Year)",
    title: "Machine learning lead",
    achievement: "5+ Major Project, SIH 2024 finalist ",
    image: "vid/Hall3.jpeg",
    year: "2024",
    icon: "Award"
  },
  {
    name: "Deepika Deshmuckh(3rd Year)",
    title: "Machine learning lead",
    achievement: "10+ Projects and Winner of 5+ hackathons",
    image: "vid/Hall4.jpeg",
    year: "2024",
    icon: "Medal"
  },
  {
    name: "Prakhar(2nd Year)",
    title: "Developer",
    achievement: "10+ Projects and SIH 2024 finalist",
    image: "vid/Hall5.jpeg",
    year: "2024",
    icon: "Trophy"
  },
  {
    name: "Naman kumar(3rd Year)",
    title: "Developer",
    achievement: "5+ Projects and secured internship ",
    image: "vid/Hall6.jpeg",
    year: "2024",
    icon: "Star"
  },
  {
    name: "Aakash Kumar(2nd Year)",
    title: "Cyber Security Specialist",
    achievement: "3+ Projects and ATS optimised Resume ",
    image: "vid/Hall7.jpeg",
    year: "2024",
    icon: "Award"
  },
  {
    name: "Mohd Meeraj(3rd Year)",
    title: "Cyber Security Specialist",
    achievement: "Successfully Completed Cyber Security training",
    image: "vid/Hall8.jpeg",
    year: "2024",
    icon: "Medal"
  }
];

const sections = [
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

const Card3D = ({ achievement, IconComponent }: { achievement: Achievement; IconComponent: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = (x - centerX) / 20;
    const rotateX = (centerY - y) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(0, 0, 0, 0.3)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
  };

  return (
    <div
      ref={cardRef}
      className="relative bg-white/10 backdrop-blur-lg rounded-lg md:rounded-xl overflow-hidden transition-all duration-500 border border-white/20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.5s ease, box-shadow 0.5s ease',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
      }}
    >
      <div className="relative h-48 sm:h-56 md:h-64">
        <img
          src={achievement.image}
          alt={achievement.name}
          className="w-full h-full object-cover"
          style={{ transform: 'translateZ(30px)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div 
          className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm p-1 sm:p-2 rounded-full shadow-lg"
          style={{ transform: 'translateZ(50px)' }}
        >
          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-500" />
        </div>
      </div>
      <div 
        className="p-4 sm:p-5 md:p-6"
        style={{ transform: 'translateZ(20px)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2 sm:mb-3">
          <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-1">{achievement.name}</h3>
          <span className="text-xs sm:text-sm font-medium text-gray-300 bg-white/10 px-2 sm:px-3 py-1 rounded-full">
            {achievement.year}
          </span>
        </div>
        <p className="text-sm sm:text-base text-purple-300 font-medium mb-1 sm:mb-2 line-clamp-1">
          {achievement.title}
        </p>
        <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">
          {achievement.achievement}
        </p>
      </div>
    </div>
  );
};

export default function HallOfFame() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-3 md:mb-4">
            Hall of Fame
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300">
            Celebrating our community's outstanding achievements
          </p>
        </div>

        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-12 md:mb-20">
            <div className="text-center mb-6 md:mb-10">
              <h2 className={`text-2xl sm:text-3xl font-bold ${section.titleColor} mb-2 md:mb-3`}>
                {section.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-300">{section.description}</p>
            </div>

            <div className={`bg-gradient-to-r ${section.gradient} rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 md:mb-8`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {achievements.slice(sectionIndex * 2, sectionIndex * 2 + 2).map((achievement, index) => {
                  const IconComponent = icons[achievement.icon];
                  return (
                    <Card3D 
                      key={index}
                      achievement={achievement}
                      IconComponent={IconComponent}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-12 md:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {[
            { label: "Total Achievers", value: "20+", color: "from-blue-400 to-blue-600" },
            { label: "Certifications", value: "100+", color: "from-purple-400 to-purple-600" },
            { label: "Hackathon Wins", value: "25", color: "from-emerald-400 to-emerald-600" },
            { label: "Awards", value: "40+", color: "from-pink-400 to-pink-600" }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 text-center transform hover:scale-[1.03] sm:hover:scale-105 transition-all duration-300 border border-white/20"
            >
              <div className={`text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-1 sm:mb-2`}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}