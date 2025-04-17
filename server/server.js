require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from the React app
  credentials: true, // Allow cookies to be sent
}));
app.use(cookieParser()); // Ensure cookie-parser is properly initialized
mongoose.connect("mongodb://127.0.0.1:27017/auth_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);



const PurchaseHistorySchema = new mongoose.Schema({
  historyNumber: { type: Number, required: true },
  items: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now },
});

const PurchaseHistory = mongoose.model("PurchaseHistory", PurchaseHistorySchema);

let historyCounter = 1; // Initialize the purchase history counter

app.post("/api/purchase-history", async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const purchaseHistory = new PurchaseHistory({
      historyNumber: historyCounter++,
      items,
    });

    await purchaseHistory.save();
    res.json({ message: "Purchase history saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/api/purchase-history", async (req, res) => {
  try {
    const purchaseHistory = await PurchaseHistory.find();
    res.json(purchaseHistory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



app.post("/auth/signup", async (req, res) => {
  const { username, email, password } = req.body;
  // Validate username, email, and password
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// User Login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    res.json({
      message: "Login successful",
      user: {
        username: user.username, // Correctly return 'username'
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// User Logout
app.post("/auth/logout", (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
});

// Authentication Check
app.get("/auth/check", async (req, res) => {
  if (!req.cookies) {
    console.error("Cookies are undefined. Ensure cookie-parser middleware is initialized.");
    return res.status(200).json({ message: "Server error: Cookies are undefined" });
  }

  const token = req.cookies.jwt;

  if (!token) {
    return res.status(200).json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id, "username email"); // Use async/await
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "Authenticated", user });
  } catch (error) {
    console.error("Error during authentication check:", error.message); // Log detailed error
    return res.status(200).json({ authenticated: false });
  }
});

// Update User Profile
app.post("/auth/update", async (req, res) => {
  const { username, email, password } = req.body; // Include password
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;

    if (password) {
      user.password = await bcrypt.hash(password, 10); // Hash the new password
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
