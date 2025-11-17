import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EventsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [visibleEvents, setVisibleEvents] = useState(8);

  // Get category from navigation state
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
    if (location.state?.search) {
      setSearchQuery(location.state.search);
    }
  }, [location]);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const bookmarkCount = currentUser 
    ? users.find(u => u.email === currentUser.email)?.bookmarks?.length || 0 
    : 0;

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getInitials = (name, email) => {
    if (name) {
      const names = name.split(' ');
      return names.length > 1 
        ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
        : names[0].substring(0, 2).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
    window.location.reload();
  };

  const allEvents = [
    {
      id: 1,
      title: "Global Hackathon 2024",
      category: "Competition",
      location: "New York, USA",
      date: "Dec 15-17, 2024",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
      participants: "2000+ participants",
      prize: "$50,000 prize pool",
      difficulty: "Advanced"
    },
    {
      id: 2,
      title: "Tech Fest India",
      category: "Festival",
      location: "Mumbai, India",
      date: "Jan 20-22, 2025",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop",
      participants: "5000+ participants",
      prize: "Workshops & Exhibitions",
      difficulty: "Beginner"
    },
    {
      id: 3,
      title: "AI Workshop Series",
      category: "Workshop",
      location: "London, UK",
      date: "Feb 5-7, 2025",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop",
      participants: "500+ participants",
      prize: "Certificate & Projects",
      difficulty: "Intermediate"
    },
    {
      id: 4,
      title: "Science Olympiad",
      category: "Competition",
      location: "Tokyo, Japan",
      date: "Mar 10-12, 2025",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop",
      participants: "1000+ participants",
      prize: "Medals & Scholarships",
      difficulty: "Advanced"
    },
    {
      id: 5,
      title: "Music & Arts Festival",
      category: "Festival",
      location: "Paris, France",
      date: "Apr 15-17, 2025",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop",
      participants: "3000+ participants",
      prize: "Performances & Networking",
      difficulty: "Beginner"
    },
    {
      id: 6,
      title: "Robotics Championship",
      category: "Competition",
      location: "Singapore",
      date: "May 20-22, 2025",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop",
      participants: "800+ participants",
      prize: "$30,000 prize pool",
      difficulty: "Advanced"
    },
    {
      id: 7,
      title: "AI Innovation Hackathon",
      category: "Hackathon",
      location: "Dubai, UAE",
      date: "Jun 5-7, 2025",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop",
      participants: "1500+ participants",
      prize: "$40,000 prize pool",
      difficulty: "Intermediate"
    },
    {
      id: 8,
      title: "Web Development Bootcamp",
      category: "Workshop",
      location: "Berlin, Germany",
      date: "Jul 10-12, 2025",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
      participants: "600+ participants",
      prize: "Certificate & Portfolio",
      difficulty: "Beginner"
    },
    {
      id: 9,
      title: "Green Tech Hackathon",
      category: "Hackathon",
      location: "Toronto, Canada",
      date: "Aug 15-17, 2025",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
      participants: "2500+ participants",
      prize: "$60,000 prize pool",
      difficulty: "Intermediate"
    },
    {
      id: 10,
      title: "Gaming Championship",
      category: "Competition",
      location: "Seoul, South Korea",
      date: "Sep 20-22, 2025",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop",
      participants: "4000+ participants",
      prize: "$100,000 prize pool",
      difficulty: "Advanced"
    },
    {
      id: 11,
      title: "Design Thinking Workshop",
      category: "Workshop",
      location: "Amsterdam, Netherlands",
      date: "Oct 5-7, 2025",
      image: "https://images.unsplash.com/photo-1558403194-611308249627?w=800&auto=format&fit=crop",
      participants: "400+ participants",
      prize: "Certificate & Portfolio",
      difficulty: "Beginner"
    },
    {
      id: 12,
      title: "Cultural Fest",
      category: "Festival",
      location: "Sydney, Australia",
      date: "Nov 10-12, 2025",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop",
      participants: "3500+ participants",
      prize: "Performances & Awards",
      difficulty: "Beginner"
    },
    {
      id: 13,
      title: "Cybersecurity Challenge",
      category: "Competition",
      location: "San Francisco, USA",
      date: "Dec 1-3, 2025",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
      participants: "1200+ participants",
      prize: "$75,000 prize pool",
      difficulty: "Advanced"
    },
    {
      id: 14,
      title: "Photography Exhibition",
      category: "Festival",
      location: "Barcelona, Spain",
      date: "Jan 15-17, 2026",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&auto=format&fit=crop",
      participants: "2000+ participants",
      prize: "Gallery Features & Awards",
      difficulty: "Intermediate"
    },
    {
      id: 15,
      title: "Machine Learning Bootcamp",
      category: "Workshop",
      location: "Bangalore, India",
      date: "Feb 10-12, 2026",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop",
      participants: "700+ participants",
      prize: "Industry Certificate",
      difficulty: "Advanced"
    },
    {
      id: 16,
      title: "Startup Pitch Competition",
      category: "Competition",
      location: "Tel Aviv, Israel",
      date: "Mar 5-7, 2026",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop",
      participants: "500+ participants",
      prize: "$200,000 investment",
      difficulty: "Intermediate"
    },
    {
      id: 17,
      title: "Blockchain Hackathon",
      category: "Hackathon",
      location: "Zurich, Switzerland",
      date: "Apr 20-22, 2026",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop",
      participants: "3000+ participants",
      prize: "$80,000 prize pool",
      difficulty: "Advanced"
    },
    {
      id: 18,
      title: "Mobile App Development",
      category: "Workshop",
      location: "Austin, USA",
      date: "May 15-17, 2026",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
      participants: "550+ participants",
      prize: "App Launch Support",
      difficulty: "Intermediate"
    },
    {
      id: 19,
      title: "Dance & Performance Fest",
      category: "Festival",
      location: "Rio de Janeiro, Brazil",
      date: "Jun 10-12, 2026",
      image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&auto=format&fit=crop",
      participants: "4500+ participants",
      prize: "Performance Opportunities",
      difficulty: "Beginner"
    },
    {
      id: 20,
      title: "Math Olympics",
      category: "Competition",
      location: "Stockholm, Sweden",
      date: "Jul 8-10, 2026",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop",
      participants: "900+ participants",
      prize: "Scholarships & Medals",
      difficulty: "Advanced"
    },
    {
      id: 21,
      title: "Design-a-thon 2026",
      category: "Hackathon",
      location: "Copenhagen, Denmark",
      date: "Aug 12-14, 2026",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop",
      participants: "1800+ participants",
      prize: "$35,000 prize pool",
      difficulty: "Intermediate"
    },
    {
      id: 22,
      title: "Film Making Workshop",
      category: "Workshop",
      location: "Los Angeles, USA",
      date: "Sep 5-7, 2026",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop",
      participants: "350+ participants",
      prize: "Film Festival Entry",
      difficulty: "Beginner"
    },
    {
      id: 23,
      title: "Space Tech Hackathon",
      category: "Hackathon",
      location: "Cape Town, South Africa",
      date: "Oct 18-20, 2026",
      image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&auto=format&fit=crop",
      participants: "2200+ participants",
      prize: "$70,000 prize pool",
      difficulty: "Advanced"
    },
    {
      id: 24,
      title: "Literary Arts Festival",
      category: "Festival",
      location: "Edinburgh, Scotland",
      date: "Nov 22-24, 2026",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop",
      participants: "2800+ participants",
      prize: "Publishing Opportunities",
      difficulty: "Beginner"
    }
  ];

  const categories = [
    { name: 'All', icon: '🌟', color: 'from-purple-500 to-pink-500' },
    { name: 'Competition', icon: '🏆', color: 'from-amber-500 to-orange-500' },
    { name: 'Festival', icon: '🎉', color: 'from-pink-500 to-rose-500' },
    { name: 'Workshop', icon: '🎓', color: 'from-blue-500 to-cyan-500' },
    { name: 'Hackathon', icon: '💻', color: 'from-green-500 to-emerald-500' }
  ];
  const locations = ['All', 'USA', 'India', 'UK', 'Japan', 'France', 'Singapore', 'UAE', 'Germany', 'Canada', 'South Korea', 'Netherlands', 'Australia', 'Spain', 'Israel', 'Switzerland', 'Brazil', 'Sweden', 'Denmark', 'South Africa', 'Scotland'];

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All' || event.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-blue-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500) {
        setVisibleEvents(prev => prev + 8);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900" onClick={() => setShowProfileMenu(false)}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors"
          >
            Evify
          </button>
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate('/events')}
              className="text-white font-semibold border-b-2 border-purple-400 pb-1"
            >
              Events
            </button>
            <button 
              onClick={() => navigate('/')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </button>
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold shadow-lg group-hover:scale-110 transition-transform">
                    {getInitials(currentUser.name, currentUser.email)}
                  </div>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-2xl overflow-hidden z-50 border border-purple-500/30">
                    <div className="p-4 border-b border-gray-700 bg-gray-800/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                          {getInitials(currentUser.name, currentUser.email)}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-semibold">{currentUser.name || 'User'}</p>
                          <p className="text-gray-400 text-sm">{currentUser.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <button 
                        onClick={() => navigate('/bookmarks')}
                        className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-between"
                      >
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                          My Bookmarks
                        </span>
                        {bookmarkCount > 0 && (
                          <span className="px-2 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
                            {bookmarkCount}
                          </span>
                        )}
                      </button>
                      
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors flex items-center"
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
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Header */}
      <div className="pt-20 pb-8 px-4 bg-gray-900/50 backdrop-blur-sm border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">Discover Events</h1>
          <p className="text-gray-300 text-lg">Explore competitions, festivals, workshops and more</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4 uppercase tracking-wider">Popular Categories</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 group ${
                        selectedCategory === cat.name
                          ? `bg-gradient-to-r ${cat.color} text-white font-semibold shadow-lg scale-105`
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-purple-500/50 border border-gray-700'
                      }`}
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                      <span className="flex-1">{cat.name}</span>
                      {selectedCategory === cat.name && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h3 className="text-sm font-bold text-gray-300 mb-3 uppercase">Location</h3>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer hover:border-purple-500 transition-colors"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Main Events Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.slice(0, visibleEvents).map(event => (
                <div
                  key={event.id}
                  onClick={() => navigate(`/event/${event.id}`)}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-purple-500 group"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-900">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{event.title}</h3>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-300 text-sm">
                        <svg className="w-4 h-4 mr-2 flex-shrink-0 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <svg className="w-4 h-4 mr-2 flex-shrink-0 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{event.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-gray-700 text-gray-200 text-xs font-semibold rounded-full">
                          {event.category}
                        </span>
                        <span className={`px-3 py-1 ${getDifficultyColor(event.difficulty)} text-white text-xs font-semibold rounded-full`}>
                          {event.difficulty}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-purple-400">{event.prize.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {visibleEvents < filteredEvents.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleEvents(prev => prev + 8)}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
                >
                  Load More Events
                </button>
              </div>
            )}

            {filteredEvents.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-gray-800 rounded-lg p-12 border border-gray-700 max-w-md mx-auto">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-white text-xl font-semibold mb-2">No events found</p>
                  <p className="text-gray-400">Try adjusting your filters</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
