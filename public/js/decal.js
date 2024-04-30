console.log("decal.js");

const fetchPrice = () => {
    let priceElement = document.querySelector("#price");
    let detailElement = document.querySelector("#detail");
    let nameElement = document.querySelector("#name");
    let closeElement = document.querySelector("#close");
    let dayElement = document.querySelector("#day");
    let yearElement = document.querySelector("#year");
    let capElement = document.querySelector("#cap");
    let volumeElement = document.querySelector("#volume");
    let ratioElement = document.querySelector("#ratio");
    let devElement = document.querySelector("#dividend");
    let exchangeElement = document.querySelector("#exchange");
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);


    fetch(`/get-price?${params}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data.price);
        // console.log(parseInt(priceElement.innerHTML))
        priceElement.innerHTML = parseFloat(data.price);
        detailElement.innerHTML = data.detail;
        nameElement.innerHTML = data.name;
        closeElement.innerHTML = data.close;
        dayElement.innerHTML = data.day;
        yearElement.innerHTML = data.year;
        capElement.innerHTML = data.cap;
        volumeElement.innerHTML = data.volume;
        ratioElement.innerHTML = data.ratio;
        devElement.innerHTML = data.dividend;
        exchangeElement.innerHTML = data.exchange;
    })
}

setInterval(fetchPrice, 1000)