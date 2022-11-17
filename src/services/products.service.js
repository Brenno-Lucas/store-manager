const productsModel = require('../models/products.model');

const checkID = async (id) => {
  const product = await productsModel.findById(id);
  if (product) return { type: true, message: product };
  return { type: false, message: 'Product not found', error: 404 };
};

module.exports = {
  checkID,
};