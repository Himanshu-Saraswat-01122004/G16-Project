const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () =>
    container.classList.add('right-panel-active'));

signInButton.addEventListener('click', () =>
    container.classList.remove('right-panel-active'));

// search-box open close js code
let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .bx-search");
// let searchBoxCancel = document.querySelector(".search-box .bx-x");

searchBox.addEventListener("click", () => {
    navbar.classList.toggle("showInput");
    if (navbar.classList.contains("showInput")) {
        searchBox.classList.replace("bx-search", "bx-x");
    } else {
        searchBox.classList.replace("bx-x", "bx-search");
    }
});

// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function () {
    navLinks.style.left = "0";
}
menuCloseBtn.onclick = function () {
    navLinks.style.left = "-100%";
}


// sidebar submenu open close js code
let htmlcssArrow = document.querySelector(".htmlcss-arrow");
htmlcssArrow.onclick = function () {
    navLinks.classList.toggle("show1");
}
let moreArrow = document.querySelector(".more-arrow");
moreArrow.onclick = function () {
    navLinks.classList.toggle("show2");
}
let jsArrow = document.querySelector(".js-arrow");
jsArrow.onclick = function () {
    navLinks.classList.toggle("show3");
}

// Include a charting library like Chart.js (already linked in HTML)
const ctx = document.getElementById("trending-chart").getContext('2d');

// Simulate getting trending stocks and news (replace with real API calls)
const trendingStocks = [
    // ... (same as before)
];

const news = [
    { title: "Dow Jones Up 1.5% on Tech Stock Rally", source: "Reuters" },
    { title: "Federal Reserve Expected to Raise Rates", source: "Bloomberg" },
    // ... (more news)
];

// Function to create a stock list item
function createStockListItem(stock) {
    const listItem = document.createElement("li");
    listItem.classList.add("stock-item");
    listItem.innerHTML = `
    <span class="symbol">${stock.symbol}</span>
    <span class="name">${stock.name}</span>
    <span class="price">$${stock.price.toFixed(2)}</span>
    <span class="price-change">
      <span class="change" style="color: ${stock.change > 0 ? 'green' : 'red'}">${stock.change > 0 ? '+' : ''}${stock.change.toFixed(2)}</span>
      <span class="change-percent">(${((stock.change / stock.price) * 100).toFixed(2)}%)</span>
    </span>
  `;
    return listItem;
}

// Populate the trending stocks list and chart (example using Chart.js)
const trendingStockList = document.querySelector(".trending-stocks .stock-list");
trendingStocks.forEach(stock => {
    trendingStockList.appendChild(createStockListItem(stock));
    // Add data for the chart (replace with actual data points)
    // ...
});

new Chart(ctx, {
    type: 'line',
    data: {
        labels: trendingStocks.map(stock => stock.symbol),
        datasets: [{
            label: 'Stock Price',
            data: trendingStocks.map(stock => stock.price),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

// Functionality for watchlist and news feed (to be implemented)
// Use localStorage or a database to store watchlist items
// Implement logic to fetch and display news articles

// Example event listener for searching stocks (incomplete)
document.getElementById("search-button").addEventListener("click", () => {
    // Implement search functionality using a stock API
});

document.getElementById("search-button").addEventListener("click", () => {
    const searchInput = document.getElementById("search-stock").value.toUpperCase(); // Get search term and convert to uppercase for case-insensitive search
    searchStock(searchInput);
});

function searchStock(searchTerm) {
    // Replace with your actual API call logic to fetch stock data based on searchTerm
    // This is a placeholder for demonstration purposes
    const searchedStock = {
        symbol: searchTerm,
        name: "Search Result: " + searchTerm,
        price: 100.00,
        change: 1.50,
    };

    // Check if a stock was found
    if (searchedStock) {
        // Update the dashboard with the searched stock data
        updateDashboard(searchedStock);  // Call a function to update dashboard (explained later)
    } else {
        // Handle no results scenario (e.g., display an error message)
        alert("Stock not found. Please try a different symbol.");
    }
}

function updateDashboard(stockData) {
    // 1. Clear existing data
    const stockList = document.querySelector(".trending-stocks .stock-list");
    stockList.innerHTML = ""; // Clear the existing stock list items

    // 2. Update Chart (optional)
    const chartCtx = document.getElementById("trending-chart").getContext('2d');
    const existingChart = new Chart.constructor(chartCtx); // Get reference to existing chart

    // Clear existing chart data
    existingChart.data.labels = [];
    existingChart.data.datasets[0].data = [];
    existingChart.update();

    // Update chart data with searched stock
    existingChart.data.labels = [stockData.symbol];
    existingChart.data.datasets[0].data = [stockData.price];
    existingChart.update();

    // 3. Scroll to Top (optional)
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly

    // Update Stock List
    stockList.appendChild(createStockListItem(stockData)); // Add the searched stock
}

function getWatchlistItems() {
    const storedItems = localStorage.getItem("watchlist");
    return storedItems ? JSON.parse(storedItems) : []; // Parse stored JSON or return empty array
}

function addToWatchlist(stockData) {
    const watchlistItems = getWatchlistItems();
    watchlistItems.push(stockData); // Add stock to watchlist array
    localStorage.setItem("watchlist", JSON.stringify(watchlistItems)); // Update localStorage
    updateWatchlist(); // Call function to update watchlist display (explained later)
}

document.getElementById("add-stock").addEventListener("click", () => {
    // Prompt user to enter a stock symbol or implement search functionality to add stocks
    const stockSymbol = prompt("Enter a stock symbol to add to watchlist:");
    if (stockSymbol) {
        // Replace with your actual API call logic to fetch stock data based on symbol
        const stockData = {
            // Placeholder stock data
            symbol: stockSymbol,
            name: "Example Stock",
            price: 123.45,
            change: 2.10,
        };
        addToWatchlist(stockData);
    }
});

function fetchNewsArticles() {
    const apiKey = "92c440c5e76a4245b0665f1ed46a81af"; // Replace with your actual API key
    const url = `https://newsapi.org/v2/everything?q=financial+market&sortBy=publishedAt&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            updateNewsFeed(articles); // Call function to update news feed (explained later)
        })
        .catch(error => console.error(error));
}

function updateNewsFeed(articles) {
    const newsList = document.getElementById("news-list");
    newsList.innerHTML = ""; // Clear existing list items

    const maxNews = 5; // Adjust this value to limit the number of articles displayed
    let displayedCount = 0;
    articles.forEach(article => {
        if (displayedCount < maxNews) {
            const listItem = document.createElement("li");
            listItem.classList.add("news-item");
            listItem.innerHTML = `
        <a href="${article.url}" target="_blank">
          ${article.title}
        </a>
        <span class="source">(${article.source.name})</span>
      `;
            newsList.appendChild(listItem);
            displayedCount++;
        }
    });
}

window.onload = function () {
    fetchNewsArticles();
};

function sortStockList(sortCriteria) {
    // Get the stock list data (assuming it's in an array)
    const stockData = getStockData(); // Replace with your logic to retrieve data

    // Sort the data based on sortCriteria
    stockData.sort((stockA, stockB) => {
        if (sortCriteria === "symbol") {
            return stockA.symbol.localeCompare(stockB.symbol);
        } else if (sortCriteria === "change") {
            return stockData.change - stockB.change; // Assuming change is a number
        } else {
            // Handle other sorting criteria (e.g., price)
        }
    });

    // Update the stock list with sorted data
    updateStockList(stockData); // Replace with your logic to update list
}

const tableHeaders = document.querySelectorAll("#stock-table th");

tableHeaders.forEach(header => {
    header.addEventListener("click", function () {
        const sortCriteria = this.dataset.sort;
        sortStockList(sortCriteria);
    });
});

function updateStockList(sortedData) {
    const stockList = document.getElementById("stock-list");
    stockList.innerHTML = ""; // Clear existing list items

    sortedData.forEach(stock => {
        // Create and append list item elements 
        // with appropriate content for each stock
    });
}

const sampleStockData = [
    { symbol: "AAPL", price: 150.23, change: 1.25 },
    { symbol: "GOOG", price: 1250.78, change: -3.42 },
    { symbol: "AMZN", price: 3200.50, change: 15.78 },
    // ... add more stock data objects
];
function getStockData() {
    const watchlist = getWatchlistFromStorage();
    const symbols = watchlist.join(","); // Join symbols into comma-separated string

    const apiKey = "1M9XT2WX4RL4M28S"; // Replace with your actual key

    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbols=${symbols}&apikey=${apiKey}`;

    // Use fetch API or a library like Axios to make the API call
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data || !data["Global Quote"]) {
                throw new Error("Invalid API response: missing data");
            }

            const stockData = [];
            for (const symbol in data["Global Quote"]) {
                if (data["Global Quote"].hasOwnProperty(symbol)) {
                    const stockInfo = data["Global Quote"][symbol];
                    stockData.push({
                        symbol: stockInfo["symbol"],
                        price: parseFloat(stockInfo["price"]), // Convert price to number
                        change: parseFloat(stockInfo["change"]), // Convert change to number
                    });
                }
            }
            return stockData;
        })
        .catch(error => {
            console.error("Error fetching stock data:", error);
            // Handle the error in the calling function (e.g., display an error message)
            throw error; // Re-throw the error for further handling
        });
}



function updateStockList(sortedData) {
    const stockList = document.getElementById("stock-list");
    stockList.innerHTML = ""; // Clear existing list items

    sortedData.forEach(stock => {
        const listItem = document.createElement("li");
        listItem.classList.add("stock-item");

        // Create elements for symbol, price, and change
        const symbolSpan = document.createElement("span");
        symbolSpan.textContent = stock.symbol;

        const priceSpan = document.createElement("span");
        priceSpan.textContent = `$${stock.price.toFixed(2)}`; // Format price with 2 decimals

        const changeSpan = document.createElement("span");
        changeSpan.classList.add("price-change");

        const changeValueSpan = document.createElement("span");
        changeValueSpan.textContent = `$${stock.change.toFixed(2)}`; // Format change with 2 decimals

        if (stock.change > 0) {
            changeValueSpan.classList.add("positive");
        } else if (stock.change < 0) {
            changeValueSpan.classList.add("negative");
        }

        changeSpan.appendChild(changeValueSpan);
        listItem.appendChild(symbolSpan);
        listItem.appendChild(priceSpan);
        listItem.appendChild(changeSpan);

        stockList.appendChild(listItem);
    });
    // Update table header sorting arrows
    const tableHeaders = document.querySelectorAll("#stock-table th");
    tableHeaders.forEach(header => {
        header.classList.remove("sorted-asc", "sorted-desc"); // Clear previous arrows
        const sortCriteria = header.dataset.sort;
        if (sortCriteria === currentSortCriteria) { // Check for currently sorted column
            header.classList.add(sortOrder === "asc" ? "sorted-asc" : "sorted-desc");
        }
    });
}

function sortStockList(sortCriteria, sortOrder = "asc") {
    const stockData = getStockData();

    if (!stockData || !sortCriteria) {
        console.error("Invalid sorting criteria or data");
        return; // Handle the error gracefully, e.g., display an error message
    }

    stockData.sort((stockA, stockB) => {
        let comparison;
        switch (sortCriteria) {
            case "symbol":
                comparison = stockA.symbol.localeCompare(stockB.symbol);
                break;
            case "change":
                comparison = stockData.change - stockB.change;
                break;
            case "price": // Add price sorting logic
                comparison = stockA.price - stockB.price;
                break;
            default:
                console.warn("Unknown sorting criteria:", sortCriteria);
                return 0; // Maintain original order for unknown criteria
        }

        return sortOrder === "asc" ? comparison : -comparison; // Reverse order for descending
    });

    updateStockList(stockData);
}

let currentSortCriteria = null; // Initialize current sort criteria

tableHeaders.forEach(header => {
    header.addEventListener("click", function () {
        const sortCriteria = this.dataset.sort;
        let sortOrder = "asc"; // Default to ascending order

        if (currentSortCriteria === sortCriteria) { // Toggle sort order if clicking same column
            sortOrder = sortOrder === "asc" ? "desc" : "asc";
        }

        currentSortCriteria = sortCriteria;
        sortStockList(sortCriteria, sortOrder);
    });
});

function addToWatchlist(symbol) {
    const watchlist = getWatchlistFromStorage();
    if (!watchlist.includes(symbol)) {
        watchlist.push(symbol);
        storeWatchlistInStorage(watchlist);
        updateWatchlistUI();
    } else {
        console.warn("Symbol already exists in watchlist:", symbol);
    }
}

function getWatchlistFromStorage() {
    const watchlistJSON = localStorage.getItem("watchlist");
    return watchlistJSON ? JSON.parse(watchlistJSON) : []; // Return empty array if no watchlist exists
}

function storeWatchlistInStorage(watchlist) {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

function updateWatchlistUI() {
    const watchlistItems = document.getElementById("watchlist-items");
    watchlistItems.innerHTML = ""; // Clear existing list items

    const watchlist = getWatchlistFromStorage();
    watchlist.forEach(symbol => {
        const listItem = document.createElement("li");
        listItem.textContent = symbol;
        watchlistItems.appendChild(listItem);
    });
}

const addToWatchlistButton = document.getElementById("add-to-watchlist");

addToWatchlistButton.addEventListener("click", function () {
    // Get the symbol to add (replace with logic to retrieve symbol)
    const symbolToAdd = "AAPL"; // Placeholder symbol for demonstration

    addToWatchlist(symbolToAdd);
});

window.onload = function () {
    updateWatchlistUI();
};

function removeFromWatchlist(symbol) {
    const watchlist = getWatchlistFromStorage();
    const newList = watchlist.filter(item => item !== symbol); // Filter out the symbol to remove

    if (watchlist.length !== newList.length) { // Check if symbol was removed
        storeWatchlistInStorage(newList);
        updateWatchlistUI();
    } else {
        console.warn("Symbol not found in watchlist:", symbol);
    }
}

const watchlistItems = document.getElementById("watchlist-items");



function updateWatchlistUI(symbolToRemove) {
    const watchlistItems = document.getElementById("watchlist-items");
    watchlistItems.innerHTML = ""; // Clear existing list items

    const watchlist = getWatchlistFromStorage();

    if (symbolToRemove) { // Handle symbol removal if provided
        const newList = watchlist.filter(item => item !== symbolToRemove);
        storeWatchlistInStorage(newList);
        watchlist = newList; // Update watchlist for rendering
    }

    watchlist.forEach(symbol => {
        const listItem = document.createElement("li");
        listItem.textContent = symbol;

        // Optionally add a button/icon for removal within each list item
        // ...

        watchlistItems.appendChild(listItem);
    });
}


watchlistItems.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-watchlist")) {
        const symbolToRemove = event.target.parentElement.querySelector(".watchlist-symbol").textContent;
        removeFromWatchlist(symbolToRemove);
    }
});

function clearWatchlist() {
    localStorage.removeItem("watchlist");
    updateWatchlistUI();
}

const clearWatchlistButton = document.getElementById("clear-watchlist");

clearWatchlistButton.addEventListener("click", clearWatchlist);

watchlistItems.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-watchlist")) {
        const symbolToRemove = event.target.parentElement.querySelector(".watchlist-symbol").textContent;
        const confirmation = confirm(`Are you sure you want to remove ${symbolToRemove} from your watchlist?`);

        if (confirmation) {
            removeFromWatchlist(symbolToRemove);
        }
    }
});

function updateWatchlistUI() {
    const watchlistItems = document.getElementById("watchlist-items");
    watchlistItems.innerHTML = ""; // Clear existing list items

    const stockData = getStockData(); // Call the updated getStockData

    stockData.forEach(stock => {
        const listItem = document.createElement("li");
        listItem.textContent = `${stock.symbol} (${stock.price.toFixed(2)})`; // Display symbol and price

        // Optionally add change information, styling, etc. based on your design

        watchlistItems.appendChild(listItem);
    });
}

// Call this function on page load or after watchlist updates
function updateHomepageStockDisplay() {
    const watchlist = getWatchlistFromStorage();
    const symbols = watchlist.join(",");

    const apiKey = "1M9XT2WX4RL4M28S";
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbols=${symbols}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const homepageStockDisplay = document.getElementById("homepage-stock-display");
            homepageStockDisplay.innerHTML = ""; // Clear existing content

            const stockData = [];
            for (const symbol in data) {
                if (data.hasOwnProperty(symbol)) {
                    const stockInfo = data[symbol]["Global Quote"];
                    stockData.push({
                        symbol: stockInfo["symbol"],
                        price: parseFloat(stockInfo["price"]),
                    });
                }
            }

            // Generate HTML content for the homepage stock display based on stockData
            let displayContent = "";
            stockData.forEach(stock => {
                displayContent += `<p>${stock.symbol}: $${stock.price.toFixed(2)}</p>`;
            });
            homepageStockDisplay.innerHTML = displayContent;
        })
        .catch(error => {
            console.error("Error fetching stock data:", error);
            // Handle API errors gracefully (e.g., display an error message)
        });
}

// Call the function to update the homepage display
updateHomepageStockDisplay();

function fetchDataAndDisplay(symbols) {
    const apiKey = "1M9XT2WX4RL4M28S";

    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbols=${symbols.join(",")}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const homepageStockDisplay = document.getElementById("homepage-stock-display");
            homepageStockDisplay.innerHTML = "";

            let displayContent = "";

            // Separate logic for watchlist and trending stocks (optional for styling differentiation)
            const watchlistData = {};
            const trendingData = {};
            for (const symbol in data) {
                if (data.hasOwnProperty(symbol)) {
                    const stockInfo = data[symbol]["Global Quote"];
                    if (watchlist.includes(symbol)) {
                        watchlistData[symbol] = {
                            symbol: stockInfo["symbol"],
                            price: parseFloat(stockInfo["price"]),
                            change: parseFloat(stockInfo["change"]),
                        };
                    } else {
                        trendingData[symbol] = {
                            symbol: stockInfo["symbol"],
                            price: parseFloat(stockInfo["price"]),
                            change: parseFloat(stockInfo["change"]),
                        };
                    }
                }
            }

            // Generate HTML content (consider separate sections for watchlist and trending)
            displayContent += "<h2>Watchlist</h2>";
            displayContent += generateStockListContent(watchlistData);
            displayContent += "<h2>Trending Stocks</h2>";
            displayContent += generateStockListContent(trendingData);

            homepageStockDisplay.innerHTML = displayContent;
        })
        .catch(error => {
            console.error("Error fetching stock data:", error);
            // Handle errors gracefully (e.g., display an error message)
        });
}


function generateStockListContent(stockData, itemClass) {
    // Logic to generate HTML content for each stock item based on stockData structure
    let content = "";
    for (const symbol in stockData) {
        const stock = stockData[symbol];
        const changeClass = stock.change > 0 ? "positive" : stock.change < 0 ? "negative" : "";
        content += `
        <div class="stock-item ${itemClass}">
          <span class="stock-symbol">${stock.symbol}</span>
          <span class="stock-price">$${stock.price.toFixed(2)}</span>
          <span class="stock-change ${changeClass}">(${stock.change.toFixed(2)})</span>
        </div>
      `;
    }
    return content;
}
