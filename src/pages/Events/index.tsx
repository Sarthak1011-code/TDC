import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from '../../components/Navbar';
import { useEffect, useRef } from 'react';

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  image?: string;
  accentColor?: string;
  className?: string;
  eventId: string;
}

const EventCard = ({ 
  title, 
  date, 
  description, 
  image, 
  accentColor = 'bg-emerald-500', 
  className = '', 
  eventId 
}: EventCardProps) => {
  // Define gradient colors based on accent color
  const gradientFrom = {
    'bg-indigo-500': 'from-indigo-900',
    'bg-amber-500': 'from-amber-900',
    'bg-emerald-500': 'from-emerald-900',
    'bg-purple-500': 'from-purple-900',
  }[accentColor] || 'from-gray-900';

  const gradientTo = {
    'bg-indigo-500': 'to-indigo-800',
    'bg-amber-500': 'to-amber-800',
    'bg-emerald-500': 'to-emerald-800',
    'bg-purple-500': 'to-purple-800',
  }[accentColor] || 'to-gray-800';

  return (
    <div className={`relative rounded-xl overflow-hidden shadow-xl ${className}`}>
      {/* Solid fallback background */}
      <div className="absolute inset-0 bg-gray-900" />
      
      {/* Gradient Background - now using explicit gradient classes */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-95`} />
      
      {/* Accent Color Stripe */}
      <div className={`absolute -left-6 -top-12 w-32 h-[200%] ${accentColor} rotate-12 z-10`} />
      
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-current to-transparent" style={{
        color: {
          'bg-indigo-500': '#6366f1',
          'bg-amber-500': '#f59e0b',
          'bg-emerald-500': '#10b981',
          'bg-purple-500': '#8b5cf6',
        }[accentColor]
      }} />

      <div className="relative z-20 p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">{title}</h2>

        <div className="flex items-center text-gray-300 mb-4 md:mb-6">
          <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          <span className="text-base md:text-lg">{date}</span>
        </div>

        <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">{description}</p>

        {image && (
          <div className="mb-6 md:mb-8 relative rounded-lg overflow-hidden">
            {/* Image with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent z-10" />
            <img
              src={image}
              alt={title}
              className="relative z-0 rounded-lg  h-40 md:h-56 object-cover"

            />
          </div>
        )}

        
      </div>
    </div>
  );
};

const AuroraBackground = () => {
  const auroraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!auroraRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = auroraRef.current.getBoundingClientRect();
      
      const x = clientX - left;
      const y = clientY - top;
      
      auroraRef.current.style.setProperty('--x', `${x / width * 100}%`);
      auroraRef.current.style.setProperty('--y', `${y / height * 100}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={auroraRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{
        background: `
          radial-gradient(at var(--x, 50%) var(--y, 50%), 
          rgba(56, 182, 255, 0.2) 0, 
          transparent 50%),
          radial-gradient(at calc(var(--x, 50%) + 20%) calc(var(--y, 50%) + 20%), 
          rgba(125, 211, 252, 0.15) 0, 
          transparent 45%),
          radial-gradient(at calc(var(--x, 50%) - 20%) calc(var(--y, 50%) - 20%), 
          rgba(167, 139, 250, 0.15) 0, 
          transparent 40%),
          radial-gradient(at calc(var(--x, 50%) + 30%) calc(var(--y, 50%) - 30%), 
          rgba(74, 222, 128, 0.1) 0, 
          transparent 50%)
        `,
        opacity: 0.7,
        transition: 'background 0.5s ease',
        zIndex: 0
      }}
    />
  );
};

export default function Events() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <AuroraBackground />
      <div className="relative z-10">
        <Navbar />

        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="lg:pr-8 xl:pr-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">Our Events</h1>
                <div className="space-y-4 md:space-y-6">
                  <p className="text-base md:text-xl text-gray-300 leading-relaxed">
                    Join us for exciting workshops, hackathons, and networking events designed to help you grow as a developer.
                  </p>
                  <p className="text-base md:text-xl text-gray-300 leading-relaxed">
                    We host regular events featuring industry experts, hands-on coding sessions, and opportunities to collaborate on real-world projects.
                  </p>
                </div>
              </div>

              <div className="order-first lg:order-last">
                <img
                  src="vid/__next_static_media_shopping-love.4ef628ed.svg"
                  alt="Coding workshop event"
                  className="object-contain w-full max-w-md mx-auto lg:max-w-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-gray-900/50 via-gray-800/50 to-gray-900/50 py-12 md:py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12 text-center">Past Events</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-6 md:space-y-8">
                <EventCard
                  title="Android Development Workshop"
                  date="26 feb 2025 - 26 feb 2025"
                  description="An Android workshop covers mobile app development using Kotlin or Java, Android Studio, UI/UX design, databases, APIs, and deployment. It includes hands-on coding, building real-world apps, and debugging. Ideal for beginners and developers to enhance skills in Android development and industry practices."
                  image="vid/WhatsApp Image 2025-03-28 at 01.50.37.jpeg"
                  accentColor="bg-indigo-500"
                  eventId='android-workshop'
                  className="lg:mr-4 xl:mr-10 2xl:mr-20"
                />

                <EventCard
                  title="Coding Quest"
                  date="21 Apr 2024 - 22 Apr 2024"
                  description="A Coding Quest is a challenge-based event where participants solve programming problems to test their algorithmic and problem-solving skills. It may include competitive coding, debugging, and logic-building tasks, helping developers enhance their proficiency in languages like Python, Java, or C++."
                  image="vid/WhatsApp Image 2025-03-28 at 01.57.41.jpeg"
                  accentColor="bg-amber-500"
                  eventId='coding-workshop'
                  className="lg:mr-4 xl:mr-10 2xl:mr-20"
                />
              </div>

              <div className="space-y-6 md:space-y-8">
                <EventCard
                  title="Web Development Hackathon"
                  date="25 mar 2025 - 31 mar 2025"
                  description="A web development hackathon is a competitive event where developers, designers, and innovators collaborate to build web applications within a limited time. Participants solve real-world problems using front-end, back-end, and full-stack technologies, showcasing creativity, coding skills, and teamwork for prizes and recognition."
                  image="vid/WhatsApp Image 2025-03-28 at 02.02.03.jpeg"
                  accentColor="bg-emerald-500"
                  eventId='web development-workshop'
                  className="lg:ml-4 xl:ml-10 2xl:ml-20"
                />

                <EventCard
                  title="Regular Classes"
                  date="2 Dec 2023 - 3 Dec 2023"
                  description="Regular classes on Google Meet for communication and development focus on enhancing soft skills, professional communication, and personal growth. Sessions cover public speaking, teamwork, leadership, and career development, providing interactive learning , and expert guidance for continuous improvement.."
                  image="vid/Screenshot 2025-03-24 000110.png"
                  accentColor="bg-purple-500"
                  eventId='Regular-workshop'
                  className="lg:ml-4 xl:ml-10 2xl:ml-20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}