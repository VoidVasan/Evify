import React from 'react';

const events = [
  {
    title: 'International Science Olympiad 2024',
    category: 'Olympiad',
    location: 'Singapore',
    deadline: 'Dec 15, 2024',
    color: 'bg-blue-500',
  },
  {
    title: 'Global Youth Hackathon',
    category: 'Hackathon',
    location: 'Online',
    deadline: 'Jan 20, 2025',
    color: 'bg-green-500',
  },
  {
    title: 'Harvard Model United Nations',
    category: 'MUN',
    location: 'Boston, USA',
    deadline: 'Nov 30, 2024',
    color: 'bg-purple-500',
  },
  {
    title: 'National Creative Writing Contest',
    category: 'Arts & Writing',
    location: 'Online',
    deadline: 'Dec 31, 2024',
    color: 'bg-pink-500',
  },
  {
    title: 'TechFest 2025 - IIT Bombay',
    category: 'Fest',
    location: 'Mumbai, India',
    deadline: 'Jan 10, 2025',
    color: 'bg-orange-500',
  },
];

const TrendingEvents = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Trending Events
        </h2>
        <p className="text-white/80 text-lg">
          Don't miss out on these popular opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          >
            {/* Category Tag */}
            <div className="flex items-center justify-between mb-4">
              <span className={`${event.color} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                {event.category}
              </span>
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>

            {/* Event Title */}
            <h3 className="text-gray-800 font-bold text-xl mb-4 line-clamp-2">
              {event.title}
            </h3>

            {/* Event Details */}
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm">{event.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm">Deadline: {event.deadline}</span>
              </div>
            </div>

            {/* View Details Button */}
            <button className="mt-6 w-full py-2 text-primary font-semibold border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <button className="px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          View All Events
        </button>
      </div>
    </div>
  );
};

export default TrendingEvents;
