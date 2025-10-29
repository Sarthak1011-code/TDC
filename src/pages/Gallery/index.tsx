import { Navbar } from '../../components/layout/Navbar/Navbar';
import { AdvancedGallery } from '../../components/AdvancedGallery';

export function Gallery() {
    const images = [
        { url: "vid/untitled folder/IMG_1539.JPG", title: "Workshop Session", category: "Workshops" },
        { url: "vid/untitled folder/IMG_1560.JPG", title: "Team Collaboration", category: "Events" },
        { url: "vid/untitled folder/IMG_1562.JPG", title: "Coding Competition", category: "Hackathons" },
        { url: "vid/untitled folder/IMG_1565.JPG", title: "Community Gathering", category: "Events" },
        { url: "vid/untitled folder/IMG_1568.JPG", title: "Tech Talk", category: "Workshops" },
        { url: "vid/untitled folder/IMG_1570.JPG", title: "Hackathon Kickoff", category: "Hackathons" },
        { url: "vid/untitled folder/IMG_1572.JPG", title: "Project Showcase", category: "Events" },
        { url: "vid/untitled folder/IMG_1574.JPG", title: "Mentoring Session", category: "Workshops" },
        { url: "vid/untitled folder/IMG_1575.JPG", title: "Team Building", category: "Events" },
        { url: "vid/untitled folder/IMG_1581.JPG", title: "Code Sprint", category: "Hackathons" },
        { url: "vid/untitled folder/IMG_1586.JPG", title: "Awards Ceremony", category: "Events" },
        { url: "vid/untitled folder/IMG_1590.JPG", title: "Group Photo", category: "Events" },
        { url: "vid/untitled folder/Screenshot 2025-02-26 120900.png", title: "Tech Presentation", category: "Workshops" },
        { url: "vid/untitled folder/Screenshot 2025-02-26 145958.png", title: "Innovation Lab", category: "Workshops" },
        { url: "vid/untitled folder/Screenshot 2025-03-25 170709.png", title: "Final Showcase", category: "Events" },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 bg-gradient-to-br from-purple-50 via-white to-pink-50 transition-colors duration-300">
            <Navbar />
            <section className="pt-20 md:pt-24 pb-12 md:pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-3 md:mb-4">
                            Community Highlights
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                            Glimpses of our events, workshops, and hackathons
                        </p>
                    </div>

                    <AdvancedGallery images={images} columns={3} />
                </div>
            </section>
        </div>
    );
}
