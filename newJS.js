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






