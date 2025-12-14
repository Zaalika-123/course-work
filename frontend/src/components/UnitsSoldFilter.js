// src/components/UnitsSoldFilter.js
import React, { useState } from "react";
import api from "../api";

function UnitsSoldFilter() {
  const [season, setSeason] = useState("");
  const [minUnits, setMinUnits] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setResults([]);

    try {
      const res = await api.get("/api/products/filter", {
        params: {
          season,
          minUnits,
        },
      });
      setResults(res.data || []);
    } catch (err) {
      console.error(err);
      setMessage("Error fetching filtered records.");
    }
  };

  return (
    <div>
      <h2>Filter by Units Sold</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Season: </label>
          <input
            type="text"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Minimum Units Sold: </label>
          <input
            type="number"
            value={minUnits}
            onChange={(e) => setMinUnits(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Search
        </button>
      </form>

      {message && <p className="error">{message}</p>}

      {results.length > 0 && (
        <div style={{ marginTop: "15px" }}>
          <h3>Results (max 10 records)</h3>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Product Category</th>
                <th>Product Name</th>
                <th>Season</th>
                <th>Units Sold</th>
                <th>Returns</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, i) => (
                <tr key={i}>
                  <td>{item["Product Category"]}</td>
                  <td>{item["Product Name"]}</td>
                  <td>{item["Season"]}</td>
                  <td>{item["Units Sold"]}</td>
                  <td>{item["Returns"]}</td>
                  <td>{item["Revenue"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {results.length === 0 && !message && (
        <p style={{ marginTop: "10px" }}>No results yet. Try a search.</p>
      )}
    </div>
  );
}

export default UnitsSoldFilter;
