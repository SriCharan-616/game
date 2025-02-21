import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // MongoDB connection
import userRoutes from "./routes/userRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Parse JSON
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/content", contentRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
