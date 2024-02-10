const express = require("express");
const { model } = require("mongoose");
const router = express.Router();

const courseController = require("../controllers/courseController");
const medicineController = require("../controllers/medicineController");
const adminController = require ("../controllers/adminController");
const emergencyController =require ("../controllers/emergencyController");

//course  --->     http://localhost:-----/api/admin/course/
router.post('/course/create',courseController.createCourse);
router.delete('/course/delete/:id',courseController.deleteCourseById);
router.put('/course/update/:id',courseController.updateOneCourse);


//medicine   --->  http://localhost:-----/api/admin/medicine/
router.post('/medicine/create',medicineController.createMedicine);
router.delete('/medicine/delete/:id',medicineController.deleteMedicineById);


//emergency  ---> http://localhost:-----/api/admin/emergency/
router.post('/emergency/create',emergencyController.create);
router.delete('/emergency/:id',emergencyController.deleteById);
router.put('/emergency/update/:id',emergencyController.updateOneEmergency);

//Admin CRUD 
router.get ('/allAdmin',adminController.getAllAdmins);
router.post ('/register',adminController.registerAdmin) ;
router.post ('/login',adminController.logInAdmin) ;
module.exports =router ;