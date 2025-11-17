import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDebugPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setUsers(storedUsers);
    setCurrentUser(storedCurrentUser);
  };

  const clearAllData = () => {
    if (window.confirm('Clear all users and data?')) {
      localStorage.removeItem('users');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('bookmarkedEvents');
      loadData();
    }
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter(u => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    loadData();
  };

  const loginAsUser = (user) => {
    localStorage.setItem('currentUser', JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
    }));
    navigate('/');
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-white/90 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </button>
          <button 
            onClick={() => navigate('/')}
            className="text-xl font-bold text-white hover:scale-105 transition-transform duration-200"
          >
            Debug Panel
          </button>
          <div className="w-20"></div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold text-white mb-8">User Debug Panel</h1>

        {/* Current User */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Current Logged In User</h2>
          {currentUser ? (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-800"><strong>ID:</strong> {currentUser.id}</p>
              <p className="text-gray-800"><strong>Email:</strong> {currentUser.email}</p>
              <p className="text-gray-800"><strong>Name:</strong> {currentUser.name}</p>
            </div>
          ) : (
            <p className="text-gray-600">No user logged in</p>
          )}
        </div>

        {/* All Users */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">All Registered Users ({users.length})</h2>
            <button
              onClick={clearAllData}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
            >
              Clear All Data
            </button>
          </div>

          {users.length === 0 ? (
            <p className="text-gray-600">No users registered</p>
          ) : (
            <div className="space-y-4">
              {users.map((user, index) => (
                <div key={user.id} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="text-gray-800 font-semibold">User #{index + 1}</p>
                      <p className="text-sm text-gray-600"><strong>ID:</strong> {user.id}</p>
                      <p className="text-sm text-gray-600"><strong>Email:</strong> {user.email}</p>
                      <p className="text-sm text-gray-600"><strong>Password:</strong> {user.password}</p>
                      <p className="text-sm text-gray-600"><strong>Name:</strong> {user.name}</p>
                      <p className="text-sm text-gray-600"><strong>Bookmarks:</strong> {user.bookmarks?.length || 0}</p>
                      <p className="text-sm text-gray-600"><strong>Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => loginAsUser(user)}
                        className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary-dark"
                      >
                        Login As
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Use</h2>
          <ul className="text-gray-700 space-y-2">
            <li>• View all registered users and their credentials</li>
            <li>• Click "Login As" to instantly login as any user</li>
            <li>• Use "Delete" to remove a specific user</li>
            <li>• "Clear All Data" removes everything (users, sessions, bookmarks)</li>
            <li>• Passwords are shown for debugging (never do this in production!)</li>
          </ul>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Note:</strong> This is a debug page. In a real app with a backend/database, 
              you would never expose user data like this. This is only for testing localStorage-based authentication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDebugPage;
