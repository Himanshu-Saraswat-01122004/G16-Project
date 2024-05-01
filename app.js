import express from 'express';
import { connect } from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import stockRoutes from './routes/stocks.js';
import premiumRoutes from './routes/premium.js';
import superAdminRoutes from './routes/superadmin.js';
import updateProfile from './routes/updateProfile.js';
import fetchStockPrice from './detail.js'

const app = express();

app.set('views', 'views');

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connect('mongodb://localhost:27017/G-16', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.log('Error: ', err.message);
    });

app.get('/', (req, res) => {
    res.render('Home.ejs');
});
app.get('/home', (req, res) => {
    res.render('Home.ejs');
});
app.get('/login', (req, res) => {
    res.render('login.ejs');
});
app.get('/watchlist', (req, res) => {
    res.render('watchlist.ejs');
});
app.get('/dashboard', (req, res) => {
    res.render('dashboard.ejs');
});
app.get('/forex', (req, res) => {
    res.render('forex.ejs');
});
app.get('/pricing', (req, res) => {
    res.render('pricing.ejs');
});
app.get('/about', (req, res) => {
    res.render('about.ejs'); // Render the About page
});
app.get('/profile', (req, res) => {
    res.render('profile.ejs');
});
app.get('/cal', (req, res) => {
    res.render('Cal.ejs');
});
app.get('/privacy', (req, res) => {
    res.render('privacy.ejs');
});
app.get('/terms', (req, res) => {
    res.render('terms.ejs');
});
app.get('/disclaimer', (req, res) => {
    res.render('disclaimer.ejs');
});
app.get('/decal', async (req, res) => {
    const { STOCK, ticker } = req.query;
    const data = await fetchStockPrice(STOCK, ticker);
    res.render('decal.ejs', { data });
});

app.get('/get-price', async (req, res) => {
    try {
        const { STOCK, ticker } = req.query;
        let data = await fetchStockPrice(STOCK, ticker);
        // console.log(data.price);
        if (data.price) {
            return res.json(data)
        } else {
            // console.log("Cannot get price")
        }
    } catch (error) {
        console.log("Error getting price: ", error)
    }
})

app.use('/auth', authRoutes);
app.use('/stocks', stockRoutes);
app.use('/premium', premiumRoutes);
app.use('/superadmin', superAdminRoutes);
app.use('/updateProfile', updateProfile);

app.use((req, res, next) => {
    res.status(404).render('404_not_found.ejs');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
