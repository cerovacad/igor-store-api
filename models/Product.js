const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  raiting: {
    type: String,
    required: true
  },
  reviews: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  offers: {
    type: Array,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  availability: {
    type: Number,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Product", ProductSchema);

