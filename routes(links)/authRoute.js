const express =require ('express');
const {Model} = require ("mongoose");
const router =  express.Router ();
// const{check} = require ('express-validator');

const {Patient} = require ('../models/patientModel');
const authController = require('../controllers/authController');
const { check } = require('express-validator');

router.post('/register',
    [check("email")
    .notEmpty().withMessage("Email is required")
    // .isEmail().withMessage("please,Enter valid Email")
    .isLength({min:15}).withMessage("too short Email")
    .custom((value) => {
        // Check if the email ends with "@gmail.com" or "@yahoo.com"
        const allowedDomains = ['@gmail.com', '@yahoo.com'];
        
        if (!allowedDomains.some(domain => value.endsWith(domain))) {
            throw new Error('Invalid email domain. The email must end with "@gmail.com" or "@yahoo.com".');
        }
        
        return true;
    })
      ],

    [check("password")
    .notEmpty().withMessage("Password is required")
    .isLength({max:25}).withMessage("too long password")
    .isLength({min:8}).withMessage("too short password")
     ],
    
     [check("gender")
    .notEmpty().withMessage("Gender is required")
    .isString().withMessage("please,Enter valid gender")
    .isLength({max:6}).withMessage("too long gender")
    .isLength({min:4}).withMessage("too short gender")
      ],

     [check("phone")
    .notEmpty().withMessage("Phone is required")
    .isLength({max:11}).withMessage("too long phone number , it should be consists of :11 number")
    .isLength({min:11}).withMessage("too short phone number , it should be consists of :11 number")
    .custom((value) => {
        // يحقق من أن بداية رقم الهاتف تكون 011 أو 010 أو 012 أو 015
        const validPrefixes = ['011', '010', '012', '015'];
        const phonePrefix = value.substring(0, 3);
        if (!validPrefixes.includes(phonePrefix)) {
          throw new Error('Invalid phone number prefix, it shoud start with 010 or 012 or 011 or 015');
     }
     return true;
    })

     ],

    [check("name")
    .notEmpty().withMessage("Name is required").withMessage("please,Enter valid Name")
    .isLength({min:1}).withMessage("too short Name")
    .isLength({max:45}).withMessage("too long password")
    ],
authController.register);



router.post('/login',
    [check("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("please,Enter valid Email")
    .isLength({min:15}).withMessage("too short Email")
    ,

   check("password")
   .notEmpty().withMessage("Password is required")
  .isLength({max:10}).withMessage("too long password")
   .isLength({min:8}).withMessage("too short password")
],authController.logIn);

module.exports =router;