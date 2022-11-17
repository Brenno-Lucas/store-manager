// Iniciando projeto Store Manager

const express = require('express');
const productsModel = require('./models/products.model');
const productsService = require('./services/products.service');

const app = express();

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

module.exports = app;