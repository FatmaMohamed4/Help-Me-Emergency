const connectDB = require ('../connectDB');
const bcrypt = require('bcryptjs');
const {Admin} = require ('../models/adminModel') ;
const {ValidationResult, validationResult} =require ('express-validator');

class adminController {
    static getAllAdmins =async (req, res) => {
        try {
          const db = await connectDB();
          const collection = db.collection('admin');
          const result = await collection.find().toArray();
          console.log(result);
          res.json(result);
        } catch (error) {
          console.error('Error reading admins:', error);
          res.status(500).send('Internal Server Error');
        }
        }

    static registerAdmin =  async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
         res.json (errors.array())
        }else {
          try {
            const db = await connectDB();
            const collection = db.collection('admin');
        
            const {id ,email, password , confirmPassword} = req.body;
        
            // Check if the patient with the given email already exists
            const existingEmail = await collection.findOne({ email });
            if (existingEmail) {
              return res.status(409).json({ error: 'Admin with this email already exists' });
            }
           
            const existingID = await collection.findOne({ id });
            if (existingID) {
              return res.status(409).json({ error: 'This Admin ID already exists' });
            }
            // Hash the password before storing it in the database
            const hashedPassword = await bcrypt.hash(password,4);
            // Create a new object with the hashed password
            const newPatient = {
              id,
              email,
              password: hashedPassword,
              confirmPassword: hashedPassword,
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

    static logInAdmin =  async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
         res.json (errors.array())
        }else {
          try {
            const db = await connectDB();
            const collection = db.collection('admin');
        
            const { email, password } = req.body;
        
            // Check if the patient with the given email exists
            const admin = await collection.findOne({ email });
        
            if (!admin) {
              return res.status(401).json({ error: 'Invalid email' });
            }
        
            // Use bcrypt to compare the provided password with the hashed password stored in the database
            const isPasswordValid = await bcrypt.compare(password, admin.password);
        
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
    

module.exports= adminController ;