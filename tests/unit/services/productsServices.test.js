const connection = require('../../../src/models/connection');
const { expect } = require('chai');
const productsService = require('../../../src/services/products.service');
const sinon = require('sinon');

describe('Teste da camada service de product', function () {
  it('Test the checkID function on success', async function () {
    sinon.stub(connection, 'execute').resolves([[true]]);
    const result = await productsService.checkID(200);
    expect(result).to.deep.equal({ type: true, message: true });
  });

  afterEach(sinon.restore);

  it("Test the checkID function in case of error", async function () {
    sinon.stub(connection, "execute").resolves([[false]]);
    const result = await productsService.checkID(404);
    expect(result).to.deep.equal({ type: false, message: 'Product not found', error: 404 });
  });
});