const admin = require('firebase-admin');
const sampleData = require('../sample-data.json');

// Initialize Firebase Admin
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');
  
  try {
    // Seed Categories
    console.log('\n📁 Seeding categories...');
    for (const category of sampleData.categories) {
      const { id, ...data } = category;
      await db.collection('categories').doc(id).set({
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`✅ Created category: ${data.name}`);
    }
    
    // Seed Events
    console.log('\n🎉 Seeding events...');
    for (const event of sampleData.events) {
      const { id, ...data } = event;
      
      // Convert date strings to Firestore Timestamps
      if (data.dates) {
        data.dates = {
          registrationDeadline: admin.firestore.Timestamp.fromDate(new Date(data.dates.registrationDeadline)),
          startDate: admin.firestore.Timestamp.fromDate(new Date(data.dates.startDate)),
          endDate: admin.firestore.Timestamp.fromDate(new Date(data.dates.endDate))
        };
      }
      
      await db.collection('events').doc(id).set({
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`✅ Created event: ${data.title}`);
    }
    
    // Seed Users
    console.log('\n👤 Seeding users...');
    for (const user of sampleData.users) {
      const { id, ...data } = user;
      await db.collection('users').doc(id).set({
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        lastLoginAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`✅ Created user: ${data.name}`);
    }
    
    // Seed Saved Events
    console.log('\n🔖 Seeding saved events...');
    for (const savedEvent of sampleData.saved_events) {
      const { id, ...data } = savedEvent;
      
      // Convert savedAt to Timestamp
      if (data.reminder && data.reminder.notifyAt) {
        data.reminder.notifyAt = admin.firestore.Timestamp.fromDate(new Date(data.reminder.notifyAt));
      }
      
      await db.collection('saved_events').doc(id).set({
        ...data,
        savedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`✅ Created saved event for user: ${data.userId}`);
    }
    
    console.log('\n✨ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - ${sampleData.categories.length} categories`);
    console.log(`   - ${sampleData.events.length} events`);
    console.log(`   - ${sampleData.users.length} users`);
    console.log(`   - ${sampleData.saved_events.length} saved events`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
