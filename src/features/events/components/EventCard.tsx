import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  image?: string;
  accentColor?: string;
  className?: string;
  eventId: string;
}

export const EventCard = ({ 
  title, 
  date, 
  description, 
  image, 
  accentColor = 'bg-emerald-500', 
  className = '', 
  eventId 
}: EventCardProps) => {
  return (
    <div className={`relative bg-zinc-900 rounded-xl overflow-hidden shadow-xl ${className}`}>
      <div className={`absolute -left-6 -top-12 w-32 h-[200%] ${accentColor} rotate-12 z-10`} />

      <div className="relative z-20 p-8">
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>

        <div className="flex items-center text-gray-300 mb-6">
          <Calendar className="w-5 h-5 mr-2" />
          <span className="text-lg">{date}</span>
        </div>

        <p className="text-gray-300 text-lg mb-8 leading-relaxed">{description}</p>

        {image && (
          <div className="mb-8">
            <img
              src={image}
              alt={title}
              className="rounded-lg h-56 object-cover"
            />
          </div>
        )}

        <Link
          to={`/events/${eventId}`}
          className="inline-flex items-center px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-lg font-medium"
        >
          Read More
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};