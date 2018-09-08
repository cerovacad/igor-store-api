const Product = require("../models/Product");

exports.index = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
};

exports.save = async (req, res) => {
  const product = new Product({...req.body});
  try {
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    res.status(400).send(err);
  }
};