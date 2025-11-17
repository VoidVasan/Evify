import React from 'react';

const categories = [
  { name: 'Competitions', icon: '🏆', color: 'from-yellow-400 to-orange-500' },
  { name: 'Olympiads', icon: '🎓', color: 'from-blue-400 to-blue-600' },
  { name: 'Hackathons', icon: '💻', color: 'from-green-400 to-emerald-600' },
  { name: 'MUNs', icon: '🌍', color: 'from-indigo-400 to-purple-600' },
  { name: 'Fests', icon: '🎉', color: 'from-pink-400 to-rose-600' },
  { name: 'Science Fairs', icon: '🔬', color: 'from-cyan-400 to-blue-600' },
  { name: 'Arts & Writing', icon: '🎨', color: 'from-purple-400 to-pink-600' },
  { name: 'Online Events', icon: '🌐', color: 'from-teal-400 to-cyan-600' },
];

const Categories = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Popular Categories
        </h2>
        <p className="text-white/80 text-lg">
          Explore events by category
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="glass-card rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          >
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {category.icon}
            </div>
            <h3 className="text-gray-800 font-semibold text-lg">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
