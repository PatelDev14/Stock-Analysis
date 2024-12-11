// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './StockList.css';

// const PopularStocks = ({ onStockSelect, toggleList }) => {
//   const [stocks, setStocks] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleStockClick = (symbol) => {
//     if (typeof onStockSelect === 'function') {
//       onStockSelect(symbol);
//     }
//     setIsOpen(false);
//   };

//   useEffect(() => {
//     const fetchStocks = async () => {
//       try {
//         const response = await axios.get('https://financialmodelingprep.com/api/v3/stock/list?apikey=6Llqcp1uApVi1TrTf8Yjw3OjvbMYFLQf');
//         setStocks(response.data.slice(0, 50));
//       } catch (error) {
//         console.error('Error fetching stocks:', error);
//       }
//     };
//     fetchStocks();
//   }, []);



// return (
//   <div className={`stock-list-container ${isOpen ? 'open' : ''}`}>
//     <button onClick={() => setIsOpen(!isOpen)}>Most Searched Stocks</button>
//     <ul className="stock-list">
//       {stocks.map(stock => (
//         <li key={stock.symbol} onClick={() => handleStockClick(stock.symbol)}>
//           {stock.symbol} - {stock.name}
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// };

// export default PopularStocks;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StockList.css';

const PopularStocks = ({ onStockSelect, isOpen, toggleList }) => {
  const [stocks, setStocks] = useState([]);

  const handleStockClick = (symbol) => {
    if (typeof onStockSelect === 'function') {
      onStockSelect(symbol);
    }
    // Optionally collapse the list after selecting a stock
    // toggleList(); 
  };

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('https://financialmodelingprep.com/api/v3/stock/list?apikey=6Llqcp1uApVi1TrTf8Yjw3OjvbMYFLQf');
        setStocks(response.data.slice(0, 50));
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };
    fetchStocks();
  }, []);

  return (
    <div className={`stock-list-container ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleList}>Most Searched Stocks</button>
      <ul className="stock-list">
        {stocks.map(stock => (
          <li key={stock.symbol} onClick={() => handleStockClick(stock.symbol)}>
            {stock.symbol} - {stock.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularStocks;
