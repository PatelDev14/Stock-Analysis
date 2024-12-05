import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 



const QuoteDisplay = ({ quote }) => {
    if (!quote) return null;

    return (
        // <div className="quote-display">
        //     <h2>Quote Information</h2>
        //     <h3>{quote.name} ({quote.symbol})</h3>
        //     <p><strong>Price:</strong> ${quote.price.toFixed(2)}</p>

            
        //     <p><strong>Market Cap:</strong> ${quote.marketCap.toLocaleString()}
        //         <span className="tooltip-container">
        //             <i className="info-icon">i</i>
        //         <span className="tooltip-text">Market Cap is calculated as the product of outstanding shares and the current price.</span>
        //         </span>
        //     </p>

        //     <p><strong>P/E Ratio:</strong> {quote.pe ? quote.pe.toFixed(2) : 'N/A'}</p>
        //     <p><strong>EPS:</strong> ${quote.eps ? quote.eps.toFixed(2) : 'N/A'}</p>
        //     <p><strong>52 Week Range:</strong> ${quote.yearLow.toFixed(2)} - ${quote.yearHigh.toFixed(2)}</p>
        //     <p><strong>Day Range:</strong> ${quote.dayLow.toFixed(2)} - ${quote.dayHigh.toFixed(2)}</p>
        //     <p><strong>Open:</strong> ${quote.open.toFixed(2)}</p>
        //     <p><strong>Previous Close:</strong> ${quote.previousClose.toFixed(2)}</p>
        //     <p><strong>Volume:</strong> {quote.volume.toLocaleString()}</p>
        //     <p><strong>Average Volume:</strong> {quote.avgVolume.toLocaleString()}</p>
        //     <p><strong>Change:</strong> ${quote.change.toFixed(2)} ({quote.changesPercentage.toFixed(2)}%)</p>
        //     <p><strong>Exchange:</strong> {quote.exchange}</p>
        //     <p><strong>Earnings Announcement:</strong> {new Date(quote.earningsAnnouncement).toLocaleString()}</p>
        //     <p><strong>Shares Outstanding:</strong> {quote.sharesOutstanding.toLocaleString()}</p>
        //     <p><strong>Timestamp:</strong> {new Date(quote.timestamp * 1000).toLocaleString()}</p>
        // </div>

        <div className="quote-display">
    <h2>Quote Information</h2>
    <h3>{quote.name}</h3>
    
    <p><strong>Price:</strong> ${quote.price.toFixed(2)}</p>

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