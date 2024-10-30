const express = require('express');
const cors = require('cors');
const yahooFinance = require('yahoo-finance2').default;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001; // Use environment variable or default to 3001

// Middleware for CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Stock Analysis API!');
});

// Route for fetching stock quotes
app.get('/quote/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    console.log(`Fetching quote for symbol: ${symbol}`); // Log the requested symbol
    try {
        const quote = await yahooFinance.quote(symbol);
        console.log('Quote fetched:', quote); // Log the fetched quote
        res.json(quote);
    } catch (error) {
        console.error("Error fetching quote:", error); // Log the error
        res.status(500).json({ error: 'Failed to fetch quote' });
    }
});

// Route for fetching financial statements
app.get('/financials/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        const balanceSheet = await yahooFinance.balanceSheet(symbol);
        const cashflowStatement = await yahooFinance.cashflowStatement(symbol);
        res.json({ balanceSheet, cashflowStatement });
    } catch (error) {
        console.error("Error fetching financial data:", error); // Log the error
        res.status(500).json({ error: 'Failed to fetch financial data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port} and CORS is enabled`);
});
