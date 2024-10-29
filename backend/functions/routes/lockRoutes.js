const express = require("express");
const router = express.Router();
const lockController = require("../controllers/lockController");

// Create a new lock
router.post("/create", lockController.createLock);

// Get lock details by ID
router.get("/:id", lockController.getLock);

// Update lock settings by ID
router.put("/:id", lockController.updateLock);

// Delete a lock by ID
router.delete("/:id", lockController.deleteLock);

// List all locks owned by a specific user
router.get("/user/:userId", lockController.getLocksByUser);

module.exports = router;
