const express = require('express');
const { paginatedResults } = require('../middlewares/pagination');
const Product = require('../models/product');
const router = express.Router();
const Controller = require('../controllers/productCtrl');

router.put('/product', Controller.uploadProduct);
router.get('/allproducts', paginatedResults(Product), Controller.getAllProducts); // by pagination to get all products
router.get('/byproductid/:id', Controller.getProductById); // by product id
router.get('/topProducts', Controller.topProducts); // top 5 products

module.exports = router;
