const mongoose = require('mongoose');

const exchangeSchema = new mongoose.Schema({
  
  name: String,
  iconUrl: String,

});


module.exports = mongoose.model('Exchange', exchangeSchema);