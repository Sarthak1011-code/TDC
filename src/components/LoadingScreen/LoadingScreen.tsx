import { useEffect, useState, useRef } from 'react';
import { Terminal } from 'lucide-react';

export const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [binaryStrings, setBinaryStrings] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadingMessages = [
    'INITIALIZING SYSTEM...',
    'LOADING MODULES...',
    'COMPILING ASSETS...',
    'ESTABLISHING CONNECTION...',
    'DECRYPTING DATA...',
    'FINALIZING...',
    'ACCESS GRANTED'
  ];

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  // Generate binary strings
  useEffect(() => {
    const generateBinary = () => {
      const binary = [];
      for (let i = 0; i < 8; i++) {
        binary.push(
          Array.from({ length: 40 }, () => Math.random() > 0.5 ? '1' : '0').join('')
        );
      }
      setBinaryStrings(binary);
    };

    generateBinary();
    const interval = setInterval(generateBinary, 100);
    return () => clearInterval(interval);
  }, []);

  // Loading progress and messages
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, []);

  // Typing effect for loading messages
  useEffect(() => {
    const messageIndex = Math.floor(progress / (100 / loadingMessages.length));
    const message = loadingMessages[Math.min(messageIndex, loadingMessages.length - 1)];
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= message.length) {
        setLoadingText(message.slice(0, currentIndex) + (currentIndex < message.length ? '█' : ''));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-500">
      {/* Matrix Rain Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-20"
      />

      {/* Binary Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10 font-mono text-xs text-green-500">
        {binaryStrings.map((binary, i) => (
          <div key={i} className="whitespace-nowrap">
            {binary}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl px-4">
        {/* Terminal Window */}
        <div className="bg-black border-2 border-green-500 rounded-lg overflow-hidden shadow-2xl shadow-green-500/50">
          {/* Terminal Header */}
          <div className="bg-green-500/10 border-b border-green-500 px-4 py-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <Terminal className="w-4 h-4 text-green-500 ml-2" />
            <span className="text-green-500 text-sm font-mono">root@tit-dev-community:~</span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono">
            {/* ASCII Art */}
            <pre className="text-green-500 text-xs mb-4 animate-pulse leading-tight">
{`
████████╗██╗████████╗    ██████╗ ███████╗██╗   ██╗
╚══██╔══╝██║╚══██╔══╝    ██╔══██╗██╔════╝██║   ██║
   ██║   ██║   ██║       ██║  ██║█████╗  ██║   ██║
   ██║   ██║   ██║       ██║  ██║██╔══╝  ╚██╗ ██╔╝
   ██║   ██║   ██║       ██████╔╝███████╗ ╚████╔╝ 
   ╚═╝   ╚═╝   ╚═╝       ╚═════╝ ╚══════╝  ╚═══╝  
`}
            </pre>

            {/* Loading Messages */}
            <div className="space-y-2 mb-4">
              <div className="text-green-500 text-sm">
                <span className="text-green-400">{'>'}</span> sudo systemctl start tit-community
              </div>
              <div className="text-green-500/70 text-sm">
                [OK] Started TIT Developer Community Portal
              </div>
              <div className="text-green-500 text-sm flex items-center gap-2">
                <span className="text-green-400">{'>'}</span>
                <span className="animate-pulse">{loadingText}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center gap-2 text-green-500 text-sm mb-1">
                <span>[</span>
                <div className="flex-1 flex">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <span key={i}>
                      {i < (progress / 2) ? '█' : '░'}
                    </span>
                  ))}
                </div>
                <span>] {Math.floor(progress)}%</span>
              </div>
            </div>

            {/* System Info */}
            <div className="text-green-500/50 text-xs space-y-1">
              <div className="flex justify-between">
                <span>Memory: {Math.floor(progress * 10.24)}MB / 1024MB</span>
                <span>CPU: {Math.floor(progress)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Network: CONNECTED</span>
                <span className="animate-pulse">Status: {progress >= 100 ? 'READY' : 'LOADING'}</span>
              </div>
            </div>

            {/* Blinking Cursor */}
            <div className="mt-4 text-green-500">
              <span className="text-green-400">{'>'}</span>
              <span className="animate-pulse ml-1">█</span>
            </div>
          </div>
        </div>

        {/* Glitch Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-green-500/5 animate-pulse"></div>
        </div>
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scan"></div>
    </div>
  );
};

