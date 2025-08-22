import { Calendar } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../../../components/layout/Navbar/Navbar';
import { events } from '../data/eventsData';

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = events[eventId || ''];

  if (!event) return <div>Event not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">{event.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
              <p className="text-gray-700">{event.details}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{event.date}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 gap-4">
              {event.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Event ${index + 1}`}
                  className="rounded-lg  h-48 object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;