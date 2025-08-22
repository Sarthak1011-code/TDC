import { EventCard } from '../components/EventCard';
import { Navbar } from '../../../components/layout/Navbar/Navbar';

const Events = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <Navbar />

      <div className="pt-20 relative z-10">
        {/* Top Section - Text and Big Photo */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:pr-12">
              <h1 className="text-4xl font-bold text-white mb-6">Our Events</h1>
              <div className="space-y-6">
                <p className="text-xl text-gray-200 leading-relaxed">
                  Join us for exciting workshops, hackathons, and networking events designed to help you grow as a developer.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed">
                  We host regular events featuring industry experts, hands-on coding sessions, and opportunities to collaborate on real-world projects.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-xl opacity-20"></div>
              <img
                src="vid/__next_static_media_shopping-love.4ef628ed.svg"
                alt="Coding workshop event"
                className="relative z-10 object-contain h-80% w-full rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card Grid Section */}
      <div className="relative py-16 bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Past Events</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <EventCard
                title="Android Development Workshop"
                date="26 feb 2025 - 26 feb 2025"
                description="An Android workshop covers mobile app development using Kotlin or Java, Android Studio, UI/UX design, databases, APIs, and deployment. It includes hands-on coding, building real-world apps, and debugging. Ideal for beginners and developers to enhance skills in Android development and industry practices."
                image="vid/WhatsApp Image 2025-03-28 at 01.50.37.jpeg"
                accentColor="bg-indigo-500"
                eventId='android-workshop'
                className="h-50% mr-20 transform hover:scale-105 transition-transform duration-300"
              />

              <EventCard
                title="Coding Quest"
                date="21 Apr 2024 - 22 Apr 2024"
                description="A Coding Quest is a challenge-based event where participants solve programming problems to test their algorithmic and problem-solving skills. It may include competitive coding, debugging, and logic-building tasks, helping developers enhance their proficiency in languages like Python, Java, or C++."
                image="vid/WhatsApp Image 2025-03-28 at 01.57.41.jpeg"
                accentColor="bg-amber-500"
                eventId='coding-workshop'
                className="h-50% mr-20 transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="space-y-8">
              <EventCard
                title="Web Development Hackathon"
                date="25 mar 2025 - 31 mar 2025"
                description="A web development hackathon is a competitive event where developers, designers, and innovators collaborate to build web applications within a limited time. Participants solve real-world problems using front-end, back-end, and full-stack technologies, showcasing creativity, coding skills, and teamwork for prizes and recognition."
                image="vid/WhatsApp Image 2025-03-28 at 02.02.03.jpeg"
                accentColor="bg-emerald-500"
                eventId='web development-workshop'
                className="h-50% ml-20 transform hover:scale-105 transition-transform duration-300"
              />

              <EventCard
                title="Regular Classes"
                date="2 Dec 2023 - 3 Dec 2023"
                description="Regular classes on Google Meet for communication and development focus on enhancing soft skills, professional communication, and personal growth. Sessions cover public speaking, teamwork, leadership, and career development, providing interactive learning , and expert guidance for continuous improvement.."
                image="vid/Screenshot 2025-03-24 000110.png"
                accentColor="bg-purple-500"
                eventId='Regular-workshop'
                className="h-50% ml-20 transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;