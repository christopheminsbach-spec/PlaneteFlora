import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

const SECRET = "planet_flora_secret";

export const register = (req, res) => {
  const { email, password } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hash],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User created" });
    }
  );
};

export const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err || results.length === 0)
        return res.status(401).json({ error: "User not found" });

      const user = results[0];

      const valid = bcrypt.compareSync(password, user.password);

      if (!valid)
        return res.status(401).json({ error: "Wrong password" });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        SECRET,
        { expiresIn: "7d" }
      );

      res.json({ token });
    }
  );
};