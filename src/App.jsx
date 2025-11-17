import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import EventDetailsPage from './components/EventDetailsPage';
import EventsPage from './components/EventsPage';
import BookmarksPage from './components/BookmarksPage';
import LoginPage from './components/LoginPage';
import AdminDebugPage from './components/AdminDebugPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/event/:id" element={<EventDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/debug" element={<AdminDebugPage />} />
        <Route 
          path="/bookmarks" 
          element={
            <ProtectedRoute>
              <BookmarksPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
