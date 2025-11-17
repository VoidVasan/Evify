import React from 'react';

const SearchBar = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
      <div className="glass-card rounded-2xl shadow-2xl p-2">
        <div className="flex flex-col md:flex-row gap-2">
          {/* Search Input */}
          <div className="flex-1 flex items-center px-4 py-3 bg-white/50 rounded-xl">
            <svg
              className="w-5 h-5 text-gray-400 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search for competitions, hackathons, fests..."
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Category Dropdown */}
          <select className="px-4 py-3 bg-white/50 rounded-xl outline-none text-gray-700 cursor-pointer">
            <option>All Categories</option>
            <option>Competitions</option>
            <option>Olympiads</option>
            <option>Hackathons</option>
            <option>MUNs</option>
            <option>Fests</option>
            <option>Science Fairs</option>
            <option>Arts & Writing</option>
            <option>Online Events</option>
          </select>

          {/* Search Button */}
          <button className="px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-lg">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
