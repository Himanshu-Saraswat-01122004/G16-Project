const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const html = require('html');
// mongosh-encryption
const encrypt = require('mongoose-encryption');
//https://sites.google.com/site/odeluvanga/home
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
const secret = 'Thisisourlittlesecret.';
newuser.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });
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
app.get('/watchlist', (req, res) => {
    res.render('watchlist.ejs');
});
app.get('/forex', (req, res) => {
    res.render('forex.ejs');
});
app.get('/pricing', (req, res) => {
    res.render('pricing.ejs');
});
app.get('/about', (req, res) => {
    res.render('about.ejs');
});
app.post('/logo', (req, res) => {
    res.redirect('/');
});
app.post('/logo', (req, res) => {
    res.redirect('/');
});
app.post('/signup', async (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    });
    await user.save()
        .then(() => {
            res.status(200);
        })
        .catch(err => {
            console.log(`err: ${err}`);
        });
    res.redirect('/');
});

app.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ username: username, password: password });
    if (user) {
        res.redirect('/');
    } else {
        alert('Invalid username or password');
        res.redirect('/login');
    }
});

app.use((req, res, next) => {
    res.status(404).render('404_not_found.ejs');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});