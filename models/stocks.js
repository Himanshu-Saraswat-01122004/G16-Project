import { connect, Schema, model } from 'mongoose';

export const stocks = new Schema({ 
    stockId: {
        type: String,
        unique: true,
        required: true,
    },    
    name: {
        type: String,   
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
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
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

export const Stock = model('Stock', stocks);
