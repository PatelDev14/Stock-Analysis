const express = require('express');
const yahooFinance = require('yahoo-finance2').default;

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/quote/:symbol', async (req, res) => {
    try {
        const quote = await yahooFinance.quote(req.params.symbol);
        res.json(quote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/financials/:symbol', async (req, res) => {
    try {
        const [balanceSheet, cashFlow, incomeStatement] = await Promise.all([
            yahooFinance.quoteSummary(req.params.symbol, { modules: ["balanceSheetHistory"] }),
            yahooFinance.quoteSummary(req.params.symbol, { modules: ["cashflowStatementHistory"] }),
            yahooFinance.quoteSummary(req.params.symbol, { modules: ["incomeStatementHistory"] })
        ]);
        res.json({
            balanceSheet: balanceSheet.balanceSheetHistory,
            cashFlow: cashFlow.cashflowStatementHistory,
            incomeStatement: incomeStatement.incomeStatementHistory
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Stock analysis app listening at http://localhost:${port}`);
});