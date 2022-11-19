
const { expect } = require('chai');
const productsController = require('../../../src/controllers/products.controller');

describe('Controller tests', function () {
  it('Test the checkName function on success', function () {
    const response = productsController.checkName({ name: "test01" });
    expect(response).to.deep.equal({ type: true });
  });

  it("est the checkName function in case of error", function () {
    const response = productsController.checkName({});
    expect(response).to.deep.equal({ type: false, message: '"name" is required', error: 400 });
  });

  it("est the checkName function in case of error", function () {
    const response = productsController.checkName({ name: 'test' });
    expect(response).to.deep.equal({
      type: false,
      message: '"name" length must be at least 5 characters long',
      error: 422,
    });
  });
});