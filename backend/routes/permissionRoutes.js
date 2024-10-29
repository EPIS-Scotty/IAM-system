const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');

// Grant permission to a user to unlock a lock
router.post('/grant', permissionController.grantPermission);

// Revoke permission from a user
router.post('/revoke', permissionController.revokePermission);

// Attempt to unlock a lock (checks permissions)
router.post('/unlock', permissionController.unlockAttempt);

// List all users with access to a specific lock
router.get('/:lockId/users', permissionController.getUsersWithAccess);

module.exports = router;
