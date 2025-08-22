export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  images: string[];
  details: string;
}

export const events: Record<string, Event> = {
  'android-workshop': {
    id: 'android-workshop',
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
    id: 'coding-workshop',
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