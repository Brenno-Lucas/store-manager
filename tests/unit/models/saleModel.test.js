const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const saleModel = require('../../../src/models/sales.models');
const productModel = require('../../../src/models/products.model');
const saleMock = require('./mock/saleMock');

describe('Sales models', function () {
  it('Test findAll function', async function () {
    sinon.stub(connection, "execute").resolves([saleMock.sales]);
    const result = await productModel.findAll();
    expect(result).to.be.deep.equal(saleMock.sales);
  });

  afterEach(sinon.restore);

  it("Test insertSale function", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 10 }]);
    const result = await saleModel.insertSale(10);
    expect(result).to.be.equal(10);
  });

  it("Test insertSaleProduct function", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
    const result = await saleModel.insertSaleProduct([
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 2 },
    ], 1);
    expect(result).to.be.equal();
  });
});