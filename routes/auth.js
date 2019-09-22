const path = require('path');
const express = require('express');
const { check, body } = require("express-validator/check");
const authController = require('../controllers/auth');

const router = express.Router();

const User = require('../models/user');
const isAuth = require('../middleware/is-auth');



// /login => GET
router.get('/login',authController.getLogin);

// /signup => GET
router.get('/signup', authController.getSignup);


// /reset => GET
router.get('/reset', authController.getReset);
// /reset => POST
router.post('/reset', authController.postReset);


// /login => POST
router.post('/login',[ check('email').isEmail()
.withMessage("please enter valid Email").normalizeEmail(), 
body(
    'password',
    'Please enter a password with only numbers and text and at least 5 characters.'
  )
    .isLength({ min: 5 })
    .isAlphanumeric()
    .trim(),
], authController.postLogin);

// /signup => POST
router.post('/signup',[ check('email').isEmail()
.normalizeEmail()
.withMessage("please enter valid Email")
.custom((value,{req}) => {
    // if(value === "test@test.com"){
    //     throw new Error('This email address is forbidden');
    // }
    // return true;

    return User.findOne({ email: value }).then(userDoc => {
        if (userDoc) {
          return Promise.reject(
            'E-Mail exists already, please pick a different one.'
          );
        }
      });

}).trim(), body(
    'password',
    'Please enter a password with only numbers and text and at least 5 characters.'
  )
    .isLength({ min: 5 })
    .isAlphanumeric().trim(),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords have to match!');
    }
    return true;
  })], authController.postSignup);


//logout => POST
router.post('/logout', isAuth, authController.postLogout );


router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);
module.exports = router;

