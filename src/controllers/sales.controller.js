const validKey = (body, key) => {
  let err = false;
  body.forEach((param) => {
    const keys = Object.keys(param);
    if (!keys.includes(key)) {
      err = {
        type: false,
        message: `"${key}" is required`,
        error: 400,
      };
    }
  });
  return err;
};

const validInsert = (body) => {
  let err = false;
  const productErr = validKey(body, 'productId');
  if (productErr) return productErr;
  const quantityErr = validKey(body, 'quantity');
  if (quantityErr) return quantityErr;
  body.forEach((param) => {
    if (param.quantity < 1) {
      err = {
        type: false,
        message: '"quantity" must be greater than or equal to 1',
        error: 422,
      };
    }
  });
  if (err) return err;
  return { type: true };
};

module.exports = { validInsert };