import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EventDetailsPage = ({ event }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if event is already bookmarked by current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.id === currentUser.id);
      if (user && user.bookmarks) {
        const isAlreadyBookmarked = user.bookmarks.some(e => e.id === eventData.id);
        setIsBookmarked(isAlreadyBookmarked);
      }
    }
  }, []);

  // Sample event data - in real app, this would come from props or API
  const eventData = event || {
    id: 1,
    title: 'International Science Olympiad 2024',
    category: 'Olympiad',
    banner: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=400&fit=crop',
    description: `Join the most prestigious science competition for high school students worldwide. The International Science Olympiad brings together brilliant young minds from over 80 countries to compete in challenging scientific problems across physics, chemistry, biology, and astronomy.

This year's olympiad features:
• Individual and team challenges
• Laboratory practical examinations
• Theory-based problem solving
• Networking with top scientists and researchers
• Scholarship opportunities worth over $500,000

Participants will engage in rigorous scientific exploration, collaborate with peers from around the globe, and gain invaluable experience that will shape their academic careers. Past participants have gone on to study at top universities including MIT, Stanford, Oxford, and Cambridge.`,
    location: 'Singapore Science Centre',
    city: 'Singapore',
    country: 'Singapore',
    coordinates: { lat: 1.3334, lng: 103.7371 },
    deadline: 'December 15, 2024',
    registrationDeadline: '2024-12-15',
    startDate: 'January 20, 2025',
    endDate: 'January 25, 2025',
    registrationLink: 'https://example.com/register',
    organizer: 'International Science Foundation',
    eligibility: 'Students aged 15-18',
    fee: 'Free',
    prizes: '$100,000 in total prizes',
    contact: 'info@scienceolympiad.org',
    website: 'https://scienceolympiad.org',
    tags: ['Science', 'Competition', 'International', 'STEM'],
    color: 'bg-blue-500',
  };

  const handleBookmark = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Redirect to login if not authenticated
    if (!currentUser) {
      navigate('/login', { state: { from: { pathname: `/event/${eventData.id}` } } });
      return;
    }

    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    
    // Get all users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
      if (!users[userIndex].bookmarks) {
        users[userIndex].bookmarks = [];
      }

      if (newBookmarkState) {
        // Add to user's bookmarks
        if (!users[userIndex].bookmarks.find(e => e.id === eventData.id)) {
          users[userIndex].bookmarks.push({
            id: eventData.id,
            title: eventData.title,
            category: eventData.category,
            location: eventData.location,
            deadline: eventData.deadline,
            color: eventData.color,
          });
        }
      } else {
        // Remove from user's bookmarks
        users[userIndex].bookmarks = users[userIndex].bookmarks.filter(e => e.id !== eventData.id);
      }
      
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const handleRegister = () => {
    window.open(eventData.registrationLink, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: eventData.title,
        text: `Check out this event: ${eventData.title}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 pb-16">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button 
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Evify
          </button>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleShare}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button 
              onClick={handleBookmark}
              className={`transition-colors ${isBookmarked ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <svg className="w-6 h-6" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Event Banner */}
      <div className="relative h-96 mt-16 overflow-hidden">
        <img 
          src={eventData.banner} 
          alt={eventData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Category Tag on Banner */}
        <div className="absolute top-6 left-6">
          <span className={`${eventData.color} text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg`}>
            {eventData.category}
          </span>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {eventData.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{eventData.city}, {eventData.country}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{eventData.startDate} - {eventData.endDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        {/* Registration CTA Card */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 shadow-2xl border border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center text-pink-500 font-semibold mb-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Registration Deadline: {eventData.deadline}
              </div>
              <p className="text-gray-400 text-sm">Don't miss this opportunity!</p>
            </div>
            <button 
              onClick={handleRegister}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-1 w-full md:w-auto"
            >
              Register Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Section */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">About This Event</h2>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {eventData.description}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {eventData.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Location Map Section */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Location</h2>
              <div className="mb-4">
                <p className="text-gray-200 font-semibold">{eventData.location}</p>
                <p className="text-gray-400">{eventData.city}, {eventData.country}</p>
              </div>
              
              {/* Map Placeholder */}
              <div className="w-full h-64 bg-gray-700 rounded-xl overflow-hidden relative border border-gray-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-500">Map View</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Lat: {eventData.coordinates.lat}, Lng: {eventData.coordinates.lng}
                    </p>
                  </div>
                </div>
              </div>
              
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${eventData.coordinates.lat},${eventData.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-primary hover:text-primary-dark font-semibold transition-colors"
              >
                View on Google Maps
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Event Details Card */}
            <div className="bg-gray-800 rounded-2xl p-6 sticky top-24 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Event Details</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Organizer</p>
                  <p className="text-white font-semibold">{eventData.organizer}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Eligibility</p>
                  <p className="text-white font-semibold">{eventData.eligibility}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Registration Fee</p>
                  <p className="text-white font-semibold">{eventData.fee}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Prizes</p>
                  <p className="text-white font-semibold">{eventData.prizes}</p>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-sm mb-2">Contact</p>
                  <a 
                    href={`mailto:${eventData.contact}`}
                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors break-all"
                  >
                    {eventData.contact}
                  </a>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-2">Website</p>
                  <a 
                    href={eventData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark font-semibold transition-colors break-all inline-flex items-center"
                  >
                    Visit Website
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button 
                  onClick={handleRegister}
                  className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-lg"
                >
                  Register Now
                </button>
                <button 
                  onClick={handleBookmark}
                  className={`w-full px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
                    isBookmarked 
                      ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-400' 
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-primary'
                  }`}
                >
                  {isBookmarked ? '✓ Bookmarked' : 'Bookmark Event'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
