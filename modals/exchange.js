const mongoose = require('mongoose');

const exchangeSchema = new mongoose.Schema({
  
  name: String,
  iconUrl: String,

  // Add more fields as needed
});


module.exports = mongoose.model('Exchange', exchangeSchema);