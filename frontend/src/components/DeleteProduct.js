// src/components/DeleteProduct.js
import React, { useState } from "react";
import api from "../api";

function DeleteProduct() {
  const [productName, setProductName] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post(
        `/api/products/delete/${encodeURIComponent(productName)}`
      );
      setMessage("Product deleted (if it existed).");
    } catch (err) {
      console.error(err);
      setMessage("Error deleting product.");
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>Product Name: </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Delete
        </button>
      </form>
      {message && <p className="success">{message}</p>}
    </div>
  );
}

export default DeleteProduct;
