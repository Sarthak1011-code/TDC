import { useEffect, useRef, useState, ReactNode, Children, cloneElement, isValidElement } from 'react';

interface StaggerAnimationProps {
  children: ReactNode;
  staggerDelay?: number;
  animation?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate';
  className?: string;
}

export const StaggerAnimation: React.FC<StaggerAnimationProps> = ({
  children,
  staggerDelay = 100,
  animation = 'fadeUp',
  className = ''
}) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const animationClasses = {
    fadeUp: 'translate-y-12 opacity-0',
    fadeDown: '-translate-y-12 opacity-0',
    fadeLeft: 'translate-x-12 opacity-0',
    fadeRight: '-translate-x-12 opacity-0',
    scale: 'scale-50 opacity-0',
    rotate: 'rotate-12 opacity-0'
  };

  const activeClasses = 'translate-y-0 translate-x-0 scale-100 rotate-0 opacity-100';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger stagger animation for all children
            const childCount = Children.count(children);
            for (let i = 0; i < childCount; i++) {
              setTimeout(() => {
                setVisibleItems(prev => new Set([...prev, i]));
              }, i * staggerDelay);
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [children, staggerDelay]);

  return (
    <div ref={containerRef} className={className}>
      {Children.map(children, (child, index) => {
        const isVisible = visibleItems.has(index);
        
        if (isValidElement(child)) {
          return cloneElement(child as React.ReactElement, {
            className: `${(child as any).props.className || ''} transition-all duration-700 ${
              isVisible ? activeClasses : animationClasses[animation]
            }`,
          });
        }
        
        return (
          <div
            key={index}
            className={`transition-all duration-700 ${
              isVisible ? activeClasses : animationClasses[animation]
            }`}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

