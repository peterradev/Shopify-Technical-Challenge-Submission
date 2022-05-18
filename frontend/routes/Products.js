const express = require('express');
const router = express.Router();
const Product = require('../models/Products')



// Get All routes
router.get('/', async (req, res) => {
  const products = await Product.find()
  res.send(products)
});



// add a new product
router.post('/', async (req, res) => {
  const newProduct = new Product(req.body)

  const savedProduct = await newProduct.save();
  res.json(savedProduct);
});



// get a specific quote
router.get('/:product', async (req, res) => {
  const p = await Product.findOne({ product: req.params.product });

  res.json(p);
})


// Delete quote
router.delete("/:product", async (req, res) => {
  const result  = await Product.deleteOne({product: req.params.product});

  res.json(result)
})

router.put("/:product/:amount", async (req, res) => {
  const product = await Product.findOne({product: req.params.product});
  console.log(product.amount + parseInt(req.params.amount))
  const total = product.amount + parseInt(req.params.amount);
  const result  = await Product.updateOne({product: req.params.product}, {amount: total });

  res.json(result)
})

router.patch("/:product/:amount", async (req, res) => {
  const product = await Product.findOne({product: req.params.product});
  // if(product.amount <= 0){
  //   res.json(404);
  // }
  console.log(product.amount - parseInt(req.params.amount))
  const total = product.amount - parseInt(req.params.amount);
  const result  = await Product.updateOne({product: req.params.product}, {amount: total });

  res.json(result)
})




module.exports = router;