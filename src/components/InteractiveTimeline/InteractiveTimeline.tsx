import { useState, useEffect, useRef } from 'react';
import { Calendar, Award, Users, Rocket, Code, Trophy } from 'lucide-react';

interface TimelineEvent {
  id: number;
  year: string;
  month: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: "2023",
    month: "January",
    title: "Community Founded",
    description: "TIT Developer Community was born with a vision to empower students through tech education and mentorship.",
    icon: Rocket,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    year: "2023",
    month: "March",
    title: "First Workshop",
    description: "Conducted our first workshop on Web Development, attracting 50+ enthusiastic participants.",
    icon: Code,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    year: "2023",
    month: "June",
    title: "100+ Members",
    description: "Reached the milestone of 100+ active community members working together and learning.",
    icon: Users,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    year: "2023",
    month: "September",
    title: "First Hackathon",
    description: "Organized our first 24-hour hackathon with amazing projects and innovative solutions.",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 5,
    year: "2024",
    month: "February",
    title: "Achievement Awards",
    description: "Launched our Hall of Fame to celebrate outstanding contributors and achievers.",
    icon: Award,
    color: "from-red-500 to-pink-500"
  },
  {
    id: 6,
    year: "2025",
    month: "Present",
    title: "Growing Strong",
    description: "Continuing to empower juniors with guidance from seniors, building the future together.",
    icon: Rocket,
    color: "from-indigo-500 to-purple-500"
  }
];

export const InteractiveTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = document.querySelectorAll('.timeline-item');
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={timelineRef} className="w-full py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Timeline Line */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 opacity-30"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;
              const isVisible = visibleItems.has(index);

              return (
                <div
                  key={event.id}
                  className={`timeline-item relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  data-index={index}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-12 pl-16 md:pl-0' : 'md:pl-12 pl-16 md:pr-0'}`}>
                    <div
                      className={`bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                        activeIndex === index ? 'shadow-2xl shadow-purple-500/20' : 'shadow-lg'
                      }`}
                    >
                      {/* Date Badge */}
                      <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${event.color} text-white text-sm font-semibold mb-3`}>
                        {event.month} {event.year}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>

                      {/* Description */}
                      <p className="text-gray-300 dark:text-gray-400 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div className="absolute left-0 md:left-1/2 top-1/2 transform -translate-y-1/2 md:-translate-x-1/2">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center shadow-lg transform transition-all duration-300 ${
                        activeIndex === index ? 'scale-125 rotate-12' : 'scale-100'
                      }`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Empty Space for Opposite Side (Desktop) */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

