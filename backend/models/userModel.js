const db = require('../config/firebase');

// Create a new user
exports.createUser = async (userData) => {
  const userRef = await db.collection('Users').add(userData);
  return { id: userRef.id, ...userData };
};

// Find a user by email
exports.getUserByEmail = async (email) => {
  const snapshot = await db.collection('Users').where('email', '==', email).limit(1).get();
  if (snapshot.empty) {
    return null;
  }
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
};

// Get a user by ID
exports.getUserById = async (userId) => {
  const userDoc = await db.collection('Users').doc(userId).get();
  return userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;
};
