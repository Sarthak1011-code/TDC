import { Navbar } from '../../../components/layout/Navbar/Navbar';
import { achievements, icons, sections } from '../data/achievementsData';







function HallOfFame() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            Hall of Fame
          </h1>
          <p className="text-xl text-gray-300">
            Celebrating our community's outstanding achievements
          </p>
        </div>

        {/* Sections with cards */}
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-20">
            <div className="text-center mb-10">
              <h2 className={`text-3xl font-bold ${section.titleColor} mb-3`}>
                {section.title}
              </h2>
              <p className="text-gray-300">{section.description}</p>
            </div>

            <div className={`bg-gradient-to-r ${section.gradient} rounded-2xl p-8 mb-8`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {achievements.slice(sectionIndex * 2, sectionIndex * 2 + 2).map((achievement, index) => {
                  const IconComponent = icons[achievement.icon];
                  return (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 border border-white/20"
                    >
                      <div className="relative h-64">
                        <img
                          src={achievement.image}
                          alt={achievement.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                          <IconComponent className="w-6 h-6 text-yellow-500" />
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-white">{achievement.name}</h3>
                          <span className="text-sm font-medium text-gray-300 bg-white/10 px-3 py-1 rounded-full">
                            {achievement.year}
                          </span>
                        </div>
                        <p className="text-purple-300 font-medium mb-2">{achievement.title}</p>
                        <p className="text-gray-300">{achievement.achievement}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Total Achievers", value: "50+", color: "from-blue-400 to-blue-600" },
            { label: "Certifications", value: "100+", color: "from-purple-400 to-purple-600" },
            { label: "Hackathon Wins", value: "25", color: "from-emerald-400 to-emerald-600" },
            { label: "Awards", value: "40+", color: "from-pink-400 to-pink-600" }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 border border-white/20"
            >
              <div className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HallOfFame;