const productModel = require('../models/products.model');
const salesModel = require('../models/sales.models');

const validID = async (body) => {
  let err = false;
  await Promise.all(body.map(async (param) => {
    const result = await productModel.findById(param.productId);
    if (!result) {
      err = {
        type: false,
        message: 'Product not found',
        error: 404,
      };
    }
    return true;
  }));
  if (!err) return { type: true }; return err;
};

const validSaleId = async (id) => {
  const result = await salesModel.findByIdSales(id);
  if (!result[0]) return { type: false, error: 404, message: 'Sale not found' };
  return { type: true };
};

module.exports = { validID, validSaleId };