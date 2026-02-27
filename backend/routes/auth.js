const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname: {
        firstname,
        lastname
      },
      email,
      password: hashed
    });

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
