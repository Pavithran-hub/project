const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.post('/:id/bid', async (req, res) => {
  const { id } = req.params;
  const { amount, user } = req.body;
  const product = await Product.findById(id);
  product.bids.push({ amount, user, time: new Date() });
  await product.save();
  res.status(200).json({ message: 'Bid placed successfully' });
});

module.exports = router;
