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


app.get('/quote/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    console.log(`Fetching quote for symbol: ${symbol}`); // Log the requested symbol
    try {
        const quote = await yahooFinance.quote(symbol);
        console.log('Quote fetched:', quote); // Log the fetched quote

        // Extract the necessary financial metrics
        const response = {
            symbol: quote.symbol,
            regularMarketPrice: quote.regularMarketPrice,
            marketCap: quote.marketCap,
            trailingPE: quote.trailingPE,
            regularMarketChange: quote.regularMarketChange,
            regularMarketChangePercent: quote.regularMarketChangePercent,
            priceBook: quote.priceBook, // Price/Book ratio
            priceSales: quote.priceSales, // Price/Sales ratio
            pegRatio: quote.pegRatio, // PEG Ratio
            fiftyDayAverage: quote.fiftyDayAverage, // 50-day moving average
            twoHundredDayAverage: quote.twoHundredDayAverage, // 200-day moving average
            profitMargin: quote.profitMargin, // Profit Margin
            revenue: quote.revenue, // Revenue
            ebitda: quote.ebitda, // EBITDA
            eps: quote.eps, // Earnings Per Share
            currentRatio: quote.currentRatio, // Current Ratio
        };

        res.json(response); // Return the structured response
    } catch (error) {
        console.error("Error fetching quote:", error); // Log the error
        res.status(500).json({ error: 'Failed to fetch quote' });
    }
});

// Endpoint to fetch the balance sheet
app.get('/balance-sheet/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    console.log(`Fetching balance sheet for symbol: ${symbol}`);
    try {
        const balanceSheet = await yahooFinance.balanceSheet(symbol);
        console.log('Balance sheet fetched:', balanceSheet);
        res.json(balanceSheet);
    } catch (error) {
        console.error("Error fetching balance sheet:", error);
        res.status(500).json({ error: 'Failed to fetch balance sheet' });
    }
});

// Endpoint to fetch the cash flow statement
app.get('/cash-flow/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    console.log(`Fetching cash flow for symbol: ${symbol}`);
    try {
        const cashFlow = await yahooFinance.cashFlow(symbol);
        console.log('Cash flow fetched:', cashFlow);
        res.json(cashFlow);
    } catch (error) {
        console.error("Error fetching cash flow:", error);
        res.status(500).json({ error: 'Failed to fetch cash flow' });
    }
});




app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port} and CORS is enabled`);
});
