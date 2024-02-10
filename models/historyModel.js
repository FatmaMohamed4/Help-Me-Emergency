const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId ;

const historySchema = new mongoose.Schema({
  patientId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Patient', required: true 
    },
  chronicDiseases : String ,
  allergy :Array,
  surgery :Array
});

const History = mongoose.model('History', historySchema);

module.exports = {History};