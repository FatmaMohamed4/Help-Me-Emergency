const {Medicine} = require('../models/medicineModel');
const connectDB = require('../connectDB');

class medicineController {
    static getAllMedicine = async(req,res)=> {
        try {
            const db = await connectDB();
            const collection = db.collection('medicine');
            const result = await collection.find().toArray();
            console.log(result);
            res.json(result);
          } catch (error) {
            console.error('Error reading medicines:', error);
            res.status(500).send('Internal Server Error');
          }
    }

    static getOneMedicineById = async (req, res) => {
    try {
        const db = await connectDB();
        const collection = db.collection('medicine');

        const medicineID = +req.params.id;
        const result = await collection.findOne({ medicineID: medicineID });

        if (result) {
            res.header('Content-Type', 'application/json');
            // Send the result as a JSON object with indentation for better readability
            res.send(JSON.stringify(result, null, 2));
        } else {
            res.status(404).send('Medicine not found');
        }
    } catch (error) {
        console.error('Error reading medicine by ID:', error);
        res.status(500).send('Internal Server Error');
    }
     }

    static createMedicine = async (req,res) =>{
        try {
            const db = await connectDB();
            const collection = db.collection('medicine');

            const newMedicineData = req.body;
        
        
              const existingMedicine = await collection.findOne({ medicineID: newMedicineData.id });
        
              if (existingMedicine) {
                  res.send(`Medicine with ID ${newMedicineData.id} already exists.`);
              } else {
                 const result = await collection.insertOne(newMedicineData);
                 if (result){
                  res.send('created');
                  } else {
                  res.send('failed');
                }
            console.log(result);
            
          } 
        }catch (error) {
            console.error('Error creating new medicine:', error);
            res.status(500).send('Internal Server Error');
          }
    }

    static deleteMedicineById =async (req, res) => {
      try {
          const db = await connectDB();
          const collection = db.collection('medicine');
          const medicineID = parseInt(req.params.id);

          const result = await collection.deleteOne({ medicineID: medicineID });
      
          if (result.deletedCount > 0) {
            res.status(200).send('medicine deleted successfully');
          } else {
            res.status(404).send('medicine not found');
          }
        } catch (error) {
          console.error('Error deleting medicine by ID:', error);
          res.status(500).send('Internal Server Error');
        }
 }

//  static updateMedicine = async (req, res) => {
//   try {
//     const db = await connectDB();
//     const collection = db.collection('medicine');

//     // Extract the ID parameter from the request URL
//     const medicineID = +req.params.id;

//     // Extract the new name from the request body
//     const {medicineName } = req.body;
    
//     // Check if the emergency with the given ID exists
//     const existingMedicine = await collection.findOne({ id: medicineID });

//     if (existingMedicine) {
//       // Update the name of the existing emergency
//       const result = await collection.updateOne(
//         { id: medicineID },
//         { $set: {id :medicineID , medicineName: medicineName } }
//       );

//       if (result.modifiedCount > 0) {
//         res.status(200).send(`medicine with ID ${medicineID} updated successfully`);
//       } else {
//         res.status(500).send('Failed to update medicine');
//       }
//     } else {
//       res.status(404).send('medicine not found');
//     }
//   } catch (error) {
//     console.error('Error updating medicine by ID:', error);
//     res.status(500).send('Internal Server Error');
//   }
// }
}


module.exports = medicineController ;