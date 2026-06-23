import express from "express";
import { db } from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const offset = (page - 1) * limit;

  db.query(
    `SELECT * FROM identifications
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?`,
    [limit, offset],
    (err, results) => {
      if (err) return res.status(500).json(err);

      res.json({
        page,
        results
      });
    }
  );
});

export default router;
