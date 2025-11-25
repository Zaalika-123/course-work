const mongoose = require('mongoose');

// Define the schema for the Fashion Shop dataset
const FashionShopSchema = new mongoose.Schema({
  productCategory: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true
  },
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  unitsSold: {
    type: Number,
    required: [true, 'Units sold is required'],
    min: [0, 'Units sold cannot be negative']
  },
  returns: {
    type: Number,
    default: 0,
    min: [0, 'Returns cannot be negative']
  },
  revenue: {
    type: Number,
    required: [true, 'Revenue is required'],
    min: [0, 'Revenue cannot be negative']
  },
  customerRating: {
    type: Number,
    min: [1, 'Minimum rating is 1'],
    max: [5, 'Maximum rating is 5']
  },
  stockLevel: {
    type: Number,
    required: [true, 'Stock level is required'],
    min: [0, 'Stock level cannot be negative']
  },
  season: {
    type: String,
    enum: ['Summer', 'Autumn', 'Winter', 'Spring'],
    required: [true, 'Season is required']
  },
  trendScore: {
    type: Number,
    min: [0, 'Trend score cannot be negative'],
    max: [100, 'Trend score cannot exceed 100']
  }
});

// Create and export the model
module.exports = mongoose.model('FashionShopData', FashionShopSchema);
