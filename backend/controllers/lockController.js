const lockModel = require('../models/lockModel');

// Create a new lock
exports.createLock = async (req, res) => {
  try {
    const { ownerId, lockName, unlockId, rotations } = req.body;
    const lockData = { ownerId, lockName, unlockId, rotations };
    const newLock = await lockModel.createLock(lockData);
    
    res.status(201).json({ message: 'Lock created successfully', lock: newLock });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get lock details by ID
exports.getLock = async (req, res) => {
  try {
    const lock = await lockModel.getLockById(req.params.id);
    if (!lock) {
      return res.status(404).json({ message: 'Lock not found' });
    }
    
    res.status(200).json(lock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update lock settings by ID
exports.updateLock = async (req, res) => {
  try {
    const lockId = req.params.id;
    const updatedLock = await lockModel.updateLock(lockId, req.body);
    
    res.status(200).json({ message: 'Lock updated successfully', lock: updatedLock });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a lock by ID
exports.deleteLock = async (req, res) => {
  try {
    await lockModel.deleteLock(req.params.id);
    res.status(200).json({ message: 'Lock deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all locks owned by a specific user
exports.getLocksByUser = async (req, res) => {
  try {
    const locks = await lockModel.getLocksByUserId(req.params.userId);
    res.status(200).json(locks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
