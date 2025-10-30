import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-24 right-4 md:top-28 md:right-8 z-50 p-3 md:p-4 min-w-[48px] min-h-[48px] rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 active:bg-white/30 transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg touch-manipulation"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
      )}
    </button>
  );
};

