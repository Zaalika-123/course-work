const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const FashionShopData = require('./models/FashionShopData'); // import schema

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(' MongoDB connected successfully'))
.catch((err) => console.error(' MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Fashion Shop API is running and connected to MongoDB');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
