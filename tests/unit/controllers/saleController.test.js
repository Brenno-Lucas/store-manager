const { expect } = require('chai');
const saleController = require('../../../src/controllers/sales.controller');
const saleMock = require('./mock/saleMock.test');

describe('Sales Controller', function () {
  it('Test the validKey function', async function () {
    const result = saleController.validKey(saleMock.body, 'productId');
    expect(result).to.be.equal(false);
  });
  it('Test the validKey function', async function () {
    const errorMsg = {
      type: false,
      message: `"productId" is required`,
      error: 400,
    };
    const result = saleController.validKey(
      saleMock.whitoutProduct,
      'productId'
    );
    expect(result).to.be.deep.equal(errorMsg);
  });
  it("Test the validInsert function", async function () {
    const result = saleController.validInsert(saleMock.body);
    expect(result).to.be.deep.equal({ type: true });
  });
  it("Test the validInsert function", async function () {
    const errorMsg = {
      type: false,
      message: `"productId" is required`,
      error: 400,
    };
    const result = saleController.validInsert(saleMock.whitoutProduct);
    expect(result).to.be.deep.equal(errorMsg);
  });
  it("Test validInsert function out of stock", async function () {
    const errorMsg = {
      type: false,
      message: `"quantity" is required`,
      error: 400,
    };
    const result = saleController.validInsert(saleMock.outStock);
    expect(result).to.be.deep.equal(errorMsg);
  });
  it("Test the validInsert function", async function () {
    errorMsg = {
      type: false,
      message: '"quantity" must be greater than or equal to 1',
      error: 422,
    };
    const result = saleController.validInsert(saleMock.quantity);
    expect(result).to.be.deep.equal(errorMsg);
  });
});