const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { MongoClient } = require('mongodb');
dotenv.config({ path: 'config.env' });
const ObjectId= require('mongodb');
const app = express();
const PORT = process.env.PORT;

// Start the server &server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

  
// Middleware setup
app.use(morgan('dev'));
app.use(bodyParser.json());

// // Serve static files
// app.use(express.static(path.join(__dirname, 'images')));
// app.use(express.static(path.join(__dirname, 'assets')));

app.use('/api', require('./routes(links)/authRoute'));

app.use('/api/course', require('./routes(links)/courseRoute'));

app.use('/api/emergency', require('./routes(links)/emergencyRoute'));

app.use('/api/medicine', require('./routes(links)/medicineRoute'));

app.use ('/api/admin', require('./routes(links)/adminRoute'));

app.use ('/api/history', require ('./routes(links)/historyRoute'));

app.use ('/api/patient', require ('./routes(links)/patientRoute'));