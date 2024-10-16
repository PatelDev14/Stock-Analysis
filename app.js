const express = require('express');
const yahooFinance = require('yahoo-finance2').default;
const cors = require('cors'); // Optional, for CORS

const app = express();
const port = 3000;

// Middleware for serving static files from the 'public' folder
app.use(express.static('public'));
app.use(cors()); // Optional, to enable CORS

// Route for getting stock quotes
app.get('/quote/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        const quote = await yahooFinance.quote(symbol);
        console.log("Quote data:", quote); // Log data for troubleshooting
        res.json(quote);
    } catch (error) {
        console.error("Error fetching quote:", error.message);
        res.status(500).json({ error: 'Failed to fetch quote' });
    }
});

// Route for getting financial statements
app.get('/financials/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        const ticker = await yahooFinance.search(symbol);
        const quote = await yahooFinance.quote(symbol);
        
        // Fetch financial data
        const financialData = await yahooFinance.quoteSummary(symbol, {
            modules: ['balanceSheetHistory', 'cashflowStatementHistory', 'incomeStatementHistory']
        });

        console.log('Financial Data:', JSON.stringify(financialData, null, 2));

        const formattedData = {
            balanceSheet: formatFinancialStatement(financialData.balanceSheetHistory?.balanceSheetStatements),
            cashflowStatement: formatFinancialStatement(financialData.cashflowStatementHistory?.cashflowStatements),
            incomeStatement: formatFinancialStatement(financialData.incomeStatementHistory?.incomeStatementHistory)
        };

        res.json(formattedData);
    } catch (error) {
        console.error("Error fetching financials:", error.message);
        res.status(500).json({ error: 'Failed to fetch financial data: ' + error.message });
    }
});

function formatFinancialStatement(statements) {
    if (!statements || !Array.isArray(statements) || statements.length === 0) {
        return { 'No data available': 'N/A' };
    }

    const latestStatement = statements[0];
    const formattedStatement = {};

    for (const [key, value] of Object.entries(latestStatement)) {
        if (typeof value === 'number') {
            formattedStatement[key] = `$${(value / 1e6).toFixed(2)} Million`;
        } else if (value !== null && value !== undefined) {
            formattedStatement[key] = value.toString();
        }
    }

    return formattedStatement;
}