// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// require('dotenv').config();

// const app = express();
// // const port = process.env.PORT || 3001;
// const port = process.env.PORT || 8080;  // Or use just process.env.PORT



// const FMP_API_KEY = process.env.FMP_API_KEY;


// // Middleware
// app.use(cors());
// app.use(express.json());


// // Root route
// app.get('/', (req, res) => {
//     res.send('Welcome to the Stock Analysis API!');
// });

// // Fetch stock quotes
// app.get('/quote/:symbol', async (req, res) => {
//     const symbol = req.params.symbol;
//     try {
//         const apiUrl = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${FMP_API_KEY}`;
//         console.log(`Fetching data from: ${apiUrl}`);
        
//         const response = await axios.get(apiUrl);
        
//         if (!response.data || response.data.length === 0) {
//             return res.status(404).json({ error: 'No data found for the given symbol' });
//         }

//         const quote = response.data[0];
//         res.json(quote);

//     } catch (error) {
//         console.error("Error fetching quote:", error.message);
//         if (error.response) {
//             console.error("Error status:", error.response.status);
//             console.error("Error data:", error.response.data);
//         }
//         res.status(500).json({ error: 'Failed to fetch quote', details: error.message });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });


const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

const FMP_API_KEY = process.env.FMP_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the frontend build folder
app.use(express.static(path.join(__dirname, '..', 'build')));

// Root route (for API test)
app.get('/api', (req, res) => {
    res.send('Welcome to the Stock Analysis API!');
});

// Fetch stock quotes
// app.get('/api/quote/:symbol', async (req, res) => {
//     const symbol = req.params.symbol;
//     try {
//         const apiUrl = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${FMP_API_KEY}`;
//         console.log(`Fetching data from: ${apiUrl}`);
        
//         const response = await axios.get(apiUrl);
        
//         if (!response.data || response.data.length === 0) {
//             return res.status(404).json({ error: 'No data found for the given symbol' });
//         }

//         const quote = response.data[0];
//         res.json(quote);

//     } catch (error) {
//         console.error("Error fetching quote:", error.message);
//         if (error.response) {
//             console.error("Error status:", error.response.status);
//             console.error("Error data:", error.response.data);
//         }
//         res.status(500).json({ error: 'Failed to fetch quote', details: error.message });
//     }
// });

// Fetch stock quotes by symbol or name
// Fetch stock quotes by symbol or company name

app.get('/api/historical/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        // Fetch historical key metrics
        const metricsUrl = `https://financialmodelingprep.com/api/v3/historical-key-metrics/${symbol}?limit=10&apikey=${FMP_API_KEY}`;
        const metricsResponse = await axios.get(metricsUrl);

        // Fetch historical stock prices
        const pricesUrl = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${FMP_API_KEY}`;
        const pricesResponse = await axios.get(pricesUrl);

        if (!metricsResponse.data || !pricesResponse.data) {
            return res.status(404).json({ error: 'No historical data found for the given symbol' });
        }

        // Extract and structure data for the frontend
        const historicalMetrics = metricsResponse.data.historical || [];
        const historicalPrices = pricesResponse.data.historical || [];

        const data = {
            eps: historicalMetrics.map((item) => ({
                date: item.date,
                value: item.eps,
            })),
            peRatio: historicalMetrics.map((item) => ({
                date: item.date,
                value: item.peRatio,
            })),
            prices: historicalPrices.map((item) => ({
                date: item.date,
                close: item.close,
            })),
        };

        res.json(data);
    } catch (error) {
        console.error("Error fetching historical data:", error.message);
        if (error.response) {
            console.error("Error status:", error.response.status);
            console.error("Error data:", error.response.data);
        }
        res.status(500).json({ error: 'Failed to fetch historical data', details: error.message });
    }
});



// Catch-all route to serve frontend files
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});