const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
        id: 
        {
          type : Number,
          required:true,
          unique:true
        } ,
        image: String,
        video:String,
        courseName: {
          type: String ,
          required :[true,'Course name is required'] ,
          minlength :[3,'Course name is too short'],
          maxlengtg :[25,'Course name is too long'],
        },
        evaluation:  Number,
        patientId: Number,
        
      
});

const Course = mongoose.model('Course', courseSchema);

module.exports = {Course};