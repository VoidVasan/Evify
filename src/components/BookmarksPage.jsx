import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BookmarksPage = () => {
  const navigate = useNavigate();
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming'); // upcoming, past, calendar
  const [reminders, setReminders] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Get current user's bookmarks from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (currentUser) {
      const user = users.find(u => u.id === currentUser.id);
      if (user && user.bookmarks) {
        setBookmarkedEvents(user.bookmarks);
        // Set reminders for events within 7 days
        const upcoming = user.bookmarks.filter(event => {
          const eventDate = new Date(event.date);
          const daysUntil = Math.ceil((eventDate - new Date()) / (1000 * 60 * 60 * 24));
          return daysUntil > 0 && daysUntil <= 7;
        });
        setReminders(upcoming);
      }
    }
  }, []);

  const removeBookmark = (eventId) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Update user's bookmarks
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex].bookmarks = users[userIndex].bookmarks.filter(e => e.id !== eventId);
      localStorage.setItem('users', JSON.stringify(users));
      setBookmarkedEvents(users[userIndex].bookmarks);
    }
  };

  const upcomingEvents = bookmarkedEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= new Date();
  });

  const pastEvents = bookmarkedEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate < new Date();
  });

  const getDaysUntil = (dateStr) => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 bg-gray-50"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${monthNames[month].substring(0, 3)} ${day}, ${year}`;
      const hasEvent = bookmarkedEvents.some(event => event.date.includes(dateStr));
      
      days.push(
        <div key={day} className={`h-20 border border-gray-200 p-2 ${hasEvent ? 'bg-blue-50' : 'bg-white'}`}>
          <div className="font-semibold text-gray-900">{day}</div>
          {hasEvent && (
            <div className="mt-1">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-xl font-bold text-gray-900">{monthNames[month]} {year}</h3>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="h-10 flex items-center justify-center font-semibold text-gray-700 text-sm">
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button 
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors"
          >
            Evify
          </button>
          <button 
            onClick={() => navigate('/events')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Events
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pt-24">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Bookmarks
          </h1>
          <p className="text-white/80 text-lg">
            {bookmarkedEvents.length} {bookmarkedEvents.length === 1 ? 'event' : 'events'} saved
          </p>
        </div>

        {bookmarkedEvents.length === 0 ? (
          <div className="bg-gray-800 rounded-2xl p-12 text-center border border-gray-700">
            <svg className="w-24 h-24 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <h3 className="text-2xl font-bold text-white mb-2">No Bookmarks Yet</h3>
            <p className="text-gray-400 mb-6">Start bookmarking events you're interested in!</p>
            <button 
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
            >
              Browse Events
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gray-800 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 group border border-gray-700 hover:border-purple-500"
              >
                {/* Category Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`${event.color} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                    {event.category}
                  </span>
                  <button
                    onClick={() => removeBookmark(event.id)}
                    className="text-purple-400 hover:text-pink-500 transition-colors"
                    title="Remove bookmark"
                  >
                    <svg className="w-6 h-6" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>

                {/* Event Title */}
                <h3 className="text-white font-bold text-xl mb-4 line-clamp-2 group-hover:text-purple-400 transition-colors">
                  {event.title}
                </h3>

                {/* Event Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">Deadline: {event.deadline}</span>
                  </div>
                </div>

                {/* View Details Button */}
                <button 
                  onClick={() => navigate(`/event/${event.id}`)}
                  className="w-full py-2 text-purple-400 font-semibold border-2 border-purple-500 rounded-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
