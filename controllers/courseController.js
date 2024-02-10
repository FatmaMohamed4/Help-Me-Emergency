// controllers/courseController.js
const {Course} = require('../models/coursesModel');
const connectDB = require('../connectDB');

class courseController {

    static getAllCourses =async (req, res) => {
    try {
      const db = await connectDB();
      const collection = db.collection('courses');
      const result = await collection.find().toArray();
      console.log(result);
      res.json(result);
    } catch (error) {
      console.error('Error reading courses:', error);
      res.status(500).send('Internal Server Error');
    }
    }

  static  getCourseById =async (req, res) => {
    try {
            const db = await connectDB();
            const collection = db.collection('courses');
            // const result = await collection.find().toArray();
            // res.json(result);
        
            // Extract the ID parameter from the request URL
            const courseId = +req.params.id;
        
            // Query the collection for the specific emergency with the given ID
            const result = await collection.findOne({ id: courseId });
        
            if (result) {
              // Set Content-Type header to application/json
              res.header('Content-Type', 'application/json');
        
              // Send the result as a JSON object with indentation for better readability
              res.send(JSON.stringify(result, null, 2));
            } else {
              res.status(404).send('Course not found');
            }
          } catch (error) {
            console.error('Error reading course by ID:', error);
            res.status(500).send('Internal Server Error');
          }
    }

    static createCourse = async (req, res) => {
     try {
    const db = await connectDB();
    const collection = db.collection('courses');

    // Extract course data from the request body
    const newCourseData = req.body;

      // Check if the course ID already exists
      const existingCourse = await collection.findOne({ id: newCourseData.id });

      if (existingCourse) {
          // Course ID exists
          res.send(`Course with ID ${newCourseData.id} already exists.`);
      } else {
          // Course ID doesn't exist, create a new course
          const result = await collection.insertOne(newCourseData);

    if (result){
      res.send('created');
    } else {
      res.send('failed');
    }
    console.log(result);
    
  } 
}catch (error) {
    console.error('Error creating new course:', error);
    res.status(500).send('Internal Server Error');
  }
    }

    static deleteCourseById = async (req, res) => {
        try {
            const db = await connectDB();
            const collection = db.collection('courses');
        
            // Extract the ID parameter from the request URL
            const courseId = req.params.id;
        
            // Delete the emergency with the given ID
            const result = await collection.deleteOne({ id: courseId });
        
            if (result) {
              res.status(200).send('course deleted successfully');
            } else {
              res.status(404).send('course not found');
            }
          } catch (error) {
            console.error('Error deleting emergency by ID:', error);
            res.status(500).send('Internal Server Error');
          }
    }

    static updateOneCourse  = async (req, res) => {
        try {
          const db = await connectDB();
          const collection = db.collection('courses');
    
          // Extract the ID parameter from the request URL
          const courseId = parseInt(req.params.id);
    
          // Extract the new name from the request body
          const { courseName } = req.body;
          const {id} = req.body ;
          // Check if the emergency with the given ID exists
          const existingCourse = await collection.findOne({ id: courseId });
    
          if (existingCourse) {
            // Update the name of the existing emergency
            const result = await collection.updateMany(
              { id: courseId },
              { $set: {id :id , courseName: courseName } }
            );
    
            if (result.modifiedCount > 0) {
              res.status(200).send(`Course with ID ${courseId} updated successfully`);
            } else {
              res.status(500).send('Failed to update Course');
            }
          } else {
            res.status(404).send('Course not found');
          }
        } catch (error) {
          console.error('Error updating Course by ID:', error);
          res.status(500).send('Internal Server Error');
        }
    }
}
module.exports = courseController;
