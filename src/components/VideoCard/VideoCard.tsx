import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface VideoCardProps {
  title: string;
  description: string;
  videoUrl: string;
  isMobile?: boolean;
  imageUrl?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  title,
  description,
  videoUrl,
  isMobile = false,
  imageUrl
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div 
      className="relative group overflow-hidden rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 h-[300px] sm:h-[350px] md:h-[400px] cursor-pointer"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {isMobile && imageUrl ? (
        <img 
          src={imageUrl} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          loading="lazy"
        />
      ) : (
        <>
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
              isPlaying ? 'opacity-60' : 'opacity-0 group-hover:opacity-30'
            }`}
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
          </video>

          {/* Video Controls Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-300 ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
          }`}>
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-lg"
            >
              {isPlaying ? (
                <div className="flex gap-1">
                  <div className="w-2 h-8 bg-white rounded"></div>
                  <div className="w-2 h-8 bg-white rounded"></div>
                </div>
              ) : (
                <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
              )}
            </button>

            {/* Volume Button */}
            <button
              onClick={toggleMute}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center hover:bg-white/30 transition-all duration-300"
            >
              {isMuted ? (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Playing Indicator */}
            {isPlaying && (
              <div className="absolute bottom-4 left-4 flex gap-1">
                <div className="w-1 h-4 bg-white rounded animate-pulse" style={{animationDelay: '0ms'}}></div>
                <div className="w-1 h-6 bg-white rounded animate-pulse" style={{animationDelay: '150ms'}}></div>
                <div className="w-1 h-5 bg-white rounded animate-pulse" style={{animationDelay: '300ms'}}></div>
                <div className="w-1 h-7 bg-white rounded animate-pulse" style={{animationDelay: '450ms'}}></div>
              </div>
            )}
          </div>
        </>
      )}
      
      <div className={`relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between transition-opacity duration-300 ${
        isPlaying ? 'opacity-80' : 'opacity-100'
      }`}>
        <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600">
          {title}
        </h3>
        <p className="text-base sm:text-lg md:text-xl text-gray-300">{description}</p>
        <div className="flex justify-end">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center transform group-hover:rotate-90 transition-transform duration-500">
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

