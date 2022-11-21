const connection = require('./connection');

const insertSale = async (id) => {
  const [data] = await connection.execute(
    'INSERT INTO StoreManager.sales (id) VALUES (?)',
    [id],
  );
  return data.insertId;
};

const insertSaleProduct = async (body, id) => {
  await body.map((param) =>
    connection.execute(
      `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`,
      [id, param.productId, param.quantity],
    ));
};

module.exports = {
  insertSale,
  insertSaleProduct,
};