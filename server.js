const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const FashionShopData = require("./models/FashionShopData");

dotenv.config();
const app = express();

app.use(express.json());

// Connect DB
connectDB();

// Default route
app.get("/", (req, res) => {
  res.send("Fashion Shop Web Server is running and connected to MongoDB");
});


// ---------------------------------------------------------
// GET ALL PRODUCTS
// ---------------------------------------------------------
app.get("/api/products", async (req, res) => {
  try {
    const products = await FashionShopData.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving products", error: err.message });
  }
});


// ---------------------------------------------------------
// ADD PRODUCT
// ---------------------------------------------------------
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new FashionShopData(req.body);
    const saved = await newProduct.save();
    res.status(201).json({ message: "Product added successfully", data: saved });
  } catch (err) {
    res.status(500).json({ message: "Error adding product", error: err.message });
  }
});


// ---------------------------------------------------------
// UPDATE PRODUCT BY ProductName
// ---------------------------------------------------------
app.post("/api/products/update", async (req, res) => {
  try {
    const updated = await FashionShopData.findOneAndUpdate(
      { ProductName: req.body.ProductName },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
});


// ---------------------------------------------------------
// DELETE PRODUCT
// ---------------------------------------------------------
app.post("/api/products/delete", async (req, res) => {
  try {
    const deleted = await FashionShopData.findOneAndDelete({
      ProductName: req.body.ProductName
    });

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted", data: deleted });

  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
});


// ---------------------------------------------------------
// GET SUMMARY FOR A SEASON (WINTER WILL WORK NOW)
// ---------------------------------------------------------
app.get("/api/season-summary/:season", async (req, res) => {
  try {
    const season = req.params.season;

    const summary = await FashionShopData.aggregate([
      {
        $match: {
          Season: { $regex: new RegExp(season.trim(), "i") }
        }
      },
      {
        $group: {
          _id: "$Season",
          totalUnitsSold: { $sum: "$UnitsSold" },
          totalReturns: { $sum: "$Returns" },
          totalRevenue: { $sum: "$Revenue" }
        }
      }
    ]);

    if (summary.length === 0) {
      return res.status(404).json({ message: `No records found for season: ${season}` });
    }

    res.json({ message: "Summary found", data: summary[0] });

  } catch (err) {
    res.status(500).json({ message: "Error retrieving summary", error: err.message });
  }
});


// ---------------------------------------------------------
// FILTER TOP 10 FOR SEASON
// ---------------------------------------------------------
app.get("/api/products/filter", async (req, res) => {
  try {
    const { season, minUnits } = req.query;

    const products = await FashionShopData.find({
      Season: { $regex: new RegExp(season.trim(), "i") },
      UnitsSold: { $gt: Number(minUnits) }
    }).limit(10);

    if (products.length === 0) {
      return res.status(404).send(`<h2>No results for ${season}</h2>`);
    }

    let html = `
      <h1>Top 10 ${season} Products</h1>
      <table border="1">
        <tr>
          <th>Product Category</th>
          <th>Product Name</th>
          <th>Units Sold</th>
          <th>Returns</th>
          <th>Revenue</th>
          <th>Customer Rating</th>
          <th>Stock Level</th>
          <th>Season</th>
          <th>Trend Score</th>
        </tr>
    `;

    products.forEach(p => {
      html += `
      <tr>
        <td>${p.ProductCategory}</td>
        <td>${p.ProductName}</td>
        <td>${p.UnitsSold}</td>
        <td>${p.Returns}</td>
        <td>${p.Revenue}</td>
        <td>${p.CustomerRating}</td>
        <td>${p.StockLevel}</td>
        <td>${p.Season}</td>
        <td>${p.TrendScore}</td>
      </tr>`;
    });

    html += "</table>";
    res.send(html);

  } catch (err) {
    res.status(500).send("Error filtering products");
  }
});


// ---------------------------------------------------------
// SEASON RATING CHECK
// ---------------------------------------------------------
app.get("/api/season-rating", async (req, res) => {
  try {
    const { season, minRating } = req.query;

    const avg = await FashionShopData.aggregate([
      {
        $match: {
          Season: { $regex: new RegExp(season.trim(), "i") }
        }
      },
      {
        $group: { _id: "$Season", avgRating: { $avg: "$CustomerRating" } }
      }
    ]);

    if (avg.length === 0) {
      return res.status(404).send(`<h2>No records for ${season}</h2>`);
    }

    if (avg[0].avgRating < Number(minRating)) {
      return res.send(`<h2>Average rating is below ${minRating}</h2>`);
    }

    const products = await FashionShopData.find({
      Season: { $regex: new RegExp(season.trim(), "i") }
    });

    let html = `
      <h1>Products for ${season}</h1>
      <table border="1">
        <tr>
          <th>Product Category</th>
          <th>Product Name</th>
          <th>Units Sold</th>
          <th>Returns</th>
          <th>Revenue</th>
          <th>Customer Rating</th>
          <th>Stock Level</th>
          <th>Season</th>
          <th>Trend Score</th>
        </tr>
    `;

    products.forEach(p => {
      html += `
      <tr>
        <td>${p.ProductCategory}</td>
        <td>${p.ProductName}</td>
        <td>${p.UnitsSold}</td>
        <td>${p.Returns}</td>
        <td>${p.Revenue}</td>
        <td>${p.CustomerRating}</td>
        <td>${p.StockLevel}</td>
        <td>${p.Season}</td>
        <td>${p.TrendScore}</td>
      </tr>`;
    });

    html += "</table>";
    res.send(html);

  } catch (err) {
    res.status(500).send("Error retrieving rating data");
  }
});


// ---------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
