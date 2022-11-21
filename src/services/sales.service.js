const productModel = require('../models/products.model');

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

module.exports = { validID };