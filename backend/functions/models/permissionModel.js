const db = require("../config/firebase");

// Grant permission to a user to unlock a lock
exports.grantPermission = async (lockId, userId, level) => {
  const permissionRef = db.collection("Locks").doc(lockId).collection("Permissions").doc(userId);
  await permissionRef.set({ userId, level });
};

// Revoke permission from a user
exports.revokePermission = async (lockId, userId) => {
  const permissionRef = db.collection("Locks").doc(lockId).collection("Permissions").doc(userId);
  await permissionRef.delete();
};

// Check if a user has permission to unlock a lock
exports.checkPermission = async (lockId, userId) => {
  const permissionDoc = await db.collection("Locks").doc(lockId).collection("Permissions").doc(userId).get();
  return permissionDoc.exists ? permissionDoc.data() : null;
};

// Get all users with access to a specific lock
exports.getUsersWithAccess = async (lockId) => {
  const snapshot = await db.collection("Locks").doc(lockId).collection("Permissions").get();
  return snapshot.docs.map(doc => ({ userId: doc.id, ...doc.data() }));
};
