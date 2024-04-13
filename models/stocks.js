import { connect, Schema, model } from 'mongoose';

export const stocks = new Schema({ 
    name: String,
    price: Number,
    high: Number,
    low: Number,
    open: Number,
    close: Number,
    volume: Number,
    change: Number,
    changePercent: Number,
    marketCap: Number,
    peRatio: Number,
    week52High: Number,
    week52Low: Number,
    ytdChange: Number,
    lastUpdated: String,
});

export const Stock = model('Stock', stocks);
// give some hardcoded data
const stock1 = new Stock({
    name: 'AAPL',
    price: 150.0,
    high: 150.0,
    low: 150.0,
    open: 150.0,
    close: 150.0,
    volume: 150.0,
    change: 150.0,
    changePercent: 150.0,
    marketCap: 150.0,
    peRatio: 150.0,
    week52High: 150.0,
    week52Low: 150.0,
    ytdChange: 150.0,
    lastUpdated: '2021-08-06',
});
const stock2 = new Stock({  
    name: 'GOOGL',
    price: 150.0,
    high: 150.0,
    low: 150.0,
    open: 150.0,
    close: 150.0,
    volume: 150.0,
    change: 150.0,
    changePercent: 150.0,
    marketCap: 150.0,
    peRatio: 150.0,
    week52High: 150.0,
    week52Low: 150.0,
    ytdChange: 150.0,
    lastUpdated: '2021-08-06',
});
const stock3 = new Stock({  
    name: 'AMZN',
    price: 150.0,
    high: 150.0,
    low: 150.0,
    open: 150.0,
    close: 150.0,
    volume: 150.0,
    change: 150.0,
    changePercent: 150.0,
    marketCap: 150.0,
    peRatio: 150.0,
    week52High: 150.0,
    week52Low: 150.0,
    ytdChange: 150.0,
    lastUpdated: '2021-08-06',
}); 
const stock4 = new Stock({  
    name: 'MSFT',
    price: 150.0,
    high: 150.0,
    low: 150.0,
    open: 150.0,
    close: 150.0,
    volume: 150.0,
    change: 150.0,
    changePercent: 150.0,
    marketCap: 150.0,
    peRatio: 150.0,
    week52High: 150.0,
    week52Low: 150.0,
    ytdChange: 150.0,
    lastUpdated: '2021-08-06',
}); 

// stock1.save();
// stock2.save();
// stock3.save();
// stock4.save();

