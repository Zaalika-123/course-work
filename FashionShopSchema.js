// FashionShopSchema.js
const mongoose = require('mongoose');

const FashionShopSchema = new mongoose.Schema(
  {
    "Product Category": { type: String, required: true },
    "Product Name": { type: String, required: true },
    "Units Sold": { type: Number, required: true },
    "Returns": { type: Number, required: true },
    "Revenue": { type: Number, required: true },
    "Customer Rating": { type: Number, required: true },
    "Stock Level": { type: Number, required: true },
    "Season": { type: String, required: true },
    "Trend Score": { type: Number, required: true }
  },
  {
    collection: 'FashionShop'
  }
);

module.exports = mongoose.model('FashionShop', FashionShopSchema);




