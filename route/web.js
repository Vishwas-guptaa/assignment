const express = require('express')
const ExchangeControoler = require('../controller/EchangesController')

const route = express.Router()

 route.get('/fetchExchanges',ExchangeControoler.fetchAndStoreExchangeData);
 route.get('/exchangeList',ExchangeControoler.exchangeList);
module.exports = route