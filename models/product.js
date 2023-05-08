const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    price: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    productDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1250,
    },
    image: {
      type: String,
      required: true,
    },
    imageHash : {
      type : String,
      required: true,
    }

    // likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],

    // user: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('product', productSchema);

//https://ipfs.infura.io/ipfs/QmTVzPdqGtWdX8D3HRTDfHPUfSTL5bXEuJAw9bETki5Ru8