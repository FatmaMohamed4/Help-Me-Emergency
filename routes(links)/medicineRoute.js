const express = require("express");
const { model } = require("mongoose");
const router = express.Router();

const {Medicine}= require("../models/medicineModel");
const medicineController  = require("../controllers/medicineController");

router.get('/all',medicineController.getAllMedicine);
router.get('/:id',medicineController.getOneMedicineById);
router.post('/create',medicineController.createMedicine);
router.delete('/:id',medicineController.deleteMedicineById);


// router.put('/update/:id',medicineController.updateMedicine);
module.exports =router ;
