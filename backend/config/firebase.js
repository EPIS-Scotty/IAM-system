const admin = require('firebase-admin');
const serviceAccount = require('./key.json'); // Path to your JSON file

// Initialize Firebase Admin SDK with JSON key file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
