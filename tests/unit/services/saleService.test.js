const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const saleServices = require('../../../src/services/sales.service');

describe('Sales Service', function () {
  it('Test validID function', async function () {
    const errorMsg = {
      type: false,
      message: "Product not found",
      error: 404,
    };
    sinon.stub(connection, 'execute').resolves([[]]);
    const result = await saleServices.validID([{ productId: 1, quantity: 2 }]);
    expect(result).to.be.deep.equal(errorMsg);
  });

  afterEach(sinon.restore);

  it("Test validID function", async function () {
    sinon.stub(connection, "execute").resolves(['ok']);
    const result = await saleServices.validID([
      { productId: 1, quantity: 10 },
    ]);
    expect(result.type).to.be.equal(true);
  });

});