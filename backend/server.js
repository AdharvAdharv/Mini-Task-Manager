import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authroutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js'
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',authroutes)
app.use('/api/tasks',taskRoutes);

app.get("/", (req, res) => {
  res.send("TaskFlow API running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
