const connection = require('./connection');
const productsModel = require('./products.model');

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

const findAllSales = async () => {
  const resp = await productsModel.findAll('sales ORDER BY id');
  const [data] = await connection.execute(`
  SELECT * FROM StoreManager.sales_products ORDER BY sale_id, product_id`);
  const result = await Promise.all(data.map((e) => (
    {
      saleId: e.sale_id,
      date: resp[e.sale_id - 1].date,
      productId: e.product_id,
      quantity: e.quantity,
    })));
  return result;
};

const findByIdSales = async (saleId) => {
  const resp = await productsModel.findAll('sales ORDER BY id');
  const [data] = await connection.execute(`
    SELECT * FROM  StoreManager.sales_products WHERE sale_id = ?
    ORDER BY sale_id, product_id`, [saleId]);
  const result = data.map((e) => ({
    date: resp[e.sale_id - 1].date,
    productId: e.product_id,
    quantity: e.quantity,
  }));
  return result;
};

module.exports = {
  insertSale,
  insertSaleProduct,
  findAllSales,
  findByIdSales,
};