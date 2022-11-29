// Iniciando projeto Store Manager

const express = require('express');
const productsModel = require('./models/products.model');
const productsService = require('./services/products.service');
const productController = require('./controllers/products.controller');
const salesController = require('./controllers/sales.controller');
const salesService = require('./services/sales.service');
const salesModel = require('./models/sales.models');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 

app.get('/products', async (_req, res) => {
  const data = await productsModel.findAll('products');
  res.status(200).json(data);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const productExists = await productsService.checkID(id);
  if (productExists.type) return res.status(200).json(productExists.message);
  return res.status(productExists.error).json({ message: productExists.message });
});

app.post('/products', async (req, res) => {
  const { body } = req;
  const { name } = body;
  const product = productController.checkName(body);
  const { message, error } = product;
  if (!product.type) {
    return res.status(error).json({ message });
  }
  const id = await productsModel.insert(body);
  res.status(201).json({ id, name });
});

app.get('/sales', async (_req, res) => {
  const response = await salesModel.findAllSales();
  res.status(200).json(response);
});

app.get('/sales/:saleId', async (req, res) => {
  const { saleId } = req.params;
  const isIdCorrect = await salesService.validSaleId(saleId);
  if (!isIdCorrect.type) {
    return res.status(isIdCorrect.error).json({ message: isIdCorrect.message });
  }
  const response = await salesModel.findByIdSales(saleId);
  res.status(200).json(response);
});

app.post('/sales', async (req, res) => {
  const { body } = req;
  const bodySucess = salesController.validInsert(body);
  if (!bodySucess.type) {
    return res.status(bodySucess.error)
      .json({ message: bodySucess.message });
  }
  const idSucess = await salesService.validID(body);
  if (!idSucess.type) return res.status(idSucess.error).json({ message: idSucess.message });
  const insertID = await productsModel.findAll('sales');
  const sale = await salesModel.insertSale(insertID.length + 1);
  await salesModel.insertSaleProduct(body, sale);
  const responseOk = { id: sale, itemsSold: body };
  return res.status(201).json(responseOk);
});

module.exports = app;