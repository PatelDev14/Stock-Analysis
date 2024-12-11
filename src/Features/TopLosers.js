// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './StockList.css';

// // const TopLosers = ({ onStockSelect }) => {
// //   const [stocks, setStocks] = useState([]);
// //   const [isOpen, setIsOpen] = useState(false);

// //   useEffect(() => {
// //     const fetchStocks = async () => {
// //       try {
// //         const response = await axios.get('https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=6Llqcp1uApVi1TrTf8Yjw3OjvbMYFLQf');
// //         setStocks(response.data);
// //       } catch (error) {
// //         console.error('Error fetching top losers:', error);
// //       }
// //     };
// //     fetchStocks();
// //   }, []);

// //   const handleStockClick = (symbol) => {
// //     if (typeof onStockSelect === 'function') {
// //       onStockSelect(symbol);
// //     }
// //     setIsOpen(false);
// //   };

// //   return (
// //     <div className={`stock-list-container ${isOpen ? 'open' : ''}`}>
// //       <button onClick={() => setIsOpen(!isOpen)}>Top Losers</button>
// //       <ul className="stock-list">
// //         {stocks.map(stock => (
// //           <li key={stock.symbol} onClick={() => handleStockClick(stock.symbol)}>
// //             {stock.symbol} - {stock.name} ({stock.changesPercentage}%)
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default TopLosers;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './StockList.css';

// const TopLosers = ({ onStockSelect, isOpen, toggleList }) => {
//   const [stocks, setStocks] = useState([]);

//   useEffect(() => {
//     const fetchStocks = async () => {
//       try {
//         const response = await axios.get('https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=6Llqcp1uApVi1TrTf8Yjw3OjvbMYFLQf');
//         setStocks(response.data);
//       } catch (error) {
//         console.error('Error fetching top losers:', error);
//       }
//     };
//     fetchStocks();
//   }, []);

//   const handleStockClick = (symbol) => {
//     if (typeof onStockSelect === 'function') {
//       onStockSelect(symbol);
//     }
//     // Optionally collapse the list after selecting a stock
//     // toggleList(); 
//   };

//   return (
//     <div className={`stock-list-container ${isOpen ? 'open' : ''}`}>
//       <button onClick={toggleList}>Top Losers</button>
//       <ul className="stock-list">
//         {stocks.map(stock => (
//           <li key={stock.symbol} onClick={() => handleStockClick(stock.symbol)}>
//             {stock.symbol} - {stock.name} ({stock.changesPercentage}%)
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TopLosers;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StockList.css';

const TopLosers = ({ onStockSelect, isOpen, toggleList }) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=6Llqcp1uApVi1TrTf8Yjw3OjvbMYFLQf');
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching top losers:', error);
      }
    };
    fetchStocks();
  }, []);

  const handleStockClick = (symbol) => {
    if (typeof onStockSelect === 'function') {
      onStockSelect(symbol);
    }
    // Optionally collapse the list after selecting a stock
    // toggleList(); 
  };

  return (
    <div className={`stock-list-container ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleList}>Top Losers</button>
      <ul className="stock-list">
        {stocks.map(stock => (
          <li key={stock.symbol} onClick={() => handleStockClick(stock.symbol)}>
            {stock.symbol} - {stock.name} ({stock.changesPercentage}%)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopLosers;
