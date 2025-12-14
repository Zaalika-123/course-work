// src/components/UpdateProduct.js
import React, { useState } from "react";
import api from "../api";

function UpdateProduct() {
  const [productNameToUpdate, setProductNameToUpdate] = useState("");
  const [form, setForm] = useState({
    productCategory: "",
    productName: "",
    unitsSold: "",
    returns: "",
    revenue: "",
    customerRating: "",
    stockLevel: "",
    season: "",
    trendScore: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const payload = {
        "Product Category": form.productCategory,
        "Product Name": form.productName || productNameToUpdate,
        "Units Sold": Number(form.unitsSold),
        "Returns": Number(form.returns),
        "Revenue": Number(form.revenue),
        "Customer Rating": Number(form.customerRating),
        "Stock Level": Number(form.stockLevel),
        "Season": form.season,
        "Trend Score": Number(form.trendScore),
      };

      await api.post(
        `/api/products/update/${encodeURIComponent(productNameToUpdate)}`,
        payload
      );
      setMessage("Product updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error updating product.");
    }
  };

  return (
    <div>
      <h2>Update Product (by Product Name)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name to Update: </label>
          <input
            type="text"
            value={productNameToUpdate}
            onChange={(e) => setProductNameToUpdate(e.target.value)}
            required
          />
        </div>

        <h4 style={{ marginTop: "15px" }}>New Values</h4>

        <div>
          <label>Product Category: </label>
          <input
            type="text"
            name="productCategory"
            value={form.productCategory}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>New Product Name (optional): </label>
          <input
            type="text"
            name="productName"
            value={form.productName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Units Sold: </label>
          <input
            type="number"
            name="unitsSold"
            value={form.unitsSold}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Returns: </label>
          <input
            type="number"
            name="returns"
            value={form.returns}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Revenue: </label>
          <input
            type="number"
            name="revenue"
            value={form.revenue}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Customer Rating: </label>
          <input
            type="number"
            step="0.1"
            name="customerRating"
            value={form.customerRating}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Stock Level: </label>
          <input
            type="number"
            name="stockLevel"
            value={form.stockLevel}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Season: </label>
          <input
            type="text"
            name="season"
            value={form.season}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Trend Score: </label>
          <input
            type="number"
            name="trendScore"
            value={form.trendScore}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Update Product
        </button>
      </form>
      {message && <p className="success">{message}</p>}
    </div>
  );
}

export default UpdateProduct;