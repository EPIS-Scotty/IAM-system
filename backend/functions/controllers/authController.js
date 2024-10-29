const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt"); // To hash passwords
const jwt = require("jsonwebtoken"); // To generate tokens for authentication
require("dotenv").config();

// Register a new user
exports.register = async (req, res) => {
  try {
    const {email, password, name} = req.body;
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({message: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {email, passwordHash: hashedPassword, name, ownedLocks: [], sharedLocks: []};
    const newUser = await userModel.createUser(userData);

    res.status(201).json({message: "User registered successfully", user: newUser});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Login an existing user
exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await userModel.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(400).json({message: "Invalid credentials"});
    }

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});
    res.status(200).json({message: "Login successful", token});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
