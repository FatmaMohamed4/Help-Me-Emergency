// controllers/emergencyController.js
const Emergency = require('../models/emergencyModel');
const connectDB = require('../connectDB');

class emergencyController {
   static getAll= async (req, res) => {
    try {
        const db = await connectDB();
        const collection = db.collection('emergency');
        const result = await collection.find().toArray();
      
        res.json(result);
      } catch (error) {
        console.error('Error reading emergencies:', error);
        res.status(500).send('Internal Server Error');
      }
    }

   static  getById= async (req, res) => {
    try {
        const db = await connectDB();
        const collection = db.collection('emergency');
    
        // Extract the ID parameter from the request URL
        const emergencyId = parseInt(req.params.id);
    
        // Query the collection for the specific emergency with the given ID
        const result = await collection.findOne({ id: emergencyId });
    
        if (result) {
          // Set Content-Type header to application/json
          res.header('Content-Type', 'application/json');
    
          // Send the result as a JSON object with indentation for better readability
          res.send(JSON.stringify(result, null, 2));
        } else {
          res.status(404).send('Emergency not found');
        }
      } catch (error) {
        console.error('Error reading emergency by ID:', error);
        res.status(500).send('Internal Server Error');
      }
    }

    static create= async (req, res) => {
        try {
            const db = await connectDB();
            const collection = db.collection('emergency');
        
            // Extract emergency data from the request body
            const newEmergencyData = req.body;
        
            // Check if the course ID already exists
            const existingEmergency = await collection.findOne({ id: newEmergencyData.id });
      
            if (existingEmergency) {
                // Emergency ID exists
                res.send(`Emergency with ID ${newEmergencyData.id} already exists.`);
            } else {
                // Course ID doesn't exist, create a new course
                const result = await collection.insertOne(newEmergencyData);
      
            if (result){
              res.send('created');
            } else {
              res.send('failed');
            }
            console.log(result);
          
          }
      } catch (error) {
            console.error('Error creating new emergency:', error);
            res.status(500).send('Internal Server Error');
          }
    }

    static deleteById =async (req, res) => {
        try {
            const db = await connectDB();
            const collection = db.collection('emergency');
        
            // Extract the ID parameter from the request URL
            const emergencyId = parseInt(req.params.id);
        
            // Delete the emergency with the given ID
            const result = await collection.deleteOne({ id: emergencyId });
        
            if (result.deletedCount > 0) {
              res.status(200).send('Emergency deleted successfully');
            } else {
              res.status(404).send('Emergency not found');
            }
          } catch (error) {
            console.error('Error deleting emergency by ID:', error);
            res.status(500).send('Internal Server Error');
          }
   }

    static updateOneEmergency  = async (req, res) => {
        //update id and state 
        try {
          const db = await connectDB();
          const collection = db.collection('emergency');
    
          // Extract the ID parameter from the request URL
          const emergencyId = parseInt(req.params.id);
    
          // Extract the new name from the request body
          const { state } = req.body;
          const {id} = req.body ;
          // Check if the emergency with the given ID exists
          const existingEmergency = await collection.findOne({ id: emergencyId });
    
          if (existingEmergency) {
            // Update the name of the existing emergency
            const result = await collection.updateMany(
              { id: emergencyId },
              { $set: {id :id , state: state } }
            );
    
            if (result.modifiedCount > 0) {
              res.status(200).send(`Emergency with ID ${emergencyId} updated successfully`);
            } else {
              res.status(500).send('Failed to update emergency');
            }
          } else {
            res.status(404).send('Emergency not found');
          }
        } catch (error) {
          console.error('Error updating emergency by ID:', error);
          res.status(500).send('Internal Server Error');
        }
      }
}

module.exports = emergencyController;
