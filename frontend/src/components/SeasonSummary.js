// src/components/SeasonSummary.js
import React, { useState } from "react";
import api from "../api";

function SeasonSummary() {
  const [season, setSeason] = useState("");
  const [summary, setSummary] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSummary(null);

    try {
      const res = await api.get(`/api/summary/${encodeURIComponent(season)}`);
      setSummary(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Error fetching summary.");
    }
  };

  return (
    <div>
      <h2>Season Summary</h2>
      <form onSubmit={handleSubmit}>
        <label>Season: </label>
        <input
          type="text"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          required
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Get Summary
        </button>
      </form>

      {message && <p className="error">{message}</p>}

      {summary && (
        <div style={{ marginTop: "15px" }}>
          <h3>Summary for {summary.season}</h3>
          <p>Total Units Sold: {summary.totalUnitsSold}</p>
          <p>Total Returns: {summary.totalReturns}</p>
          <p>Total Revenue: {summary.totalRevenue}</p>
        </div>
      )}
    </div>
  );
}

export default SeasonSummary;
