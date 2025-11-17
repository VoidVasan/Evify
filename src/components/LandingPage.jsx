import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      
      // Get bookmark count
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(u => u.id === userData.id);
      if (foundUser && foundUser.bookmarks) {
        setBookmarkCount(foundUser.bookmarks.length);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setShowProfileMenu(false);
    setBookmarkCount(0);
  };

  // Get user initials for avatar
  const getInitials = (name, email) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email.charAt(0).toUpperCase();
  };
  const categories = [
    { name: 'Competition', icon: '🏆', color: 'from-yellow-400 to-orange-500', label: 'Competitions' },
    { name: 'Workshop', icon: '🎓', color: 'from-blue-400 to-blue-600', label: 'Workshops' },
    { name: 'Hackathon', icon: '💻', color: 'from-green-400 to-emerald-600', label: 'Hackathons' },
    { name: 'Festival', icon: '🎉', color: 'from-pink-400 to-rose-600', label: 'Festivals' },
    { name: 'Competition', icon: '🔬', color: 'from-cyan-400 to-blue-600', label: 'Science Fairs' },
    { name: 'Workshop', icon: '🎨', color: 'from-purple-400 to-pink-600', label: 'Arts & Culture' },
    { name: 'Competition', icon: '🌍', color: 'from-indigo-400 to-purple-600', label: 'MUN Events' },
    { name: 'Hackathon', icon: '🌐', color: 'from-teal-400 to-cyan-600', label: 'Online Events' },
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900" onClick={() => {
      setShowProfileMenu(false);
      setShowCategoryDropdown(false);
    }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-purple-500/30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors"
          >
            Evify
          </button>
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate('/events')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Events
            </button>
            
            {/* Categories Dropdown */}
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCategoryDropdown(!showCategoryDropdown);
                }}
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
              >
                Categories
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {showCategoryDropdown && (
                <div className="absolute top-full mt-2 right-0 w-56 bg-gray-800 border border-purple-500/30 rounded-xl shadow-2xl py-2 z-50">
                  {categories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/events', { state: { category: cat.name } });
                        setShowCategoryDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-300 hover:bg-purple-500/20 hover:text-white transition-colors flex items-center gap-3"
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={() => navigate('/bookmarks')}
              className="text-gray-300 hover:text-white transition-colors flex items-center relative"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Bookmarks
              {bookmarkCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-purple-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 focus:outline-none group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold shadow-lg group-hover:scale-110 transition-transform duration-200">
                    {getInitials(currentUser.name, currentUser.email)}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-2xl overflow-hidden z-50 border border-purple-500/30">
                    <div className="p-4 border-b border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                          {getInitials(currentUser.name, currentUser.email)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold truncate">{currentUser.name || 'User'}</p>
                          <p className="text-gray-400 text-sm truncate">{currentUser.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => {
                          navigate('/bookmarks');
                          setShowProfileMenu(false);
                        }}
                        className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                          My Bookmarks
                        </div>
                        {bookmarkCount > 0 && (
                          <span className="px-2 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
                            {bookmarkCount}
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          navigate('/debug');
                          setShowProfileMenu(false);
                        }}
                        className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 rounded-lg transition-colors flex items-center"
                      >
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </button>
                      <div className="border-t border-gray-700 my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 rounded-lg transition-colors flex items-center font-semibold"
                      >
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
              >
                Login
              </button>
            )}
          </div>
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          {/* Logo/Brand */}
          <div className="mb-8 relative">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2 animate-gradient">
              Evify
            </h1>
          </div>

          {/* Headline with Gradient */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight relative">
            <span className="text-white">WHAT WE DO</span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-purple-200 mb-4 max-w-3xl mx-auto">
            Discover, connect, and participate in global student events.
          </p>
          <p className="text-base md:text-lg text-gray-300 mb-10 max-w-3xl mx-auto">
            Evify helps you find competitions, hackathons, fests, and more—secure, verified, and powered by smart recommendations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/events')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-1 w-full sm:w-auto"
            >
              Explore Events
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-2 border border-purple-500/30">
          <div className="flex flex-col md:flex-row gap-2">
            {/* Search Input */}
            <div className="flex-1 flex items-center px-4 py-3 bg-gray-700/50 rounded-xl border border-gray-600">
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    navigate('/events', { state: { search: searchQuery, category: searchCategory !== 'All' ? searchCategory : undefined } });
                  }
                }}
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
              />
            </div>

            {/* Category Select */}
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl outline-none text-white cursor-pointer hover:border-purple-500 transition-colors"
            >
              <option value="All">All Categories</option>
              <option value="Competition">Competitions</option>
              <option value="Workshop">Workshops</option>
              <option value="Hackathon">Hackathons</option>
              <option value="Festival">Festivals</option>
            </select>

            {/* Search Button */}
            <button 
              onClick={() => navigate('/events', { state: { search: searchQuery, category: searchCategory !== 'All' ? searchCategory : undefined } })}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Popular Categories
          </h2>
          <p className="text-gray-400 text-lg">
            Explore events by category
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => navigate('/events', { state: { category: category.name } })}
              className="bg-gray-800 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 group border border-gray-700 hover:border-purple-500"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {category.icon}
              </div>
              <h3 className="text-white font-semibold text-lg">
                {category.label}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Events */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trending Events
          </h2>
          <p className="text-gray-400 text-lg">
            Don't miss out on these popular opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              onClick={() => navigate('/event/1')}
              className="bg-gray-800 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 group border border-gray-700 hover:border-purple-500"
            >
              {/* Category Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className={`${event.color} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                  {event.category}
                </span>
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors duration-300"
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
              <h3 className="text-white font-bold text-xl mb-4 line-clamp-2 group-hover:text-purple-400 transition-colors">
                {event.title}
              </h3>

              {/* Event Details */}
              <div className="space-y-2">
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-4 h-4 mr-2 text-purple-400"
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
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-4 h-4 mr-2 text-purple-400"
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
              <button className="mt-6 w-full py-2 text-purple-400 font-semibold border-2 border-purple-500 rounded-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300">
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/events')}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-1"
          >
            View All Events
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-purple-500/30 mt-16 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-purple-400 font-bold text-xl mb-4">Evify</h3>
              <p className="text-gray-400 text-sm">
                Discover the best student events around the world.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Browse Events</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Categories</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Evify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
