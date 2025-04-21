import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router } from "./Routes/routes.js";
const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.get("/", function (req, res) {
  res.send("Hello from server");
});

app.use("/api",router);  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
