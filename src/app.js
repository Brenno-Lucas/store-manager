// Iniciando projeto Store Manager

const express = require('express');
const productsModel = require('./models/products.model');
const productsService = require('./services/products.service');
const productController = require('./controllers/products.controller');

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
  const data = await productsModel.findAll();
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

module.exports = app;