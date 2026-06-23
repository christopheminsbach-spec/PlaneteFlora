import { useState } from "react";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      alert("Login OK");
    } catch (err) {
      alert("Erreur login");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>

      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}