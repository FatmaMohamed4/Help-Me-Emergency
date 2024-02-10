const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
        id:  Number, 
        state:String,
        image: String,
        fisrtAidSteps: Array,
        vedio: String,
        phone: String
    
});

const Emergency = mongoose.model('Emergency', emergencySchema);

module.exports = {Emergency};