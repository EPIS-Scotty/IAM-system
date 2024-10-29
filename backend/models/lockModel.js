const db = require('../config/firebase');

// Create a new lock
exports.createLock = async (lockData) => {
  const lockRef = await db.collection('Locks').add(lockData);
  return { id: lockRef.id, ...lockData };
};

// Get lock details by ID
exports.getLockById = async (lockId) => {
  const lockDoc = await db.collection('Locks').doc(lockId).get();
  return lockDoc.exists ? { id: lockDoc.id, ...lockDoc.data() } : null;
};

// Update lock settings by ID
exports.updateLock = async (lockId, newData) => {
  await db.collection('Locks').doc(lockId).update(newData);
  return { id: lockId, ...newData };
};

// Delete a lock by ID
exports.deleteLock = async (lockId) => {
  await db.collection('Locks').doc(lockId).delete();
};

// Get all locks owned by a specific user
exports.getLocksByUserId = async (userId) => {
  const snapshot = await db.collection('Locks').where('ownerId', '==', userId).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
