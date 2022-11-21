const connection = require('./connection');

const findAll = async (param) => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.${param}`,
  );
  return result;
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

const insert = async ({ name }) => {
  const [data] = await connection.execute(`
    INSERT INTO StoreManager.products (name)
    VALUES (?)`, [name]);
  return data.insertId;
};
module.exports = {
  findAll,
  findById,
  insert,
};