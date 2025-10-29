import { useState } from 'react';
import { Award, Code, Users, Trophy, Star, Zap, Target, Heart } from 'lucide-react';

interface Badge {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum';
  earned: boolean;
  progress?: number;
  requirement?: string;
}

const badges: Badge[] = [
  {
    id: 1,
    title: "First Steps",
    description: "Joined the community",
    icon: Star,
    rarity: "bronze",
    earned: true,
    requirement: "Join TIT Dev Community"
  },
  {
    id: 2,
    title: "Code Warrior",
    description: "Completed 5 coding challenges",
    icon: Code,
    rarity: "silver",
    earned: true,
    progress: 100,
    requirement: "Complete 5 challenges"
  },
  {
    id: 3,
    title: "Team Player",
    description: "Participated in a hackathon",
    icon: Users,
    rarity: "gold",
    earned: true,
    requirement: "Join a hackathon"
  },
  {
    id: 4,
    title: "Master Builder",
    description: "Built 10 projects",
    icon: Trophy,
    rarity: "platinum",
    earned: false,
    progress: 60,
    requirement: "Build 10 projects"
  },
  {
    id: 5,
    title: "Speed Demon",
    description: "Solved problem in under 5 minutes",
    icon: Zap,
    rarity: "silver",
    earned: true,
    requirement: "Solve fast!"
  },
  {
    id: 6,
    title: "Perfectionist",
    description: "Achieved 100% test coverage",
    icon: Target,
    rarity: "gold",
    earned: false,
    progress: 85,
    requirement: "100% test coverage"
  },
  {
    id: 7,
    title: "Community Hero",
    description: "Helped 50+ members",
    icon: Heart,
    rarity: "platinum",
    earned: false,
    progress: 30,
    requirement: "Help 50 members"
  },
  {
    id: 8,
    title: "Top Contributor",
    description: "Made 100+ contributions",
    icon: Award,
    rarity: "platinum",
    earned: false,
    progress: 45,
    requirement: "100+ contributions"
  },
];

const rarityColors = {
  bronze: {
    bg: 'from-orange-700 to-orange-900',
    glow: 'shadow-orange-500/50',
    border: 'border-orange-500',
    text: 'text-orange-400'
  },
  silver: {
    bg: 'from-gray-400 to-gray-600',
    glow: 'shadow-gray-400/50',
    border: 'border-gray-400',
    text: 'text-gray-300'
  },
  gold: {
    bg: 'from-yellow-400 to-yellow-600',
    glow: 'shadow-yellow-500/50',
    border: 'border-yellow-500',
    text: 'text-yellow-400'
  },
  platinum: {
    bg: 'from-purple-500 via-pink-500 to-purple-500',
    glow: 'shadow-purple-500/50',
    border: 'border-purple-500',
    text: 'text-purple-400'
  }
};

export const AchievementBadges = () => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  return (
    <div className="w-full">
      {/* Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {badges.map((badge) => {
          const Icon = badge.icon;
          const colors = rarityColors[badge.rarity];

          return (
            <div
              key={badge.id}
              className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                badge.earned ? '' : 'opacity-60 grayscale'
              }`}
              onClick={() => setSelectedBadge(badge)}
            >
              {/* Badge Container */}
              <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${colors.bg} ${
                badge.earned ? `shadow-xl ${colors.glow}` : 'shadow-lg'
              }`}>
                {/* Shine Effect */}
                {badge.earned && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-2xl animate-pulse"></div>
                )}

                {/* Icon */}
                <div className="relative mb-3">
                  <Icon className={`w-12 h-12 md:w-16 md:h-16 text-white mx-auto ${
                    badge.earned ? 'animate-bounce' : ''
                  }`} style={{ animationDuration: '3s' }} />
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-sm md:text-base text-center mb-1">
                  {badge.title}
                </h3>

                {/* Rarity Badge */}
                <div className="text-center">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-black/30 rounded-full uppercase">
                    {badge.rarity}
                  </span>
                </div>

                {/* Progress Bar (if not earned) */}
                {!badge.earned && badge.progress && (
                  <div className="mt-3">
                    <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-white transition-all duration-500"
                        style={{ width: `${badge.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-white text-xs text-center mt-1">{badge.progress}%</p>
                  </div>
                )}

                {/* Lock Icon (if not earned) */}
                {!badge.earned && (
                  <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                )}

                {/* Checkmark (if earned) */}
                {badge.earned && (
                  <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Hover Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {badge.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Badge Details */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-md w-full border-2 border-purple-500/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Badge Icon */}
            <div className="text-center mb-6">
              {(() => {
                const Icon = selectedBadge.icon;
                const colors = rarityColors[selectedBadge.rarity];
                return (
                  <div className={`inline-block p-8 rounded-full bg-gradient-to-br ${colors.bg} shadow-xl ${colors.glow}`}>
                    <Icon className="w-16 h-16 text-white" />
                  </div>
                );
              })()}
            </div>

            {/* Badge Info */}
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              {selectedBadge.title}
            </h2>
            <p className={`text-center mb-4 uppercase text-sm font-semibold ${rarityColors[selectedBadge.rarity].text}`}>
              {selectedBadge.rarity} Badge
            </p>
            <p className="text-gray-300 text-center mb-4">
              {selectedBadge.description}
            </p>

            {/* Requirement */}
            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-400 text-center">
                <span className="font-semibold">Requirement:</span> {selectedBadge.requirement}
              </p>
            </div>

            {/* Progress or Status */}
            {selectedBadge.earned ? (
              <div className="text-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full font-semibold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlocked!
                </span>
              </div>
            ) : (
              <div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${selectedBadge.progress || 0}%` }}
                  ></div>
                </div>
                <p className="text-white text-center">{selectedBadge.progress || 0}% Complete</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

