import { useEffect, useState } from "react";
import api from "../api";
import { Line } from "react-chartjs-2";

export default function Dashboard() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    api.get("/stats").then(res => setStats(res.data));
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>Dashboard</h1>

      <div style={{
        background: "#111827",
        padding: 20,
        borderRadius: 12
      }}>
        <Line
          data={{
            labels: stats.map(s => s.date),
            datasets: [{
              label: "Plants detected",
              data: stats.map(s => s.total),
              borderColor: "#22c55e"
            }]
          }}
        />
      </div>
    </div>
  );
}