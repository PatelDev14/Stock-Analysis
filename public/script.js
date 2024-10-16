// async function getQuote() {
//     const symbol = document.getElementById('symbolInput').value.toUpperCase();
//     if (!symbol) {
//         alert('Please enter a stock symbol');
//         return;
//     }
    
//     document.getElementById('result').innerText = 'Loading...';
    
//     try {
//         const response = await fetch(`/quote/${symbol}`);
//         const data = await response.json();
//         document.getElementById('result').innerText = JSON.stringify(data, null, 2);
//     } catch (error) {
//         document.getElementById('result').innerText = `Error: ${error.message}`;
//     }
// }

// async function getFinancials() {
//     const symbol = document.getElementById('symbolInput').value.toUpperCase();
//     if (!symbol) {
//         alert('Please enter a stock symbol');
//         return;
//     }
    
//     document.getElementById('financialResult').innerText = 'Loading...';
    
//     try {
//         const response = await fetch(`/financials/${symbol}`);
//         const data = await response.json();
//         document.getElementById('financialResult').innerText = JSON.stringify(data, null, 2);
//     } catch (error) {
//         document.getElementById('financialResult').innerText = `Error: ${error.message}`;
//     }
// }
function showLoading(elementId) {
    document.getElementById(elementId).style.display = 'block';
    document.getElementById(elementId).innerHTML = 'Loading...';
}

function showResult(elementId, data) {
    const element = document.getElementById(elementId);
    element.style.display = 'block';
    element.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

// async function getQuote() {
//     const symbol = document.getElementById('symbolInput').value.toUpperCase();
//     if (!symbol) {
//         alert('Please enter a stock symbol');
//         return;
//     }
    
//     showLoading('result');
    
//     try {
//         const response = await fetch(`/quote/${symbol}`);
//         const data = await response.json();
//         showResult('result', data);
//     } catch (error) {
//         showResult('result', { error: error.message });
//     }
// }

async function getQuote() {
    const symbol = document.getElementById('symbolInput').value.toUpperCase();
    if (!symbol) {
        alert('Please enter a stock symbol');
        return;
    }
    
    showLoading('result');
    
    try {
        const response = await fetch(`/quote/${symbol}`);
        const data = await response.json();
        
        // Filter and format the data
        const formattedData = {
            Symbol: data.symbol,
            Name: data.longName,
            Price: `$${data.regularMarketPrice.toFixed(2)}`,
            Change: `${data.regularMarketChange.toFixed(2)} (${data.regularMarketChangePercent.toFixed(2)}%)`,
            Volume: data.regularMarketVolume.toLocaleString(),
            'Market Cap': `$${(data.marketCap / 1e9).toFixed(2)} Billion`,
            '52 Week High': `$${data.fiftyTwoWeekHigh.toFixed(2)}`,
            '52 Week Low': `$${data.fiftyTwoWeekLow.toFixed(2)}`,
            'P/E Ratio': data.trailingPE ? data.trailingPE.toFixed(2) : 'N/A',
            Dividend: data.dividendYield ? `${(data.dividendYield * 100).toFixed(2)}%` : 'N/A'
        };

        displayFormattedResult('result', formattedData);
    } catch (error) {
        showResult('result', { error: error.message });
    }
}

function displayFormattedResult(elementId, data) {
    const element = document.getElementById(elementId);
    element.style.display = 'block';
    let html = '<table class="data-table">';
    for (const [key, value] of Object.entries(data)) {
        html += `<tr><td>${key}</td><td>${value}</td></tr>`;
    }
    html += '</table>';
    element.innerHTML = html;
}

// async function getFinancials() {
//     const symbol = document.getElementById('symbolInput').value.toUpperCase();
//     if (!symbol) {
//         alert('Please enter a stock symbol');
//         return;
//     }
    
//     showLoading('financialResult');
    
//     try {
//         const response = await fetch(`/financials/${symbol}`);
//         const data = await response.json();
//         showResult('financialResult', data);
//     } catch (error) {
//         showResult('financialResult', { error: error.message });
//     }
// }

async function getFinancials() {
    const symbol = document.getElementById('symbolInput').value.toUpperCase();
    if (!symbol) {
        alert('Please enter a stock symbol');
        return;
    }
    
    showLoading('financialResult');
    
    try {
        const response = await fetch(`/financials/${symbol}`);
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        displayFormattedFinancials('financialResult', data);
    } catch (error) {
        showResult('financialResult', { error: error.message });
    }
}

function displayFormattedFinancials(elementId, data) {
    const element = document.getElementById(elementId);
    element.style.display = 'block';
    let html = '';
    for (const [section, sectionData] of Object.entries(data)) {
        html += `<h3>${section}</h3>`;
        if (Object.keys(sectionData).length === 0) {
            html += '<p>No data available</p>';
        } else {
            html += '<table class="data-table">';
            for (const [key, value] of Object.entries(sectionData)) {
                html += `<tr><td>${key}</td><td>${value}</td></tr>`;
            }
            html += '</table>';
        }
    }
    element.innerHTML = html;
}