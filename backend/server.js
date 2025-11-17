const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
// Replace with your service account key
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// ==================== EVENTS ROUTES ====================

// Get all events
app.get('/api/events', async (req, res) => {
  try {
    const { category, status, featured, limit = 50 } = req.query;
    
    let query = db.collection('events');
    
    if (category) {
      query = query.where('categoryId', '==', category);
    }
    
    if (status) {
      query = query.where('status', '==', status);
    }
    
    if (featured === 'true') {
      query = query.where('featured', '==', true);
    }
    
    query = query.orderBy('createdAt', 'desc').limit(parseInt(limit));
    
    const snapshot = await query.get();
    const events = [];
    
    snapshot.forEach(doc => {
      events.push({ id: doc.id, ...doc.data() });
    });
    
    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
});

// Get single event
app.get('/api/events/:id', async (req, res) => {
  try {
    const eventDoc = await db.collection('events').doc(req.params.id).get();
    
    if (!eventDoc.exists) {
      return res.status(404).json({
        success: false,
        error: { message: 'Event not found' }
      });
    }
    
    // Increment view count
    await eventDoc.ref.update({
      viewCount: admin.firestore.FieldValue.increment(1)
    });
    
    res.json({
      success: true,
      data: { id: eventDoc.id, ...eventDoc.data() }
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
});

// Create event (Admin only)
app.post('/api/events', async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      viewCount: 0,
      bookmarkCount: 0,
      status: req.body.status || 'upcoming',
      featured: req.body.featured || false
    };
    
    const docRef = await db.collection('events').add(eventData);
    
    res.status(201).json({
      success: true,
      data: { id: docRef.id, ...eventData }
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
});

// Update event
app.put('/api/events/:id', async (req, res) => {
  try {
    const eventRef = db.collection('events').doc(req.params.id);
    const eventDoc = await eventRef.get();
    
    if (!eventDoc.exists) {
      return res.status(404).json({
        success: false,
        error: { message: 'Event not found' }
      });
    }
    
    await eventRef.update({
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.json({
      success: true,
      data: { id: req.params.id, ...req.body }
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
});

// Delete event
app.delete('/api/events/:id', async (req, res) => {
  try {
    await db.collection('events').doc(req.params.id).delete();
    
    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
});

// Search events
app.get('/api/events/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: { message: 'Search query required' }
      });
    }
    
    const snapshot = await db.collection('events').get();
    const searchTerm = q.toLowerCase();
    
    const results = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      if (
        data.title.toLowerCase().includes(searchTerm) ||
        data.description.toLowerCase().includes(searchTerm) ||
        (data.location && data.location.city && data.location.city.toLowerCase().includes(searchTerm))
      ) {
        results.push({ id: doc.id, ...data });
      }
    });
    
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Error searching events:', error);
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
});

// ==================== USERS ROUTES ====================

// Get user
app.get('/api/users/:id', async (req, res) => {
  try {
    const userDoc = await db.collection('users').doc(req.params.id).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        error: { message: 'User not found' }
      });
    }
    
    res.json({
      success: true,
      data: { id: userDoc.id, ...userDoc.data() }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.params.id);
    
    await userRef.update({
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.json({
      success: true,
      data: { id: req.params.id, ...req.body }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
});

// ==================== SAVED EVENTS ROUTES ====================

// Get user's saved events
app.get('/api/saved-events/:userId', async (req, res) => {
  try {
    const snapshot = await db.collection('saved_events')
      .where('userId', '==', req.params.userId)
      .orderBy('savedAt', 'desc')
      .get();
    
    const savedEvents = [];
    snapshot.forEach(doc => {
      savedEvents.push({ id: doc.id, ...doc.data() });
    });
    
    res.json({
      success: true,
      data: savedEvents
    });
  } catch (error) {
    console.error('Error fetching saved events:', error);
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
});

// Save event
app.post('/api/saved-events', async (req, res) => {
  try {
    const { userId, eventId, notes } = req.body;
    
    // Check if already saved
    const existing = await db.collection('saved_events')
      .where('userId', '==', userId)
      .where('eventId', '==', eventId)
      .get();
    
    if (!existing.empty) {
      return res.status(400).json({
        success: false,
        error: { message: 'Event already saved' }
      });
    }
    
    const savedData = {
      userId,
      eventId,
      notes: notes || '',
      savedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    const docRef = await db.collection('saved_events').add(savedData);
    
    // Increment bookmark count
    await db.collection('events').doc(eventId).update({
      bookmarkCount: admin.firestore.FieldValue.increment(1)
    });
    
    res.status(201).json({
      success: true,
      data: { id: docRef.id, ...savedData }
    });
  } catch (error) {
    console.error('Error saving event:', error);
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
});

// Unsave event
app.delete('/api/saved-events/:userId/:eventId', async (req, res) => {
  try {
    const { userId, eventId } = req.params;
    
    const snapshot = await db.collection('saved_events')
      .where('userId', '==', userId)
      .where('eventId', '==', eventId)
      .get();
    
    if (snapshot.empty) {
      return res.status(404).json({
        success: false,
        error: { message: 'Saved event not found' }
      });
    }
    
    const docId = snapshot.docs[0].id;
    await db.collection('saved_events').doc(docId).delete();
    
    // Decrement bookmark count
    await db.collection('events').doc(eventId).update({
      bookmarkCount: admin.firestore.FieldValue.increment(-1)
    });
    
    res.json({
      success: true,
      message: 'Event unsaved successfully'
    });
  } catch (error) {
    console.error('Error unsaving event:', error);
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
});

// ==================== CATEGORIES ROUTES ====================

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const snapshot = await db.collection('categories')
      .orderBy('order', 'asc')
      .get();
    
    const categories = [];
    snapshot.forEach(doc => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
});

// Get category by ID
app.get('/api/categories/:id', async (req, res) => {
  try {
    const categoryDoc = await db.collection('categories').doc(req.params.id).get();
    
    if (!categoryDoc.exists) {
      return res.status(404).json({
        success: false,
        error: { message: 'Category not found' }
      });
    }
    
    res.json({
      success: true,
      data: { id: categoryDoc.id, ...categoryDoc.data() }
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 API documentation: http://localhost:${PORT}/api`);
});
