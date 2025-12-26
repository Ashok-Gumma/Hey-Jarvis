import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

/* =====================
   MIDDLEWARE
===================== */

app.use(
  cors({
    origin: "http://localhost:5173", // frontend dev URL
    credentials: true,
  })
);

app.use(express.json());

/* =====================
   DATABASE
===================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:");
    console.error(err.message);
    process.exit(1);
  });

/* =====================
   ROUTES
===================== */

app.use("/api/auth", authRoutes);

/* Health check */
app.get("/api/health", (req, res) => {
  res.json({ status: "API running" });
});

/* =====================
   SERVE FRONTEND (PRODUCTION)
===================== */

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("API running (development)");
  });
}

/* =====================
   SERVER
===================== */

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
