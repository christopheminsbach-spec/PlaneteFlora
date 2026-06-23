import { useState } from "react";
import api from "../api";
import Loader from "../components/Loader";
import PlantCard from "../components/PlantCard";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const upload = async () => {
    const form = new FormData();
    form.append("image", file);

    setLoading(true);

    const res = await api.post("/plants/identify", form);

    setResults(res.data.results);
    setLoading(false);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Upload Plant</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={upload}>
        Analyze
      </button>

      {loading && <Loader />}

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {results.map((p, i) => (
          <PlantCard key={i} plant={p} />
        ))}
      </div>
    </div>
  );
}