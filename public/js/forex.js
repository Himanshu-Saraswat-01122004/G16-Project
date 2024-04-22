// var api = "QH43QW1MNDF4J28A";
var api = "RLS7V1SO4N3CM4LQ";
var from_currency = null;
var to_currency = null;
var forex_dps = [];
var forex_data1 = []
var chart = null;
var forex_columns = ["Date", "Open", "High", "Low", "Close"];
var news = "92c440c5e76a4245b0665f1ed46a81af";

function forex_download() {
    window.location = "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=" + from_currency + "&to_symbol=" + to_currency + "&apikey=" + api + "&datatype=csv"
}

function getForexTable() {
    console.log(forex_data1);
    var table_container = document.getElementById("table_container");
    var para = document.createElement("p");
    para.id = "para";
    table_container.appendChild(para);
    var table = document.createElement("table");
    table.className = "table";
    var row = document.createElement("tr");
    for (let i = 0; i < forex_columns.length; i++) {
        var col = document.createElement("th");
        col.scope = "col";
        cell = document.createTextNode(forex_columns[i]);
        col.appendChild(cell);
        row.appendChild(col);
    }
    table.appendChild(row);
    for (let i = 0; i < 7; i++) {
        row = document.createElement("tr");
        for (let j = 0; j < 5; j++) {
            col = document.createElement("td");
            cell = document.createTextNode(forex_data1[i][j]);
            col.appendChild(cell);
            row.appendChild(col);
        }
        table.appendChild(row);
    }
    table_container.appendChild(table);
}

function getGraph() {
    chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "From " + from_currency + " To " + to_currency
        },
        animationEnabled: true,
        theme: "light2",
        axisY: {
            title: "Open Prices",
            includeZero: false
        },
        axisX: {
            title: "Date",
            valueFormatString: "DD-MMM"
        },
        data: [{
            type: "line",
            indexLabelFontSize: 16,
            dataPoints: forex_dps
        }]
    });
    chart.options.data[0].dataPoints = forex_dps;
    chart.render();
}

function getGraphData() {
    $.getJSON("https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=" + from_currency + "&to_symbol=" + to_currency + "&outputsize=full&apikey=" + api)
        .done(function (data) {
            console.log(data)
            var date = data["Time Series FX (Daily)"]
            let a = 20;
            let b = 7;
            for (var d in date) {
                var r = d.split("-");
                if (a-- > 0) {
                    var value = date[d];
                    forex_dps.unshift({ x: new Date(parseInt(r[0]), parseInt(r[1]) - 1, parseInt(r[2])), y: parseFloat(value["1. open"]) });
                    if (b-- > 0) {
                        let c = [d, value["1. open"], value["2. high"], value["3. low"], value["4. close"]];
                        forex_data1.push(c);
                    }
                } else {
                    break;
                }
            }
            getGraph();
            getForexTable();
            document.getElementById("loading_container").style.display = "none";
            document.getElementById("download_data").style.display = "block";
            document.getElementById("from_currency").disabled = false;
            document.getElementById("to_currency").disabled = false;
            document.getElementById("get_data").disabled = false;
        })
        .fail(function (textStatus, error) {
            alert(textStatus + " " + error + "\nReload the page");
        })
}

function getForexExchangeData() {
    $.getJSON("https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=" + from_currency + "&to_currency=" + to_currency + "&apikey=" + api)
        .done(function (data) {
            console.log(data);
            var ex = data["Realtime Currency Exchange Rate"];
            var div = document.getElementById("exchange");
            for (var d in ex) {
                var h6 = document.createElement("h6");
                var cell = document.createTextNode(d + " : " + ex[d]);
                h6.appendChild(cell);
                div.appendChild(h6);
            }
            getGraphData();
        })
        .fail(function (textStatus, error) {
            alert(textStatus + " " + error + "\nReload the page");
        })
}
function populateCurrencyOptions() {
    $.getJSON("https://openexchangerates.org/api/currencies.json")
        .done(function (data) {
            var currencies = data;
            var fromSelect = document.getElementById("from_currency");
            var toSelect = document.getElementById("to_currency");
            fromSelect.innerHTML = "";
            toSelect.innerHTML = "";
            for (var currency in currencies) {
                var option = document.createElement("option");
                option.value = currency;
                option.text = currencies[currency];
                fromSelect.appendChild(option.cloneNode(true));
                toSelect.appendChild(option.cloneNode(true)); // Use cloned node to prevent moving the same option element
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert(textStatus + " " + errorThrown + "\nReload the page");
        });
    displayNews();
}

function getData() {
    if (chart !== null) {
        chart.destroy();
    }
    forex_data1 = [];
    forex_dps = [];
    document.getElementById("table_container").innerHTML = "";
    document.getElementById("exchange").innerHTML = "";
    from_currency = document.getElementById("from_currency").value;
    to_currency = document.getElementById("to_currency").value;
    document.getElementById("loading_container").style.display = "block";
    document.getElementById("download_data").style.display = "none";
    document.getElementById("from_currency").disabled = true;
    document.getElementById("to_currency").disabled = true;
    document.getElementById("get_data").disabled = true;
    getForexExchangeData();
}

$(document).ready(function () {
    populateCurrencyOptions();
});

function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function fetchNewsData() {
    return new Promise((resolve, reject) => {
        const url = 'https://newsapi.org/v2/everything?' +
            'domains=ft.com,nakedcapitalism.com,bloomberg.com/businessweek,biztoc.com,finance.yahoo.com,moneycontrol.com,wsj.com&' +
            // 'q=currency&' +
            // 'from=' + getCurrentDate() + '&' +
            // 'to=' + getCurrentDate() + '&' +
            'sortBy=popularity&' +
            'apiKey=' + news;

        fetch(url)
            .then(response => response.json())
            .then(data => resolve(data.articles))
            .catch(error => reject(error));
    });
}


async function displayNews() {
    const newsContainer = document.getElementById('news-container');
    try {
        const news = await fetchNewsData();
        console.log(news);
        if (news && news.length > 0) {
            for (let i = 0; i < Math.min(news.length, 5); i++) {
                const article = news[i];
                const articleElement = document.createElement('div');
                articleElement.innerHTML = `
                    <a href=${article.url}><h3>${article.title}</h3></a>
                    <hr>
                `;
                newsContainer.appendChild(articleElement);
            }
        } else {
            newsContainer.innerHTML = '<p>No news articles found.</p>';
        }
    } catch (error) {
        console.error('Failed to fetch news:', error);
        newsContainer.innerHTML = '<p>Failed to fetch news. Please try again later.</p>';
    }
}
