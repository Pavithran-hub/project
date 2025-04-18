const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/auctionDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("MongoDB connection error:", err));

// Create schema for Product
const productSchema = new mongoose.Schema({
  title: String,
  imageSrc: String,
  auctionStartTime: Date,
  auctionEndTime: Date,
  currentBid: Number,
});

const Product = mongoose.model("Product", productSchema);

// Route to get product details
app.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).send("Product not found");
  }
  res.json(product);
});

// Route to update product bid
app.post("/product/:id/bid", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).send("Product not found");
  }

  const newBid = req.body.bidAmount;
  product.currentBid = newBid;
  await product.save();
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
