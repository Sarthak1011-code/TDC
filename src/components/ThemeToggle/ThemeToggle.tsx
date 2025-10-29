import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-24 right-4 md:top-28 md:right-8 z-50 p-3 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 shadow-lg"
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

