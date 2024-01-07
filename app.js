
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
const app = express(); 
const port = 3000; // 

// Connect to MongoDB using Mongoose
app.use(express.json());
mongoose.connect(
  "mongodb+srv://ticketakaspire2023:2pFOss5fTLWOIxYd@cluster0.svrnfyj.mongodb.net/?retryWrites=true&w=majority"
);
app.use(cors());
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  title: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Todo = mongoose.model("Todo", todoSchema);

// Create a new user
app.post("/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials userName" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials password" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a new to-do item
app.post("/users/:userId/todo", async (req, res) => {
  try {
    const { title } = req.body;
    const { userId } = req.params;
    const todo = new Todo({ title, userId });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all to-do items for the user
app.get("/users/:userId/todo", async (req, res) => {
  try {
    const { userId } = req.params;
    const todo = await Todo.find({ userId });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
