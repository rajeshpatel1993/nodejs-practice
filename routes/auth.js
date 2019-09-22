const path = require('path');
const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();
const isAuth = require('../middleware/is-auth');


// /login => GET
router.get('/login',authController.getLogin);

// /signup => GET
router.get('/signup', authController.getSignup);


// /login => POST
router.post('/login', authController.postLogin);

// /signup => POST
router.post('/signup', authController.postSignup);


//logout => POST
router.post('/logout', isAuth, authController.postLogout );

module.exports = router;

