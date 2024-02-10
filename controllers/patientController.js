const Patient = require('../models/patientModel');
const connectDB = require('../connectDB');

class patientController {

    static getAllPatient= async (req, res) => {
        try {
            const db = await connectDB();
            const collection = db.collection('patient');
            const result = await collection.find().toArray();
            console.log(result);
            res.json(result);
          } catch (error) {
            console.error('Error reading patient:', error);
            res.status(500).send('Internal Server Error');
          }
    }

    static  getPatientById =async (req, res) => {
        try {
                const db = await connectDB();
                const collection = db.collection('patient');

                const id = +req.params.id;
            
                // Query the collection for the specific emergency with the given ID
                const result = await collection.findOne({ id: id });
            
                if (result) {
                  res.header('Content-Type', 'application/json');
 
                  res.send(JSON.stringify(result, null, 2));
                } else {
                  res.status(404).send('Patient not found');
                }
              } catch (error) {
                console.error('Error reading Patient by ID:', error);
                res.status(500).send('Internal Server Error');
              }
      }
    
    static createPatient = async (req, res) => {
      try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).send(patient);
      } catch (error) {
        res.status(400).send(error);
      }
    }

}
module.exports = patientController ;