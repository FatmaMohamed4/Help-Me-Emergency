const express = require("express");
const { model } = require("mongoose");
const router = express.Router();


const {Course}= require("../models/coursesModel");
const courseController  = require("../controllers/courseController");

router.get('/all',courseController.getAllCourses);
router.get('/:id',courseController.getCourseById);
// router.post('/create',courseController.createCourse);
// router.delete('/:id',courseController.deleteCourseById);
// router.put('/:id',courseController.updateOneCourse);

module.exports =router ;


