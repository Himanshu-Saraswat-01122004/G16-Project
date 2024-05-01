import  { Router } from 'express';  
import { Stock } from '../models/stocks.js';
import { User } from '../models/users.js';
import verify from '../middleware/verify.js';
import isAdmin from '../middleware/isAdmin.js';

const router = Router();

router.post('/createStock', async (req, res) => {
    // check if stock already exists
    const stockExists = await Stock.findOne({ stockId: req.body.stockId }).exec();
    if (stockExists) {
        return res.status(409).json({ message: 'Stock already exists' });
    }
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

router.delete('/deleteStock:id', isAdmin, async (req, res) => {
    const stock = await Stock.findOneAndDelete({ stockId: req.params.stockId }).exec();
    res.status(200).json({ message: 'Data deleted successfully', stock: stock });
});

router.post('/addwatchlist', verify, async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).exec();
    const stockid = req.body.stockId;
    const stock = await Stock.findOne({ stockId: stockid }).exec();
    user.watchlist.push(stock);
    await user.save();
    res.status(200).json({ message: 'Stock added to watchlist', user: user });
});
// route for remove watchlist

router.post('/removewatchlist', verify, async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).exec();
    const stockid = req.body.stockId;
    const stock = await Stock.findOne({ stockId: stockid }).exec();
    user.watchlist.pull(stock);
    await user.save();
    res.status(200).json({ message: 'Stock removed from watchlist', user: user });
});

export default router;