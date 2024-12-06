const functions = require("firebase-functions");
const axios = require("axios");

exports.getStockQuote = functions.https.onRequest(async (req, res) => {
  const {symbol} = req.query;
  const FMP_API_KEY = "6Llqcp1uApVi1TrTf8Yjw3OjvbMYFLQf";
  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${FMP_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

