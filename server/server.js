const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const FMP_API_KEY = process.env.FMP_API_KEY;

// // Debug: Ensure API key is loaded
// if (!FMP_API_KEY) {
//     console.error("FMP_API_KEY is missing! Please check your .env file.");
//     process.exit(1);
// }

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Stock Analysis API!');
});

// Fetch stock quotes
app.get('/quote/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        const apiUrl = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${FMP_API_KEY}`;
        console.log(`Fetching data from: ${apiUrl}`);
        
        const response = await axios.get(apiUrl);
        
        if (!response.data || response.data.length === 0) {
            return res.status(404).json({ error: 'No data found for the given symbol' });
        }

        const quote = response.data[0];
        res.json(quote);

    } catch (error) {
        console.error("Error fetching quote:", error.message);
        if (error.response) {
            console.error("Error status:", error.response.status);
            console.error("Error data:", error.response.data);
        }
        res.status(500).json({ error: 'Failed to fetch quote', details: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
