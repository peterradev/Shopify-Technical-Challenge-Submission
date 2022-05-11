const mongoose = require('mongoose');

const invSchema = mongoose.Schema(
  {
    product: {
      type: "String",
      required: [true, 'Please add an item']
    },
    amount: {
      type: Number,
      required: [true, 'Please add the specified amount']
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Product', invSchema);