const chai = require('chai');
const connection = require('../../../../src/models/connection');
const { expect } = chai;
const mock = require('../mock/productsMock');
const productModel = require('../../../../src/models/products.model');
const sinon = require('sinon');

describe('Models tests', function () {
  it('Test findAll function', async function () {
    sinon.stub(connection, "execute").resolves([mock.products]);
    const result = await productModel.findAll();
    expect(result).to.be.deep.equal(mock.products);
  });

  afterEach(sinon.restore);

  it('Test findByID function', async function () {
    sinon.stub(connection, 'execute').resolves([[mock.products]]);
    const result = await productModel.findById(1);
    expect(result).to.be.deep.equal(mock.products);
  });
});