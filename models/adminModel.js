const mongoose = require('mongoose'); 

const adminSchema = new mongoose.Schema({
  id : Number ,
  email : String ,
  password :String,
  confirmPassword :String
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = {Admin};