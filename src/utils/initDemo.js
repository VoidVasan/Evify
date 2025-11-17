// Initialize demo user on first load
const initializeDemoUser = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Check if demo user already exists
  const demoExists = users.find(u => u.email === 'demo@evify.com');
  
  if (!demoExists) {
    const demoUser = {
      id: 'demo-user-001',
      email: 'demo@evify.com',
      password: 'demo123',
      name: 'Demo User',
      bookmarks: [],
      createdAt: new Date().toISOString(),
    };
    
    users.push(demoUser);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Demo user initialized');
  }
};

// Run on app load
if (typeof window !== 'undefined') {
  initializeDemoUser();
}

export { initializeDemoUser };
