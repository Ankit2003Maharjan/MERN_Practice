import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import usersRoutes from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

//Middle ware
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}
app.use(express.json());

app.use(rateLimiter);

// app.use((req,res,next)=>{
//   console.log(`we got ${req.method} and we got ${req.url}` );
//   next();
// })

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
}

// API routes
app.use("/api/users", usersRoutes);

// Catch-all (MUST BE LAST)
app.use((req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  } else {
    res.status(404).json({ message: "Route not found" });
  }
});

connectDB().then(() => {
  // Start Server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
