import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import Map from "./pages/Map";
import Login from "./pages/Login";

export default function App() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard />;
      case "upload":
        return <Upload />;
      case "history":
        return <History />;
      case "analytics":
        return <Analytics />;
      case "map":
        return <Map />;
      case "login":
        return <Login />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* SIDEBAR */}
      <div style={{
        width: 220,
        background: "#1b5e20",
        color: "white",
        padding: 20
      }}>
        <h2>🌿 Planet Flora</h2>

        <button onClick={() => setPage("dashboard")}>Dashboard</button><br />
        <button onClick={() => setPage("upload")}>Upload</button><br />
        <button onClick={() => setPage("history")}>History</button><br />
        <button onClick={() => setPage("analytics")}>Analytics</button><br />
        <button onClick={() => setPage("map")}>Map</button><br />
        <button onClick={() => setPage("login")}>Login</button><br />
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: 20 }}>
        {renderPage()}
      </div>

    </div>
  );
}