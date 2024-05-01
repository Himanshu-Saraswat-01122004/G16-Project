import axios from 'axios';
import * as cheerio from 'cheerio';


console.log("Running")

const fetchStockPrice = async (STOCK, ticker) => {
    const url = `https://www.google.com/finance/quote/${STOCK}:${ticker}`;
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const priceText = $('.YMlKec.fxKbKc').first().text().trim().substring(1).replace(/,/g, '');
        const price = parseFloat(priceText);
        const close = $($('.P6K39c')[0]).text();
        const day = $($('.P6K39c')[1]).text();
        const year = $($('.P6K39c')[2]).text();
        const cap = $($('.P6K39c')[3]).text();
        const volume = $($('.P6K39c')[4]).text();
        const ratio = $($('.P6K39c')[5]).text();
        const dividend = $($('.P6K39c')[6]).text();
        const exchange = $($('.P6K39c')[7]).text();
        const detail = $('.bLLb2d').text();
        const name = $('.zzDege').text();
        const data = {
            "name": name,
            "price": price,
            "detail": detail,
            "close" : close,
            "day" : day,
            "year" : year,
            "cap" : cap,
            "volume" : volume,
            "ratio" : ratio,
            "dividend" : dividend,
            "exchange" : exchange
        }
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
};

export default fetchStockPrice;
// export default fetchDetail;
// setInterval(fetchStockPrice, 5000);
