const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageSrc: String,
  startingPrice: Number,
  currentBid: Number,
  auctionEndTime: Date,
});

module.exports = mongoose.model('Product', productSchema);
