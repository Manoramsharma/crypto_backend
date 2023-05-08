const ProductsService = require('../services/products.service');
const productModel = require('../models/product');
const Product = require('../models/product');
const l = require('../common/logger');

class Controller {
  async uploadProduct(req, res, next) {
    try {
      await ProductsService.uploadProduct(req.body);
      res.status(200).json({ message: 'Product Uploaded successfully' });
    } catch (error) {
      next(error);
    }
  }
  async deleteProduct(req, res, next) {
    try {
      const product = await productModel.findById(req.params.id);
      if (!product) throw { status: 404, message: 'Product does not exist' };
      const deleteProduct = await ProductsService.deleteProduct(req.params.id);
      res.status(200).json({ message: 'Product Deleted successfully' });
    } catch (error) {
      l.error('[DELETE PRODUCT CONTROLLER]', req);
      next(error);
    }
  }

  async getAllProducts(req, res) {
    try {
      const result = await Product.find({}).sort('-createdAt');

      res.status(200).json({ result: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
  async getProductById(req, res, next) {
    try {
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        throw { status: 400, message: 'Invalid product id' };
      }
      const product = await Product.findOne({ _id: req.params.id });
      if (!product) {
        throw { status: 400, message: 'Product not found' };
      }
      res.status(200).json({ message: 'Product fetched', product });
    } catch (error) {
      l.error(`[GET PRODUCT BY ID CONTROLLER] ${error}`, req);
      next(error);
    }
  }
  async topProducts(req, res, next) {
    try {
      const product = await productModel.find().sort('-createdAt').limit(4);
      res.status(200).json({ message: 'Product fetched', product: product });
    } catch (err) {
      l.error('[TOP PRODUCTS]', req);
      next(err);
    }
  }
}
module.exports = new Controller();
