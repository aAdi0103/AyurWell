import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path, { dirname } from "path";
import cors from 'cors'

// Load .env from the project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "./.env") });

import express from "express";
import { connectDB } from "./Lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/authRoutes.js";
import quizeRoutes from "./Routes/quizeRoute.js";
import update from './Routes/updateRoute.js'
import sleep from './Routes/sleepRouter.js'
import water from './Routes/waterRouter.js'
import dosha from './Routes/doshaRouter.js'
import yoga from './Routes/yogaRouter.js'
const app = express();



if(process.env.NODE_ENV_URL !== "production"){
  app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,            
}));

}

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));



app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/update", update);
app.use("/api/v1/quize", quizeRoutes);
app.use("/api/v1/sleep-data",sleep)
app.use("/api/v1/water",water)
app.use("/api/v1/dosha-profile",dosha)
app.use("/api/v1/yoga-profile",yoga)


if (process.env.NODE_ENV_URL === "production") {
  const frontendPath = path.join(__dirname, "../Frontend/dist");  // Ensure correct case
  app.use(express.static(frontendPath));  // Serve static files correctly

  app.get("/*", (req, res) => {
  res.sendFile(path.resolve(frontendPath, "index.html"));
});

}



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB()
});
