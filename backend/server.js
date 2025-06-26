const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
const allowedOrigins = [
  "https://engineering-resource-management-sys-sooty.vercel.app",
  "http://localhost:3000",
];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/engineers", require("./routes/engineers"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/assignments", require("./routes/assignments"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
