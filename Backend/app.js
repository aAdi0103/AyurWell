import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path, { dirname } from "path";
import cors from 'cors';
import express from "express";
import { connectDB } from "./Lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/authRoutes.js";
import quizeRoutes from "./Routes/quizeRoute.js";
import update from './Routes/updateRoute.js';
import sleep from './Routes/sleepRouter.js';
import water from './Routes/waterRouter.js';
import dosha from './Routes/doshaRouter.js';
import groupRoutes from './Routes/groupRoutes.js';
import chatRoutes from './Routes/chatRoutes.js';
import yoga from './Routes/yogaRouter.js';
import http from 'http';
import { Server } from 'socket.io';
import Chat from "./Models/chatModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with improved configuration
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV_URL === "production" 
      ? process.env.FRONTEND_URL 
      : "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000
});

// Middleware
if(process.env.NODE_ENV_URL !== "production") {
  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));
}

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/update", update);
app.use("/api/v1/quize", quizeRoutes);
app.use("/api/v1/water", water);
app.use("/api/v1/group", groupRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/sleep-data", sleep);
app.use("/api/v1/dosha-profile", dosha);
app.use("/api/v1/yoga-profile", yoga);

// Production setup
if (process.env.NODE_ENV_URL === "production") {
  const frontendPath = path.join(__dirname, "../Frontend/dist");
  app.use(express.static(frontendPath));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}

// Socket.IO logic with improved error handling
io.on("connection", (socket) => {
  // Track active rooms for each socket
  const activeRooms = new Set();

  socket.on("joinRoom", ({ roomId }) => {
    try {
      if (activeRooms.has(roomId)) {
        return;
      }
      
      socket.join(roomId);
      activeRooms.add(roomId);
    } catch (error) {
      console.error("Error joining room:", error);
    }
  });

  socket.on("sendMessage", async ({ roomId, message }) => {
    try {
      const { content, senderId } = message;
      
      // Save message to database
      const savedMessage = await Chat.create({
        group: roomId,
        sender: senderId,
        content,
        timestamp: new Date()
      });

      // Populate sender info
      const populatedMessage = await Chat.findById(savedMessage._id)
        .populate('sender', 'name')
        .lean();

      // Broadcast to room
      io.to(roomId).emit("receiveMessage", {
        groupId: roomId,
        message: populatedMessage
      });
    } catch (error) {
      console.error("Error handling message:", error);
      socket.emit("error", { message: "Failed to send message" });
    }
  });

  socket.on("disconnect", () => {
    activeRooms.clear();
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});