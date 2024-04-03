import express from 'express';
import { connect } from 'mongoose';
import { urlencoded, json } from 'body-parser';
import { join } from 'path';



import  authRoutes from './routes/auth.js';

const app = express();

app.set('views', __dirname + '/views');

app.use(express.static(join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use(urlencoded({ extended: true }));
app.use(json());

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
app.get('/dashboard', (req, res) => {
    res.render('dashboard.ejs', {});
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


app.use((req, res, next) => {
    res.status(404).render('404_not_found.ejs');
});
app.use('/auth',authRoutes );

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
