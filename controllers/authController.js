const {Patient} = require ('../models/patientModel');
const connectDB = require ('../connectDB');
const bcrypt = require('bcryptjs');
const {validationResult} =require ('express-validator');

class authController {
     static register =  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()){
       res.json (errors.array())
      }else {
        try {
          const db = await connectDB();
          const collection = db.collection('patient');
      
          const {name,email, password,confirmPassword,gender,phone,photo,location,qr } = req.body;
      
          // Check if the patient with the given email already exists
          const existingEmail = await collection.findOne({ email });
          if (existingEmail) {
            return res.status(409).json({ error: 'User with this email already exists' });
          }
         
          const existingPhone = await collection.findOne({ phone });
          if (existingPhone) {
            return res.status(409).json({ error: 'This phone already exists' });
          }
          // Hash the password before storing it in the database
          const hashedPassword = await bcrypt.hash(password, 10);
          // Create a new patient object with the hashed password
          const newPatient = {
            name,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            gender,
            phone,
            photo,
            location,
            qr
          };
            if (password !=confirmPassword ) {
            return res.status(401).json({ error: 'enter password again' });
          } 
          // Insert the new patient into the database
          await collection.insertOne(newPatient);
      
          res.status(201).json({ message: 'Registration successful' });
      
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
      } 

     static logIn = async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()){
       res.json (errors.array())
      }else {
        try {
          const db = await connectDB();
          const collection = db.collection('patient');
      
          const { email, password } = req.body;
      
          // Check if the patient with the given email exists
          const patient = await collection.findOne({ email });
      
          if (!patient) {
            return res.status(401).json({ error: 'Invalid email' });
          }
      
          // Use bcrypt to compare the provided password with the hashed password stored in the database
          const isPasswordValid = await bcrypt.compare(password, patient.password);
      
          if (!isPasswordValid ) {
            return res.status(401).json({ error: 'Invalid password' });
          }
      
          // You might generate a token here and send it back to the client for authentication in future requests
          // For simplicity, let's just send a success message
          res.status(200).json("Login done");
      
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
      }         
}
module.exports = authController ;