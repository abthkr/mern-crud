const joi = require("joi");
const Product = require("../../models/product");

/**
 * @api GET /api/products
 * @description Get all products
 */
module.exports = async function (req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.json({ products });
  } catch (error) {
    console.error("Error in getting products", error);
    return res
      .status(500)
      .json({ message: error.message ?? "Error in getting products" });
  }
};
