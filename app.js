const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const html = require('html');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const notifier = require('node-notifier');

const app = express();
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public'))); 

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/G-16', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to DB');
    })
    .catch(err => {
        console.log('Error: ', err.message);
    });

    
    const newuser = new mongoose.Schema({
        name: String,
        username: String,
        password: String
    });
    const User = mongoose.model('User', newuser);
    
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
const SaltRounds = bcrypt.genSaltSync(10);
app.post('/signup', async (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, SaltRounds);

    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: hash,
    });
    await user.save()
        .then(() => {
            res.status(200);
        })
        .catch(err => {
            console.log(`err: ${err}`);
        });
    res.redirect('/login');
});

app.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hash = bcrypt.hashSync(password, SaltRounds);
    const user = await User.findOne({ username: username, password: hash });
    if (user) {
        res.redirect('/dashboard');
    } else {
        notifier.notify({
            title: 'Login',
            message: 'Invalid username or password',
        });
        // error('Invalid username or password');
        res.redirect('/login');
    }
});

app.use((req, res, next) => {
    res.status(404).render('404_not_found.ejs');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});