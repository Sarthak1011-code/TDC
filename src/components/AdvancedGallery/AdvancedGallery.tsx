import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Download } from 'lucide-react';

interface GalleryImage {
  url: string;
  title?: string;
  category?: string;
}

interface AdvancedGalleryProps {
  images: GalleryImage[];
  columns?: number;
}

export const AdvancedGallery: React.FC<AdvancedGalleryProps> = ({ images, columns = 3 }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<string>('All');
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const categories = ['All', ...new Set(images.map(img => img.category).filter(Boolean))];
  const filteredImages = filter === 'All' 
    ? images 
    : images.filter(img => img.category === filter);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentIndex]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [lightboxOpen]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = filteredImages[currentIndex].url;
    link.download = `image-${currentIndex + 1}`;
    link.click();
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set([...prev, index]));
  };

  const getColumnClass = () => {
    const colMap: Record<number, string> = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    };
    return colMap[columns] || colMap[3];
  };

  return (
    <div className="w-full">
      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Masonry Grid */}
      <div className={`grid ${getColumnClass()} gap-4`}>
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => openLightbox(index)}
          >
            {/* Loading Skeleton */}
            {!loadedImages.has(index) && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse"></div>
            )}

            {/* Image */}
            <img
              src={image.url}
              alt={image.title || `Gallery image ${index + 1}`}
              className={`w-full h-64 object-cover transition-all duration-300 ${
                loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => handleImageLoad(index)}
              loading="lazy"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {image.title && (
                  <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                )}
                {image.category && (
                  <span className="text-purple-300 text-sm">{image.category}</span>
                )}
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <ZoomIn className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="absolute top-4 right-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label="Download image"
          >
            <Download className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Image */}
          <div className="max-w-7xl max-h-[90vh] p-4">
            <img
              src={filteredImages[currentIndex].url}
              alt={filteredImages[currentIndex].title || 'Gallery image'}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            {filteredImages[currentIndex].title && (
              <div className="text-center mt-4">
                <h3 className="text-white text-xl font-semibold">
                  {filteredImages[currentIndex].title}
                </h3>
                <p className="text-gray-400 mt-2">
                  {currentIndex + 1} / {filteredImages.length}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

