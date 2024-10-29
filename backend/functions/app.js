const express = require("express");
const authRoutes = require("./routes/authRoutes");
const lockRoutes = require("./routes/lockRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
require("dotenv").config();

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Register routes
app.use("/auth", authRoutes);
app.use("/locks", lockRoutes);
app.use("/permissions", permissionRoutes);

exports.api = functions.https.onRequest(app);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;