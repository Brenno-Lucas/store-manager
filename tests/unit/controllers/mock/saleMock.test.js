const body = [
  {
    productId: 1,
    quantity: 2,
  },
  {
    productId: 2,
    quantity: 3,
  },
];

const quantity = [
  {
    productId: 3,
    quantity: 0,
  },
  {
    productId: 4,
    quantity: 5,
  },
];

const whitoutProduct = [
  {
    quantity: 6,
  },
  {
    productId: 6,
    quantity: 7,
  },
];

const outStock = [
  {
    productId: 8,
  },
  {
    productId: 8,
    quantity: 9,
  },
];

module.exports = {
  body,
  quantity,
  outStock,
  whitoutProduct,
};