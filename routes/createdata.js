import  { Router } from 'express';  
import { Stock } from '../models/stocks.js';
import { User } from '../models/users.js';

const router = Router();

router.post('/createData', async (req, res) => {
    const stock = new Stock({
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
        lastUpdated: req.body.lastUpdated,
    });
    // await stock.save();
    res.status(200).json({ message: 'Data created successfully' });
});

router.post('/createSuperAdmin', async (req, res) => {
    const user = new User({
        name: 'Super Admin',
        username: 'superadmin@iiits.in',
        password: 'superadmin',
        roles: 'superAdmin',
    })
    await user.save();
});

export default router;