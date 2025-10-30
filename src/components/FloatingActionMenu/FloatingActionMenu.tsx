import { useState } from 'react';
import { Plus, Share2, MessageCircle, Mail, X, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export const FloatingActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shareOnSocial = (platform: string) => {
    const url = window.location.href;
    const text = 'Check out TIT Developer Community!';
    
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
    setIsOpen(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
    setIsOpen(false);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/your-number', '_blank');
    setIsOpen(false);
  };

  const actions = [
    { icon: Facebook, label: 'Share on Facebook', action: () => shareOnSocial('facebook'), color: 'from-blue-600 to-blue-700' },
    { icon: Twitter, label: 'Share on Twitter', action: () => shareOnSocial('twitter'), color: 'from-sky-500 to-sky-600' },
    { icon: Linkedin, label: 'Share on LinkedIn', action: () => shareOnSocial('linkedin'), color: 'from-blue-700 to-blue-800' },
    { icon: LinkIcon, label: 'Copy Link', action: copyLink, color: 'from-gray-600 to-gray-700' },
    { icon: MessageCircle, label: 'WhatsApp', action: openWhatsApp, color: 'from-green-500 to-green-600' },
    { icon: Mail, label: 'Contact Us', action: scrollToContact, color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="fixed bottom-24 md:bottom-28 right-4 md:right-8 z-40">
      {/* Action Buttons */}
      <div className={`flex flex-col-reverse gap-3 mb-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3 group"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Label */}
              <span className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                {action.label}
              </span>
              
              {/* Button */}
              <button
                onClick={action.action}
                className={`p-4 min-w-[48px] min-h-[48px] rounded-full bg-gradient-to-r ${action.color} text-white shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 transform hover:scale-110 touch-manipulation`}
                aria-label={action.label}
              >
                <Icon className="w-5 h-5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 md:p-5 min-w-[56px] min-h-[56px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl hover:shadow-purple-500/50 active:scale-95 transition-all duration-300 transform hover:scale-110 touch-manipulation ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
        aria-label="Toggle action menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </button>
    </div>
  );
};

