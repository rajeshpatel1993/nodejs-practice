const path = require('path');
const express = require('express');

const { body } = require('express-validator/check');

const rootDir = require('../util/path');

const adminController = require('../controllers/admin');

const router = express.Router();

const isAuth = require('../middleware/is-auth');


// /admin/add-product => GET
router.get('/add-product', isAuth ,adminController.getAddProduct);

// // /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);


//  /admin/add-product => POST
router.post('/add-product',isAuth, adminController.postAddProduct);


// //  /admin/edit-product => GET
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

// // // /admin/edit-product => POST
router.post('/edit-product',  
 [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth, adminController.postEditProduct);


// /admin/delete-product => post
router.post('/delete-product',
[
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ], isAuth, adminController.postDeleteProduct);



module.exports = router;

