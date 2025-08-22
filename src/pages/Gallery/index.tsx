import { Image, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar/Navbar';

export function Gallery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-deep-blue-900 via-deep-blue-800 to-black">
            <Navbar />
            <section className="pt-20 md:pt-24 pb-12 md:pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16" data-animate data-animation="fade">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue-500 to-white mb-3 md:mb-4 animate-gradient">
                            Community Highlights
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-300 animate-fade-in max-w-2xl mx-auto px-4">
                            Glimpses of our events, workshops, and hackathons
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                        {[
                            {
                                url: "vid/untitled folder/IMG_1539.JPG",
                                animation: "slide-right",
                                delay: "200"
                            },
                            {
                                url: "vid/untitled folder/IMG_1560.JPG",
                                animation: "slide-up",
                                delay: "400"
                            },
                            {
                                url: "vid/untitled folder/IMG_1562.JPG",
                                animation: "slide-left",
                                delay: "600"
                            },
                            {
                                url: "vid/untitled folder/IMG_1565.JPG",
                                animation: "slide-right",
                                delay: "800"
                            },
                            {
                                url: "vid/untitled folder/IMG_1568.JPG",
                                animation: "slide-up",
                                delay: "1000"
                            },
                            {
                                url: "vid/untitled folder/IMG_1570.JPG",
                                animation: "slide-left",
                                delay: "1200"
                            },
                            {
                                url: "vid/untitled folder/IMG_1572.JPG",
                                animation: "slide-right",
                                delay: "1400"
                            },
                            {
                                url: "vid/untitled folder/IMG_1574.JPG",
                                animation: "slide-up",
                                delay: "1600"
                            },
                            {
                                url: "vid/untitled folder/IMG_1575.JPG",
                                animation: "slide-left",
                                delay: "1800"
                            },
                            {
                                url: "vid/untitled folder/IMG_1581.JPG",
                                animation: "slide-right",
                                delay: "2000"
                            },
                            {
                                url: "vid/untitled folder/IMG_1586.JPG",
                                animation: "slide-up",
                                delay: "2200"
                            },
                            {
                                url: "vid/untitled folder/IMG_1590.JPG",
                                animation: "slide-left",
                                delay: "2400"
                            },
                            {
                                url: "vid/untitled folder/Screenshot 2025-02-26 120900.png",
                                animation: "slide-right",
                                delay: "2600"
                            },
                            {
                                url: "vid/untitled folder/Screenshot 2025-02-26 145958.png",
                                animation: "slide-up",
                                delay: "2800"
                            },
                            {
                                url: "vid/untitled folder/Screenshot 2025-03-25 170709.png",
                                animation: "slide-left",
                                delay: "3000"
                            },
                        ].map(({ url, animation, delay }, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-lg md:rounded-xl bg-deep-blue-800/30 backdrop-blur-sm md:backdrop-blur-lg border border-deep-blue-600/20 hover:border-accent-blue-500/50 transition-all duration-300 md:duration-500 transform hover:scale-[1.02] hover:shadow-lg md:hover:shadow-xl hover:shadow-accent-blue-500/10"
                                data-animate
                                data-animation={animation}
                                data-delay={delay}
                            >
                                <div className="aspect-w-16 aspect-h-9 relative">
                                    <img
                                        src={url}
                                        alt={`Gallery image ${index + 1}`}
                                        className="w-full h-48 sm:h-56 md:h-64 object-cover transform transition-all duration-500 ease-in-out group-hover:scale-105 md:group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-deep-blue-900/90 via-deep-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between">
                                            <Image className="w-5 h-5 md:w-6 md:h-6 text-accent-blue-500" />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedImage(url);
                                                }}
                                                className="p-1.5 md:p-2 rounded-full bg-accent-blue-500/20 hover:bg-accent-blue-500/30 transition-colors duration-200"
                                            >
                                                <Maximize2 className="w-4 h-4 md:w-5 md:h-5 text-accent-blue-500" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lightbox */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4 animate-fade-in"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="relative w-full max-w-5xl xl:max-w-7xl max-h-[90vh] flex items-center justify-center">
                            <img
                                src={selectedImage}
                                alt="Selected image"
                                className="max-w-full max-h-[90vh] object-contain rounded-md sm:rounded-lg shadow-xl sm:shadow-2xl animate-fade-in"
                            />
                            <button
                                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-accent-blue-500/20 hover:bg-accent-blue-500/30 transition-colors duration-200"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(null);
                                }}
                            >
                                <Maximize2 className="w-5 h-5 sm:w-6 sm:h-6 text-accent-blue-500" />
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}