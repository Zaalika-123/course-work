// src/components/RatingFilter.js
import React, { useState } from "react";
import api from "../api";

function RatingFilter() {
  const [season, setSeason] = useState("");
  const [minRating, setMinRating] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setResults([]);

    try {
      const res = await api.get("/api/products/rating", {
        params: {
          season,
          minRating,
        },
      });
      setResults(res.data || []);
    } catch (err) {
      console.error(err);
      setMessage("Error fetching products by rating.");
    }
  };

  return (
    <div>
      <h2>Filter Products by Customer Rating</h2>
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
          <label>Minimum Rating (≥): </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Filter
        </button>
      </form>

      {message && <p className="error">{message}</p>}

      {results.length > 0 && (
        <div style={{ marginTop: "15px" }}>
          <h3>
            Products with Rating ≥ {minRating} in {season}
          </h3>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Product Category</th>
                <th>Product Name</th>
                <th>Season</th>
                <th>Customer Rating</th>
                <th>Units Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, i) => (
                <tr key={i}>
                  <td>{item["Product Category"]}</td>
                  <td>{item["Product Name"]}</td>
                  <td>{item["Season"]}</td>
                  <td>{item["Customer Rating"]}</td>
                  <td>{item["Units Sold"]}</td>
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

export default RatingFilter;
