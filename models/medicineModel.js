const mongoose = require('mongoose');
const medicineSchema = new mongoose.Schema({
    medicineID: Number,
    diseaseName: String,
    medicineName: String,
    expiryDate: String,
    productionDate: String,
    patientName: String
});


const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = {Medicine};