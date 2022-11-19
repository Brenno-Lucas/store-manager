const connection = require('../../../src/models/connection');
const { expect } = require('chai');
const productModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const sinon = require('sinon');

describe('Services tests', function () {
  it('Test the checkID function on success', async function () {
    sinon.stub(productModel, 'insert').resolves([{ insertId: 1 }]);
    sinon.stub(productModel, 'findById').resolves({ id: 1, name: 'test' });
    const result = await productsService.checkID({ name: 'test' });
    expect(result.message).to.deep.equal({ id: 1, name: 'test' });
  });

  afterEach(sinon.restore);

  it("Test the checkID function in case of error", async function () {
    sinon.stub(connection, "execute").resolves([[false]]);
    const result = await productsService.checkID(404);
    expect(result).to.deep.equal({ type: false, message: 'Product not found', error: 404 });
  });
});