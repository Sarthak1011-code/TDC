import { useEffect, useState } from 'react';

export const InteractiveCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    // Check if device has mouse (not mobile)
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hasTouch) {
      setIsHidden(true);
      return;
    }

    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add trail point
      const newPoint = { x: e.clientX, y: e.clientY, id: trailId++ };
      setTrail(prev => [...prev, newPoint].slice(-10)); // Keep last 10 points
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.onclick !== null ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Clean up old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Trail Effect */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="pointer-events-none fixed z-[9999] rounded-full bg-purple-500/30 mix-blend-screen"
          style={{
            left: point.x,
            top: point.y,
            width: `${(index + 1) * 2}px`,
            height: `${(index + 1) * 2}px`,
            transform: 'translate(-50%, -50%)',
            opacity: (index + 1) / trail.length,
            transition: 'opacity 0.3s',
          }}
        />
      ))}

      {/* Main Cursor */}
      <div
        className="pointer-events-none fixed z-[10000] mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full border-2 border-white transition-all duration-300 ${
            isPointer ? 'w-12 h-12 bg-white/10' : 'w-8 h-8'
          }`}
        />
      </div>

      {/* Inner Dot */}
      <div
        className="pointer-events-none fixed z-[10001]"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full bg-white transition-all duration-150 ${
            isPointer ? 'w-1 h-1' : 'w-2 h-2'
          }`}
        />
      </div>

      {/* CSS to hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

