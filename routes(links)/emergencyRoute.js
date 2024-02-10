const express = require("express");
const { model } = require("mongoose");
const router = express.Router();


const {Emergency}= require("../models/emergencyModel");
const emergencyController  = require("../controllers/emergencyController");

router.get('/all',emergencyController.getAll);
router.get('/:id',emergencyController.getById);



module.exports =router ;