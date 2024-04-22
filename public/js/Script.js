const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () =>
    container.classList.add('right-panel-active'));

signInButton.addEventListener('click', () =>
    container.classList.remove('right-panel-active'));

// // search-box open close js code
// let navbar = document.querySelector(".navbar");
// let searchBox = document.querySelector(".search-box .bx-search");
// // let searchBoxCancel = document.querySelector(".search-box .bx-x");

// searchBox.addEventListener("click", () => {
//     navbar.classList.toggle("showInput");
//     if (navbar.classList.contains("showInput")) {
//         searchBox.classList.replace("bx-search", "bx-x");
//     } else {
//         searchBox.classList.replace("bx-x", "bx-search");
//     }
// });

// // sidebar open close js code
// let navLinks = document.querySelector(".nav-links");
// let menuOpenBtn = document.querySelector(".navbar .bx-menu");
// let menuCloseBtn = document.querySelector(".nav-links .bx-x");
// menuOpenBtn.onclick = function() {
//     navLinks.style.left = "0";
// }
// menuCloseBtn.onclick = function() {
//     navLinks.style.left = "-100%";
// }


// // sidebar submenu open close js code
// let htmlcssArrow = document.querySelector(".htmlcss-arrow");
// htmlcssArrow.onclick = function() {
//     navLinks.classList.toggle("show1");
// }
// let moreArrow = document.querySelector(".more-arrow");
// moreArrow.onclick = function() {
//     navLinks.classList.toggle("show2");
// }
// let jsArrow = document.querySelector(".js-arrow");
// jsArrow.onclick = function() {
//     navLinks.classList.toggle("show3");
// }

// var api = "QH43QW1MNDF4J28A"; // get your own api (https://www.alphavantage.co/support/#api-key)
// var dps = [];
// var company = null;
// var symbol = null;
// var chart = null;
// var columns = ["Date", "Open", "High", "Low", "Close", "Adjusted Close", "Volume"];
// var data1 = []

// function download() {
//     window.location = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol= + ${symbol} + &apikey= + ${api} + &datatype=csv`;
// }

// function getting_data() {
//     if (company !== null) {
//         console.log("inside company");
//         $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&outputsize=full&apikey=" + api)
//             .done(function(data) {
//                 console.log("inside api");
//                 var date = data["Time Series (Daily)"]
//                 console.log(date);
//                 let a = 20;
//                 let b = 7;
//                 for (var d in date) {
//                     console.log("inside");
//                     var r = d.split("-");
//                     if (a-- > 0) {
//                         console.log("inside a");
//                         var value = date[d];
//                         dps.unshift({ x: new Date(parseInt(r[0]), parseInt(r[1]) - 1, parseInt(r[2])), y: parseFloat(value["1. open"]) });
//                         if (b-- > 0) {
//                             let c = [d, value["1. open"], value["2. high"], value["3. low"], value["4. close"], value["5. adjusted close"], value["6. volume"]];
//                             // console.log("pushing");
//                             data1.push(c);
//                         }
//                     } else {
//                         break;
//                     }
//                 }
//                 graph();
//                 drawTable();
//                 document.getElementById("loading_container").style.display = "none";
//                 document.getElementById("download_data").style.display = "block";
//                 document.getElementById("companies").disabled = false;
//                 document.getElementById("get_data").disabled = false;
//                 document.getElementById("chartContainer").disabled = false;
//             })
//             .fail(function(textStatus, error) {
//                 alert(textStatus + " " + error + "\nReload the page");
//             })
//     }
// }

// function graph() {
//     chart = new CanvasJS.Chart("chartContainer", {
//         title: {
//             text: company
//         },
//         animationEnabled: true,
//         theme: "light2",
//         axisY: {
//             title: "Open Prices",
//             includeZero: false
//         },
//         axisX: {
//             title: "Date",
//             valueFormatString: "DD-MMM"
//         },
//         data: [{
//             type: "line",
//             indexLabelFontSize: 16,
//             dataPoints: dps
//         }]
//     });
//     chart.options.data[0].dataPoints = dps;
//     chart.render();
// }

// function getData() {
//     if (chart !== null) {
//         chart.destroy();
//     }
//     data1 = [];
//     dps = [];
//     document.getElementById("table_container").innerHTML = "";
//     company = document.getElementById("companies").value;
//     let r = company.split("(");
//     symbol = r[1].substring(0, r[1].length - 1);
//     document.getElementById("loading_container").style.display = "block";
//     document.getElementById("download_data").style.display = "none";
//     document.getElementById("companies").disabled = true;
//     document.getElementById("get_data").disabled = true;
//     document.getElementById("chartContainer").disabled = true;
//     getting_data();
//     // console.log(data1);
// }

// function drawTable() {
//     var table_container = document.getElementById("table_container");
//     var para = document.createElement("p");
//     para.id = "para";
//     var cell = document.createTextNode("RECENT END OF DAY PRICES");
//     para.appendChild(cell);
//     table_container.appendChild(para);
//     var table = document.createElement("table");
//     table.className = "table";
//     var row = document.createElement("tr");
//     for (let i = 0; i < columns.length; i++) {
//         var col = document.createElement("th");
//         col.scope = "col";
//         cell = document.createTextNode(columns[i]);
//         col.appendChild(cell);
//         row.appendChild(col);
//     }
//     table.appendChild(row);
//     for (let i = 0; i < 7; i++) {
//         row = document.createElement("tr");
//         for (let j = 0; j < 7; j++) {
//             col = document.createElement("td");
//             console.log(typeof(data1[i][j]));
//             console.log(data1[i][j]);
//             cell = document.createTextNode(data1[i][j]);
//             col.appendChild(cell);
//             row.appendChild(col);
//         }
//         table.appendChild(row);
//     }
//     table_container.appendChild(table);
// }