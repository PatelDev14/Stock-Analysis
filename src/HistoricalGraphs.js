// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// // Register necessary components for chart.js
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const HistoricalGraphs = ({ symbol }) => {
//     const [historicalData, setHistoricalData] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchHistoricalData = async () => {
//             try {
//                 const response = await axios.get(`/api/historical/${symbol}`);
//                 setHistoricalData(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching historical data:", error);
//                 setLoading(false);
//             }
//         };

//         fetchHistoricalData();
//     }, [symbol]);

//     if (loading) return <p>Loading...</p>;
//     if (!historicalData) return <p>No historical data available.</p>;

//     // Prepare datasets for graphs
//     const epsDataset = {
//         label: 'EPS',
//         data: historicalData.eps.map((item) => ({ x: item.date, y: item.value })),
//         borderColor: 'blue',
//         fill: false,
//     };

//     const peRatioDataset = {
//         label: 'P/E Ratio',
//         data: historicalData.peRatio.map((item) => ({ x: item.date, y: item.value })),
//         borderColor: 'green',
//         fill: false,
//     };

//     const priceDataset = {
//         label: 'Stock Price',
//         data: historicalData.prices.map((item) => ({ x: item.date, y: item.close })),
//         borderColor: 'red',
//         fill: false,
//     };

//     return (
//         <div>
//             <h2>Historical Data for {symbol}</h2>
//             <Line
//                 data={{
//                     datasets: [epsDataset, peRatioDataset, priceDataset],
//                 }}
//                 options={{
//                     responsive: true,
//                     scales: {
//                         x: { type: 'time', time: { unit: 'month' } },
//                         y: { beginAtZero: false },
//                     },
//                 }}
//             />
//         </div>
//     );
// };

// export default HistoricalGraphs;
