import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuoteDisplay from './QuoteDisplay';

const StockDetails = ({ symbol }) => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://backend-stock-analysis.onrender.com/api/quote/${symbol}`);
        setQuote(response.data);
      } catch (error) {
        console.error("Error fetching stock details:", error);
      }
      setLoading(false);
    };

    fetchStockDetails();
  }, [symbol]);

  if (loading) return <p>Loading...</p>;
  if (!quote) return <p>No data available for this stock.</p>;

  return <QuoteDisplay quote={quote} />;
};

export default StockDetails;
