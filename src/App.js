import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Custom styles

const QuoteDisplay = ({ quote }) => {
    if (!quote) return null;

    return (
        <div className="quote-display">
            <h2>Quote Information</h2>
            <p><strong>Symbol:</strong> {quote.symbol}</p>
            <p><strong>Price:</strong> ${quote.regularMarketPrice.toFixed(2)}</p>
            <p><strong>Market Cap:</strong> ${quote.marketCap ? quote.marketCap.toLocaleString() : 'N/A'}</p>
            <p><strong>P/E Ratio:</strong> {quote.trailingPE ? quote.trailingPE.toFixed(2) : 'N/A'}</p>
            <p><strong>Change:</strong> {quote.regularMarketChange} ({quote.regularMarketChangePercent}%)</p>
            {/* Additional metrics can be added here */}
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

            <QuoteDisplay quote={quote} />
        </div>
    );
};

export default App;
