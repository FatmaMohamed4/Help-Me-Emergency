const {History}= require('../models/historyModel');
const {connectDB,ObjectId }= require('../connectDB');
const {Patient} = require ('../models/patientModel');
const mongoose = require('mongoose'); 
  
class historyController {
   static createHistory =async (req,res) => {
         const {patientId,chronicDiseases,allergy,surgery} = req.body;
         const history = await new History ({patientId,chronicDiseases,allergy,surgery}).save() ; 
         if (history) res.json(history)
   }
  
   static getHistory =async (req,res) => { 
      const db = await connectDB();
      const collection = db.collection('histroryOfPatient');

      // const id = req.params.id ;
      // const history = await post.find({_id : id})

      const history = await collection.find()
      res.json (history)
   }
}
module.exports = historyController;
