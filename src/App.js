import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Custom styles

// const QuoteDisplay = ({ quote }) => {
//     if (!quote) return null;

//     return (
//         <div className="quote-display">
//             <h2>Quote Information</h2>
//             <h3>{quote.name}</h3>
//             <p><strong>Symbol:</strong> {quote.symbol}</p>
//             <p><strong>Price:</strong> ${quote.price.toFixed(2)}</p>
//             <p><strong>Market Cap:</strong> ${quote.marketCap.toLocaleString()}</p>
//             <p><strong>P/E Ratio:</strong> {quote.pe.toFixed(2)}</p>
//             <p><strong>EPS:</strong> ${quote.eps.toFixed(2)}</p>
//             <p><strong>52 Week Range:</strong> ${quote.yearLow.toFixed(2)} - ${quote.yearHigh.toFixed(2)}</p>
//             <p><strong>Volume:</strong> {quote.volume.toLocaleString()}</p>
//             <p><strong>Change:</strong> ${quote.change.toFixed(2)} ({quote.changesPercentage.toFixed(2)}%)</p>
//         </div>
//     );
// };

const QuoteDisplay = ({ quote }) => {
    if (!quote) return null;

    return (
        <div className="quote-display">
            <h2>Quote Information</h2>
            <h3>{quote.name} ({quote.symbol})</h3>
            <p><strong>Price:</strong> ${quote.price.toFixed(2)}</p>
            <p><strong>Market Cap:</strong> ${quote.marketCap.toLocaleString()}</p>
            <p><strong>P/E Ratio:</strong> {quote.pe ? quote.pe.toFixed(2) : 'N/A'}</p>
            <p><strong>EPS:</strong> ${quote.eps ? quote.eps.toFixed(2) : 'N/A'}</p>
            <p><strong>52 Week Range:</strong> ${quote.yearLow.toFixed(2)} - ${quote.yearHigh.toFixed(2)}</p>
            <p><strong>Day Range:</strong> ${quote.dayLow.toFixed(2)} - ${quote.dayHigh.toFixed(2)}</p>
            <p><strong>Open:</strong> ${quote.open.toFixed(2)}</p>
            <p><strong>Previous Close:</strong> ${quote.previousClose.toFixed(2)}</p>
            <p><strong>Volume:</strong> {quote.volume.toLocaleString()}</p>
            <p><strong>Average Volume:</strong> {quote.avgVolume.toLocaleString()}</p>
            <p><strong>Change:</strong> ${quote.change.toFixed(2)} ({quote.changesPercentage.toFixed(2)}%)</p>
            <p><strong>Exchange:</strong> {quote.exchange}</p>
            <p><strong>Earnings Announcement:</strong> {new Date(quote.earningsAnnouncement).toLocaleString()}</p>
            <p><strong>Shares Outstanding:</strong> {quote.sharesOutstanding.toLocaleString()}</p>
            <p><strong>Timestamp:</strong> {new Date(quote.timestamp * 1000).toLocaleString()}</p>
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