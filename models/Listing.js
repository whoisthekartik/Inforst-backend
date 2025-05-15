const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  tokenId: { type: String, required: true },
  tokenURI: { type: String, required: true },
  price: { type: String, required: true },
  seller: { type: String, required: true },
  isSold: { type: Boolean, default: false },
  listedAt: { type: Date, default: Date.now },
  soldAt: { type: Date }
});

module.exports = mongoose.model("Listing", ListingSchema);