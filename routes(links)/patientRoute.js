const express = require("express");
const { model } = require("mongoose");
const router = express.Router();

const {Patient}= require("../models/patientModel");
const patientController  = require("../controllers/patientController");

router.get('/all',patientController.getAllPatient);
router.get('/:id',patientController.getPatientById) ;

module.exports =router ;
