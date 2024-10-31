import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Custom styles

// const QuoteDisplay = ({ quote }) => {
//     if (!quote) return null;

//     return (
//         <div className="quote-display">
//             <h2>Quote Information</h2>
//             <p><strong>Symbol:</strong> {quote.symbol}</p>
//             <p><strong>Price:</strong> ${quote.regularMarketPrice.toFixed(2)}</p>
//             <p><strong>Market Cap:</strong> ${quote.marketCap ? quote.marketCap.toLocaleString() : 'N/A'}</p>
//             <p><strong>P/E Ratio:</strong> {quote.trailingPE ? quote.trailingPE.toFixed(2) : 'N/A'}</p>
//             <p><strong>Change:</strong> {quote.regularMarketChange} ({quote.regularMarketChangePercent}%)</p>
//             {/* Additional metrics can be added here */}
//         </div>
//     );
// };

const QuoteDisplay = ({ quote }) => {
    if (!quote) return null;

    return (
        <div className="quote-display">
            <h2>Quote Information</h2>
            <p><strong>Symbol:</strong> {quote.symbol}</p>
            <p><strong>Price:</strong> ${quote.regularMarketPrice.toFixed(2)}</p>
            <p><strong>Market Cap:</strong> ${quote.marketCap ? quote.marketCap.toLocaleString() : 'N/A'}</p>
            <p><strong>P/E Ratio:</strong> {quote.trailingPE ? quote.trailingPE.toFixed(2) : 'N/A'}</p>
            <p><strong>Price/Book:</strong> {quote.priceBook ? quote.priceBook.toFixed(2) : 'N/A'}</p>
            <p><strong>Price/Sales:</strong> {quote.priceSales ? quote.priceSales.toFixed(2) : 'N/A'}</p>
            <p><strong>PEG Ratio:</strong> {quote.pegRatio ? quote.pegRatio.toFixed(2) : 'N/A'}</p>
            <p><strong>50-day MA:</strong> ${quote.fiftyDayAverage ? quote.fiftyDayAverage.toFixed(2) : 'N/A'}</p>
            <p><strong>200-day MA:</strong> ${quote.twoHundredDayAverage ? quote.twoHundredDayAverage.toFixed(2) : 'N/A'}</p>
            <p><strong>Profit Margin:</strong> {(quote.profitMargin * 100).toFixed(2)}%</p>
            <p><strong>Revenue:</strong> ${quote.revenue ? quote.revenue.toLocaleString() : 'N/A'}</p>
            <p><strong>EBITDA:</strong> ${quote.ebitda ? quote.ebitda.toLocaleString() : 'N/A'}</p>
            <p><strong>EPS:</strong> {quote.eps ? quote.eps.toFixed(2) : 'N/A'}</p>
            <p><strong>Current Ratio:</strong> {quote.currentRatio ? quote.currentRatio.toFixed(2) : 'N/A'}</p>
            <p><strong>Change:</strong> {quote.regularMarketChange} ({quote.regularMarketChangePercent}%)</p>
        </div>
    );
};


const App = () => {
    const [symbol, setSymbol] = useState('');
    const [quote, setQuote] = useState(null);

    const fetchQuote = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/quote/${symbol}`);
            console.log("Quote response:", response.data);
            setQuote(response.data);
        } catch (error) {
            console.error("Error fetching quote:", error);
            setQuote(null);
        }
    };
    
    const fetchFinancialData = async () => {
        try {
            const quoteResponse = await axios.get(`http://localhost:3001/quote/${symbol}`);
            const balanceSheetResponse = await axios.get(`http://localhost:3001/balance-sheet/${symbol}`);
            const cashFlowResponse = await axios.get(`http://localhost:3001/cash-flow/${symbol}`);
    
            console.log("Quote response:", quoteResponse.data);
            console.log("Balance sheet response:", balanceSheetResponse.data);
            console.log("Cash flow response:", cashFlowResponse.data);
    
            setQuote(quoteResponse.data);
            // Set state for balance sheet and cash flow if you create separate states
            // setBalanceSheet(balanceSheetResponse.data);
            // setCashFlow(cashFlowResponse.data);
        } catch (error) {
            console.error("Error fetching financial data:", error);
            setQuote(null);
            // Clear balance sheet and cash flow states if there's an error
        }
    };
    

    return (
        <div className="app">
            <h1>Stock Analysis</h1>
            <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Enter stock symbol"
            />
            <button onClick={fetchQuote}>Get Quote</button>
            <button onClick={fetchFinancialData}>Get Financials</button>

            <QuoteDisplay quote={quote} />
        </div>
    );
};

export default App;
