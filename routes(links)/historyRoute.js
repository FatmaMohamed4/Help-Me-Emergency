const express = require("express");
const { model } = require("mongoose");
const router = express.Router();


const {History}= require("../models/historyModel");
const historyController  = require("../controllers/historyController");


router.post('/create',historyController.createHistory);
router.get('/all',historyController.getHistory);
 
module.exports =router;