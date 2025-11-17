import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ==================== EVENTS ====================

export const getAllEvents = async () => {
  try {
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEventById = async (eventId) => {
  try {
    const eventRef = doc(db, 'events', eventId);
    const eventSnap = await getDoc(eventRef);
    
    if (eventSnap.exists()) {
      return { id: eventSnap.id, ...eventSnap.data() };
    } else {
      throw new Error('Event not found');
    }
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

export const getEventsByCategory = async (categoryId) => {
  try {
    const eventsRef = collection(db, 'events');
    const q = query(
      eventsRef, 
      where('categoryId', '==', categoryId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching events by category:', error);
    throw error;
  }
};

export const searchEvents = async (searchTerm) => {
  try {
    const eventsRef = collection(db, 'events');
    const querySnapshot = await getDocs(eventsRef);
    
    // Client-side filtering (Firestore doesn't support full-text search natively)
    const events = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return events.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching events:', error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const eventsRef = collection(db, 'events');
    const docRef = await addDoc(eventsRef, {
      ...eventData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    
    return { id: docRef.id, ...eventData };
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const eventRef = doc(db, 'events', eventId);
    await updateDoc(eventRef, {
      ...eventData,
      updatedAt: Timestamp.now()
    });
    
    return { id: eventId, ...eventData };
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const eventRef = doc(db, 'events', eventId);
    await deleteDoc(eventRef);
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// ==================== USERS ====================

export const getUserById = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const createUser = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...userData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    
    return { id: userId, ...userData };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: Timestamp.now()
    });
    
    return { id: userId, ...userData };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// ==================== SAVED EVENTS ====================

export const getSavedEventsByUser = async (userId) => {
  try {
    const savedEventsRef = collection(db, 'saved_events');
    const q = query(
      savedEventsRef, 
      where('userId', '==', userId),
      orderBy('savedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching saved events:', error);
    throw error;
  }
};

export const saveEvent = async (userId, eventId) => {
  try {
    const savedEventsRef = collection(db, 'saved_events');
    
    // Check if already saved
    const q = query(
      savedEventsRef,
      where('userId', '==', userId),
      where('eventId', '==', eventId)
    );
    const existing = await getDocs(q);
    
    if (!existing.empty) {
      throw new Error('Event already saved');
    }
    
    const docRef = await addDoc(savedEventsRef, {
      userId,
      eventId,
      savedAt: Timestamp.now()
    });
    
    return { id: docRef.id, userId, eventId };
  } catch (error) {
    console.error('Error saving event:', error);
    throw error;
  }
};

export const unsaveEvent = async (userId, eventId) => {
  try {
    const savedEventsRef = collection(db, 'saved_events');
    const q = query(
      savedEventsRef,
      where('userId', '==', userId),
      where('eventId', '==', eventId)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const docToDelete = querySnapshot.docs[0];
      await deleteDoc(doc(db, 'saved_events', docToDelete.id));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error unsaving event:', error);
    throw error;
  }
};

export const isEventSaved = async (userId, eventId) => {
  try {
    const savedEventsRef = collection(db, 'saved_events');
    const q = query(
      savedEventsRef,
      where('userId', '==', userId),
      where('eventId', '==', eventId)
    );
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking saved event:', error);
    throw error;
  }
};

// ==================== CATEGORIES ====================

export const getAllCategories = async () => {
  try {
    const categoriesRef = collection(db, 'categories');
    const q = query(categoriesRef, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const categoryRef = doc(db, 'categories', categoryId);
    const categorySnap = await getDoc(categoryRef);
    
    if (categorySnap.exists()) {
      return { id: categorySnap.id, ...categorySnap.data() };
    } else {
      throw new Error('Category not found');
    }
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const categoriesRef = collection(db, 'categories');
    const docRef = await addDoc(categoriesRef, {
      ...categoryData,
      createdAt: Timestamp.now()
    });
    
    return { id: docRef.id, ...categoryData };
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};
