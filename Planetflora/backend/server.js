import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// config DB + init
import "./config/initDb.js";

// routes
import plantRoutes from "./routes/plant.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import historyRoutes from "./routes/history.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express(); // ⚠️ DOIT ÊTRE EN PREMIER

// ======================
// MIDDLEWARE
// ======================
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ======================
// ROUTES API
// ======================
app.use("/api/plants", plantRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/auth", authRoutes);

// ======================
// ROUTE TEST
// ======================
app.get("/", (req, res) => {
  res.json({
    app: "Planet_Flora",
    status: "online",
    time: new Date().toISOString()
  });
});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Planet_Flora running on port ${PORT}`);
});