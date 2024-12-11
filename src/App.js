import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 
import PopularStocks from './Features/PopularStocks';
import QuoteDisplay from './Features/QuoteDisplay';
import MostActive from './Features/MostActive';
import TopGainers from './Features/TopGainers';
import TopLosers from './Features/TopLosers';
//import StockDetails from './Features/StockDetails';

const App = () => {
    const [symbol, setSymbol] = useState('');
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(false);

    const [openList, setOpenList] = useState(null);

    const fetchQuote = async () => {
        if (!symbol) {
            console.log("Please enter a stock symbol.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`https://backend-stock-analysis.onrender.com/api/quote/${symbol}`);
            console.log("Quote response:", response.data);
            setQuote(response.data);
        } catch (error) {
            console.error("Error fetching quote:", error);
            setQuote(null);
        }
        setLoading(false);
    };

    const handleStockSelect = (selectedSymbol) => {
        setSymbol(selectedSymbol);
        setQuote(null); // Clear the previous quote data if needed
    };

    // Function to handle opening and closing of stock lists
    const toggleList = (listName) => {
        setOpenList(openList === listName ? null : listName); // Toggle open state
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
            {loading && <p>Loading...</p>}
            <QuoteDisplay quote={quote} />
            {/* <PopularStocks onStockSelect={handleStockSelect} />
            <MostActive onStockSelect={handleStockSelect} />
            <TopGainers onStockSelect={handleStockSelect} />
            <TopLosers onStockSelect={handleStockSelect} /> */}

            {/* Pass the toggle function and open state to each component */}
            <PopularStocks onStockSelect={handleStockSelect} isOpen={openList === 'popular'} toggleList={() => toggleList('popular')} />
            <MostActive onStockSelect={handleStockSelect} isOpen={openList === 'active'} toggleList={() => toggleList('active')} />
            <TopGainers onStockSelect={handleStockSelect} isOpen={openList === 'gainers'} toggleList={() => toggleList('gainers')} />
            <TopLosers onStockSelect={handleStockSelect} isOpen={openList === 'losers'} toggleList={() => toggleList('losers')} />
        </div>
    );
};

export default App;
