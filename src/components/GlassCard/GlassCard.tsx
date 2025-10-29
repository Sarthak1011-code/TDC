import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  blur = 'lg',
  opacity = 10,
  hover = true
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };

  return (
    <div
      className={`
        bg-white/${opacity} 
        dark:bg-white/${opacity} 
        ${blurClasses[blur]} 
        rounded-2xl 
        border 
        border-white/20 
        shadow-xl 
        ${hover ? 'hover:shadow-2xl hover:border-purple-400/50 hover:scale-105' : ''}
        transition-all 
        duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
};

