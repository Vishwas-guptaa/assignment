const axios = require('axios');
const Exchange = require('../modals/exchange');

class ExchangeControoler{
static fetchAndStoreExchangeData = async (req, res) => {
  try {
    // Fetch exchange names
    const exchangesResponse = await axios.get('https://rest.coinapi.io/v1/exchanges', {
      headers: {
        'X-CoinAPI-Key': 'FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9', // Replace with your actual API key
      },
    });

    const exchangeNames = exchangesResponse.data.map(exchange => ({
      name: exchange.name,
    }));

    // Fetch exchange icons
    const iconsResponse = await axios.get('https://rest.coinapi.io/v1/exchanges/icons/32', {
      headers: {
        'X-CoinAPI-Key': 'FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9', // Replace with your actual API key
      },
    });

    const exchangeIcons = iconsResponse.data.map(exchange => ({
      name: exchange.exchange_id,
      iconUrl: exchange.url,
    }));

    const combinedData = exchangeNames.map((exchange, index) => ({
      ...exchange,
      iconUrl: exchangeIcons[index] ? exchangeIcons[index].iconUrl : null,
    }));
    
    // Store data in the database
    await Exchange.insertMany(combinedData);

    res.json({ success: true, message: 'Exchange data stored successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Error fetching or storing data: ${error.message}` });
  }
}

static exchangeList =async(req,res) =>{
  try {
    const { page = 1, pageSize = 10, filter } = req.query;

    // Build the filter object based on the user's input
    const filterObject = filter ? { name: { $regex: new RegExp(filter, 'i') } } : {};

    // Fetch paginated exchange data with filtering
    const query = Exchange.find(filterObject)
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize))
      .select('name iconUrl');

    const exchanges = await query;

    res.json({ success: true, data: exchanges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching exchange data.' });
  
};
}
}
module.exports = ExchangeControoler