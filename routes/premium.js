import  { Router } from 'express';  
import { Stock } from '../models/stocks.js';
import verify from '../middleware/verify.js';

const router = Router();

// console.log('lodaded');
router.get('/premiumtest', verify,  async (req, res) => {   

    const name = req.body.name;

    const stock = await Stock.findOne({ name: name }).exec();
    if (!stock) {
        return res.status(404).json({ message: 'Stock not found' });
    }
    else{
        const data = {
            name: stock.name,
            price: stock.price,
            high: stock.high,
            low: stock.low,
            open: stock.open,
            close: stock.close,
            volume: stock.volume,
            change: stock.change,
            changePercent: stock.changePercent,
            lastUpdated: stock.lastUpdated,
        };          
        if(req.user.roles === 'user'){
            res.status(200).json(data);
        }
        else{
            res.status(200).json(stock);
        }
    }
    // res.status(200).json({ message: 'Premium data' });  
});

export default router;