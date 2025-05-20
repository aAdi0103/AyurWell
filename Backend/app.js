import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path, { dirname } from "path";

import express from "express";
import { connectDB } from "./Lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/authRoutes.js";
import quizeRoutes from "./Routes/quizeRoute.js";
import update from './Routes/updateRoute.js'
import sleep from './Routes/sleepRouter.js'
import water from './Routes/waterRouter.js'
import dosha from './Routes/doshaRouter.js'
import groupRoutes from './Routes/groupRoutes.js'
import chatRoutes from './Routes/chatRoutes.js'

import cors from 'cors';
import http from 'http'; // Required for socket.io
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const app = express();
const server = http.createServer(app); // Create HTTP server

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/update", update);
app.use("/api/v1/quize", quizeRoutes);
app.use("/api/v1/sleep-data", sleep);
app.use("/api/v1/water", water);
app.use("/api/v1/dosha-profile", dosha);
app.use("/api/v1/group", groupRoutes); // Ensure this route is defined

const onlineUsers = new Map(); // socket.id -> username
// Socket.IO logic
io.on("connection", (socket) => {
  
  console.log("New client connected:", socket.id);

  // Listen for user info from frontend
  socket.on("registerUser", (username) => {
    onlineUsers.set(socket.id, username);
    console.log("User registered:", username);
    io.emit("updateOnlineUsers", Array.from(onlineUsers.values()));
  });

  

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    onlineUsers.delete(socket.id);

    // Emit updated list
    io.emit("updateOnlineUsers", Array.from(onlineUsers.values()));
  });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
