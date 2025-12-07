// server.js
const express = require('express');
const cors = require('cors');

const connectDB = require('./MongoDBConnect');
const FashionShop = require('./FashionShopSchema');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 1.4 – default route
app.get('/', (req, res) => {
  res.send('Fashion Shop Backend is running');
});

/* 1.5 – POST: Add data to FashionShopData
   Fields:
   Product Category, Product Name, Units Sold, Returns, Revenue,
   Customer Rating, Stock Level, Season, Trend Score
*/
app.post('/api/products', async (req, res) => {
  try {
    const body = req.body;

    const newDoc = new FashionShop({
      "Product Category": body["Product Category"],
      "Product Name": body["Product Name"],
      "Units Sold": body["Units Sold"],
      "Returns": body["Returns"],
      "Revenue": body["Revenue"],
      "Customer Rating": body["Customer Rating"],
      "Stock Level": body["Stock Level"],
      "Season": body["Season"],
      "Trend Score": body["Trend Score"]
    });

    await newDoc.save();
    res.status(201).json({ message: 'Product added successfully', product: newDoc });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

/* 1.6 – POST: Update one record for a given Product Name */
app.post('/api/products/update/:productName', async (req, res) => {
  try {
    const productName = req.params.productName;
    const body = req.body;

    const update = {
      "Product Category": body["Product Category"],
      "Product Name": body["Product Name"],
      "Units Sold": body["Units Sold"],
      "Returns": body["Returns"],
      "Revenue": body["Revenue"],
      "Customer Rating": body["Customer Rating"],
      "Stock Level": body["Stock Level"],
      "Season": body["Season"],
      "Trend Score": body["Trend Score"]
    };

    const updatedDoc = await FashionShop.findOneAndUpdate(
      { "Product Name": productName },
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product: updatedDoc });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

/* 1.7 – POST: Delete a record for a given Product Name */
app.post('/api/products/delete/:productName', async (req, res) => {
  try {
    const productName = req.params.productName;

    const deleted = await FashionShop.findOneAndDelete({
      "Product Name": productName
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

/* 1.8 – GET: Show total Units Sold, Returns, and Revenue for a given Season */
app.get('/api/summary/:season', async (req, res) => {
  try {
    const season = req.params.season;

    const result = await FashionShop.aggregate([
      { $match: { "Season": season } },
      {
        $group: {
          _id: null,
          totalUnitsSold: { $sum: "$Units Sold" },
          totalReturns: { $sum: "$Returns" },
          totalRevenue: { $sum: "$Revenue" }
        }
      }
    ]);

    if (result.length === 0) {
      return res.json({
        season,
        totalUnitsSold: 0,
        totalReturns: 0,
        totalRevenue: 0
      });
    }

    const summary = result[0];
    res.json({
      season,
      totalUnitsSold: summary.totalUnitsSold,
      totalReturns: summary.totalReturns,
      totalRevenue: summary.totalRevenue
    });
  } catch (err) {
    console.error('Error getting summary:', err);
    res.status(500).json({ error: 'Failed to get summary' });
  }
});

/* 1.9 – GET:
   First 10 records where Units Sold > given value & Season = given season
   Example: /api/products/filter?season=Summer&minUnits=100
*/
app.get('/api/products/filter', async (req, res) => {
  try {
    const season = req.query.season;
    const minUnits = Number(req.query.minUnits) || 0;

    const records = await FashionShop.find({
      "Season": season,
      "Units Sold": { $gt: minUnits }
    }).limit(10);

    res.json(records);
  } catch (err) {
    console.error('Error filtering products:', err);
    res.status(500).json({ error: 'Failed to filter products' });
  }
});

/* 1.10 – GET:
   Display all products where Customer Rating for a given Season meets a condition
   Example: /api/products/rating?season=Winter&minRating=4
*/
app.get('/api/products/rating', async (req, res) => {
  try {
    const season = req.query.season;
    const minRating = Number(req.query.minRating) || 0;

    const products = await FashionShop.find({
      "Season": season,
      "Customer Rating": { $gte: minRating }
    });

    res.json(products);
  } catch (err) {
    console.error('Error getting products by rating:', err);
    res.status(500).json({ error: 'Failed to get products by rating' });
  }
});

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});


