import { useEffect, useState } from "react";
import api from "../api";
import { Line } from "react-chartjs-2";

export default function Dashboard() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    api.get("/stats").then(res => setStats(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <Line
        data={{
          labels: stats.map(s => s.date),
          datasets: [
            {
              label: "Identifications",
              data: stats.map(s => s.total),
              borderColor: "#2e7d32"
            }
          ]
        }}
      />
    </div>
  );
}