import  { Router } from 'express';  
import { Stock } from '../models/stocks.js';

const router = Router();

router.post('/createStock', async (req, res) => {
    const stock = new Stock({
        stockId: req.body.stockId,
        name: req.body.name,
        price: req.body.price,
        high: req.body.high,
        low: req.body.low,
        open: req.body.open,
        close: req.body.close,
        volume: req.body.volume,
        change: req.body.change,
        changePercent: req.body.changePercent,
        marketCap: req.body.marketCap,
        peRatio: req.body.peRatio,
        week52High: req.body.week52High,
        week52Low: req.body.week52Low,
        ytdChange: req.body.ytdChange,
    });
    await stock.save();
    res.status(200).json({ message: 'Data created successfully', stock: stock });
});

router.post('/updateStock', async (req, res) => {
    const stock = await Stock.findOneAndUpdate({ stockId: req.params.stockId }, {...req.body}).exec();
    res.status(200).json({ message: 'Data updated successfully', stock: stock });
});


export default router;