import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 



const QuoteDisplay = ({ quote }) => {
    if (!quote || !quote.price) return null;

    return (

        <div className="quote-display">
            <div className="quote-display">
            <h2>Quote Information</h2>
            <h3>{quote.name}</h3>
            <p><strong>Price:</strong> ${quote.price.toFixed(2)}</p>
        </div>

    <p>
        <strong>Market Cap:</strong> ${quote.marketCap.toLocaleString()}
        <span className="tooltip-container">
            <i className="info-icon">i</i>
            <span className="tooltip-text">
                Market Cap is calculated as the product of outstanding shares and the current price.
            </span>
        </span>
    </p>

    <p>
        <strong>P/E Ratio:</strong> {quote.pe ? quote.pe.toFixed(2) : 'N/A'}
        <span className="tooltip-container">
            <i className="info-icon">i</i>
            <span className="tooltip-text">
                P/E Ratio (Price-to-Earnings) measures a company's current share price relative to its earnings per share.
            </span>
        </span>
    </p>

    <p>
        <strong>EPS:</strong> ${quote.eps ? quote.eps.toFixed(2) : 'N/A'}
        <span className="tooltip-container">
            <i className="info-icon">i</i>
            <span className="tooltip-text">
                EPS (Earnings Per Share) is the portion of a company's profit allocated to each outstanding share of common stock.
            </span>
        </span>
    </p>

    <p>
        <strong>52 Week Range:</strong> ${quote.yearLow.toFixed(2)} - ${quote.yearHigh.toFixed(2)}
        <span className="tooltip-container">
            <i className="info-icon">i</i>
            <span className="tooltip-text">
                The highest and lowest price of the stock in the past 52 weeks.
            </span>
        </span>
    </p>

    <p>
        <strong>Day Range:</strong> ${quote.dayLow.toFixed(2)} - ${quote.dayHigh.toFixed(2)}
        <span className="tooltip-container">
            <i className="info-icon">i</i>
            <span className="tooltip-text">
                The highest and lowest price of the stock during the current trading day.
            </span>
        </span>
    </p>

    <p>
        <strong>Open:</strong> ${quote.open.toFixed(2)}
        <span className="tooltip-container">
            <i className="info-icon">i</i>
            <span className="tooltip-text">
                The price at which the stock opened trading for the day.
            </span>
        </span>
    </p>

    <p>
        <strong>Previous Close:</strong> ${quote.previousClose.toFixed(2)}
        <span className="tooltip-container">
            <i className="info-icon">i</i>
            <span className="tooltip-text">
                The stock's closing price from the previous trading day.
            </span>
        </span>
    </p>

    <p>
        <strong>Volume:</strong> {quote.volume.toLocaleString()}
        <span className="tooltip-container">
            <i className="info-icon">i</i>
            <span className="tooltip-text">
                The total number of shares traded during the current trading session.
            </span>
        </span>
    </p>

    <p>
        <strong>Average Volume:</strong> {quote.avgVolume.toLocaleString()}
        <span className="tooltip-container">
            <i className="info-icon">i</i>
            <span className="tooltip-text">
                The average number of shares traded per day over a specified period.
            </span>
        </span>
    </p>

    <p>
        <strong>Change:</strong> ${quote.change.toFixed(2)} ({quote.changesPercentage.toFixed(2)}%)
        <span className="tooltip-container">
            <i className="info-icon">i</i>
            <span className="tooltip-text">
                The difference between the current price and the previous close price, both in value and percentage.
            </span>
        </span>
    </p>

    <p>
        <strong>Exchange:</strong> {quote.exchange}
        <span className="tooltip-container">
            <i className="info-icon">i</i>
            <span className="tooltip-text">
                The stock exchange where the company is listed, e.g., NYSE or NASDAQ.
            </span>
        </span>
    </p>

    <p>
        <strong>Earnings Announcement:</strong> {new Date(quote.earningsAnnouncement).toLocaleString()}
        <span className="tooltip-container">
            <i className="info-icon">i</i>
            <span className="tooltip-text">
                The date and time when the company is scheduled to announce its financial earnings.
            </span>
        </span>
    </p>

    <p>
        <strong>Shares Outstanding:</strong> {quote.sharesOutstanding.toLocaleString()}
        <span className="tooltip-container">
            <i className="info-icon">i</i>
            <span className="tooltip-text">
                The total number of shares of stock that are currently owned by shareholders.
            </span>
        </span>
    </p>

    <p>
        <strong>Timestamp:</strong> {new Date(quote.timestamp * 1000).toLocaleString()}
        <span className="tooltip-container">
            <i className="info-icon">i</i>
            <span className="tooltip-text">
                The time when the stock data was last updated.
            </span>
        </span>
    </p>
</div>

    );
};


// const App = () => {
//     const [symbol, setSymbol] = useState('');
//     const [quote, setQuote] = useState(null);

//     const fetchQuote = async () => {
//         try {
//             const response = await axios.get(`https://backend-stock-analysis.onrender.com/quote/${symbol}`);
//             console.log("Quote response:", response.data);
//             setQuote(response.data);
//         } catch (error) {
//             console.error("Error fetching quote:", error);
//             setQuote(null);
//         }
//     };

    // const fetchQuote = async (symbol) => {
    //     try {
    //         // Replace with your backend server URL
    //         const response = await fetch(`http://localhost:3001/${symbol}`);
    //         const data = await response.json();
    
    //         if (!response.ok) {
    //             throw new Error(data.error || 'Failed to fetch stock data');
    //         }
    
    //         return data;
    //     } catch (error) {
    //         console.error('Error fetching stock data:', error);
    //         return null;
    //     }
    // };
    
    

//     return (
//         <div className="app">
//             <h1>Stock Analysis</h1>
//             <input
//                 type="text"
//                 value={symbol}
//                 onChange={(e) => setSymbol(e.target.value)}
//                 placeholder="Enter stock symbol"
//             />
//             <button onClick={fetchQuote}>Get Quote</button>

//             <QuoteDisplay quote={quote} />
//         </div>
//     );
// };

// export default App;

const App = () => {
    const [symbol, setSymbol] = useState('');
    const [quote, setQuote] = useState(null); // Default state is null
    const [loading, setLoading] = useState(false); // Loading state for fetching quote

    const fetchQuote = async () => {
        if (!symbol) {
            console.log("Please enter a stock symbol.");
            return;
        }

        setLoading(true);  // Start loading
        try {
            const response = await axios.get(`https://backend-stock-analysis.onrender.com/api/quote/${symbol}`);
            console.log("Quote response:", response.data);
            setQuote(response.data); // Set quote data from the backend
        } catch (error) {
            console.error("Error fetching quote:", error);
            setQuote(null); // Set null if error occurs
        }
        setLoading(false); // Stop loading
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
            <button onClick={fetchQuote} disabled={loading}>Get Quote</button>

            {/* Show loading message when fetching data */}
            {loading && <p>Loading...</p>}

            {/* Display quote or error message */}
            <QuoteDisplay quote={quote} />
        </div>
    );
};

export default App;