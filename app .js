const express = require('express');
const yahooFinance = require('yahoo-finance2').default;

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Your routes
app.get('/quote/:symbol', async (req, res) => {
    try {
      const quote = await yahooFinance.quote(req.params.symbol);
      res.json(quote);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
app.get('/historical/:symbol', async (req, res) => {
    try {
      const result = await yahooFinance.historical(req.params.symbol);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// Remove or comment out this route
// app.get('/', async (req, res) => {
//   try {
//     const quote = await yahooFinance.quote('AVGO');
//     res.json(quote);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.listen(port, () => {
  console.log(`Stock analysis app listening at http://localhost:${port}`);
});