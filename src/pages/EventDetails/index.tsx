import { Calendar } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';

const events = {
  'android-workshop': {
    title: "Android Development Workshop",
    date: "26 Feb 2025",
    description: "Full description here...",
    images: [
      "vid/Screenshot 2025-02-26 120900.png",
      "vid/another-photo.jpg"
    ],
    details: "More comprehensive details about the event.."
  },
  'coding-workshop': {
    title: "Android Development Workshop",
    date: "26 Feb 2025",
    description: "Full description here...",
    images: [
      "vid/WhatsApp Image 2025-03-28 at 01.50.37.jpeg",
      "vid/another-photo.jpg"
    ],
    details: "More comprehensive details about the event.."
  },
};

export default function EventDetails() {
  const { eventId } = useParams<{ eventId: string }>();
  const event = events[eventId as keyof typeof events];

  if (!event) return <div>Event not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">

      
    </div>



  );
}