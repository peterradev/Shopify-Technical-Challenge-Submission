const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
  {
    product: {
      type: String,
      required: [true, 'Please add an item']
    },
    amount: {
      type: Number,
      required: [true, 'Please add the specified amount']
    },
  }
)

module.exports = mongoose.model('Product', ProductSchema);