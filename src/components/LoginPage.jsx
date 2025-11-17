import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        // Set current user
        localStorage.setItem('currentUser', JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.name,
        }));
        navigate(from, { replace: true });
      } else {
        // Check if email exists
        const emailExists = users.find(u => u.email === formData.email);
        if (emailExists) {
          setError('Incorrect password');
        } else {
          setError('No account found with this email. Please sign up first.');
        }
      }
    } else {
      // Sign up logic
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Validate inputs
      if (!formData.name.trim()) {
        setError('Please enter your name');
        return;
      }
      
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }
      
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      
      // Check if user already exists
      if (users.find(u => u.email === formData.email)) {
        setError('Email already registered. Please login instead.');
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email: formData.email,
        password: formData.password,
        name: formData.name,
        bookmarks: [],
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Auto login
      localStorage.setItem('currentUser', JSON.stringify({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      }));
      
      navigate(from, { replace: true });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
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
            className="text-2xl font-bold text-white hover:scale-105 transition-transform duration-200"
          >
            Evify
          </button>
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Login/Signup Form */}
      <div className="bg-gray-800 rounded-2xl p-8 md:p-12 max-w-md w-full shadow-2xl border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-400">
            {isLogin ? 'Login to access your bookmarks' : 'Sign up to start discovering events'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
              placeholder="Enter your password"
            />
            {!isLogin && (
              <p className="text-gray-400 text-sm mt-1">Minimum 6 characters</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-1"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({ email: '', password: '', name: '' });
            }}
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
        </div>

        {/* Quick Tip */}
        {isLogin && (
          <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <p className="text-xs text-purple-300">
              💡 <strong>First time here?</strong> Click "Sign up" above to create your account first!
            </p>
          </div>
        )}

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-gray-700/50 border border-gray-600 rounded-lg">
          <p className="text-sm text-gray-200 font-semibold mb-2">Demo Account:</p>
          <p className="text-xs text-gray-400">Email: demo@evify.com</p>
          <p className="text-xs text-gray-400">Password: demo123</p>
          <button
            type="button"
            onClick={() => {
              setFormData({
                email: 'demo@evify.com',
                password: 'demo123',
                name: '',
              });
              setIsLogin(true);
            }}
            className="mt-2 text-xs text-purple-400 hover:text-purple-300 font-semibold"
          >
            Use Demo Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
