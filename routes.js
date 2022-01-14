const fs = require('fs');
const csv = require('csv-parser');
import fetch from 'node-fetch';

if (!globalThis.fetch) {
    globalThis.fetch = fetch;
    globalThis.Headers = Headers;
    globalThis.Request = Request;
    globalThis.Response = Response;
}

fs.createReadStream('csv/forex.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    //console.log('CSV file successfully processed');
  });

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Data</title><head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
};


exports.handler = requestHandler;
exports.someText = 'Some hard coded text';

// List of stock symbols to use in
let symbols = ["AAPL", "MSFT", "ARS", "CNY", "INR", "NOK", "TSLA", "000111"];

const data = []

let timeIntervals = ["30min", "1h", "4h", "1day", "1week"];

let allData = {};

symbols.forEach(createDatabase);

function createDatabase(symbol) {

    allData[`${symbol}`] = {};

    timeIntervals.forEach(insertIntervals) 
    function insertIntervals(interval) {
        allData[`${symbol}`][`${interval}`] = [];
    }
}

symbols.forEach(storeStocks);

function storeStocks(stock) {

    timeIntervals.forEach(storeInterval);

    function storeInterval(interval) {

        let URL = `https://api.twelvedata.com/time_series?symbol=${stock},EUR/USD,IXIC&interval=${interval}&apikey=3d44de648ce4451f88c26bd2a1d5ad84`;
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            let locate = `${stock}`;
            var array = data[`${stock}`].values;

            array.forEach(myFunction);

            function myFunction(index) {
                var apiIndex = index;
                allData[`${stock}`][`${interval}`].push(apiIndex);
                

            }
        })
    }

}

console.log(allData);





