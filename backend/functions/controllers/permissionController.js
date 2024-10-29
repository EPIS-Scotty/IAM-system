const permissionModel = require("../../models/permissionModel");

// Grant permission to a user to unlock a lock
exports.grantPermission = async (req, res) => {
  try {
    const {lockId, userId, level} = req.body;
    await permissionModel.grantPermission(lockId, userId, level);
    res.status(200).json({message: "Permission granted successfully"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Revoke permission from a user
exports.revokePermission = async (req, res) => {
  try {
    const {lockId, userId} = req.body;
    await permissionModel.revokePermission(lockId, userId);
    res.status(200).json({message: "Permission revoked successfully"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Attempt to unlock a lock (checks if the user has permission)
exports.unlockAttempt = async (req, res) => {
  try {
    const {lockId, userId} = req.body;
    const permission = await permissionModel.checkPermission(lockId, userId);

    if (!permission) {
      return res.status(403).json({message: "Permission denied"});
    }

    // Assuming unlock logic or command to the lock is here
    res.status(200).json({message: "Unlock successful"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// List all users with access to a specific lock
exports.getUsersWithAccess = async (req, res) => {
  try {
    const users = await permissionModel.getUsersWithAccess(req.params.lockId);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
