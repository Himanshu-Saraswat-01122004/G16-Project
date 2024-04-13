import { Router } from 'express';
import { User } from '../models/users.js';
import { genSaltSync, getRounds, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();
const SaltRounds = genSaltSync(10);

router.post('/signup', async (req, res) => {
    const hash = hashSync(req.body.password, SaltRounds);

    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: hash,
        isAdmin: req.body.isAdmin,  
    });
    // if username is already taken then return 400 status code
    const existing = await User.findOne({ username: req.body.username }).exec();
    if(existing) {
        return res.status(400).json({ message: 'Username already taken' });
    }
    else{
        await user.save()
            .then(() => {
                res.status(200);
            })
            .catch((err) => {
                console.log(`err: ${err}`);
            });
        
        res.status(200).json({ message: 'User created successfully' });
        // res.redirect('/login');
    }
});

let refreshTokens = [];     
router.post('/refresh', (req,res) => {
    const refreshToken = req.body.token;

    if(!refreshToken) return res.status(401).json({ message: 'User not authenticated' });
    if(!refreshTokens.includes(refreshToken)) return res.status(403).json({ message: 'Refresh token is not valid' });

    jwt.verify(refreshToken, "myrefreshSecretkey", (err, user) => {
        err && console.log(err);
        refreshTokens = refreshTokens.filter(token => token !== refreshToken);
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
});

const generateAccessToken = (user) => {
    return jwt.sign({ username: user.username, isAdmin: user.isAdmin }, 'mySecretKey', 
    { expiresIn: '15m' });
}
const generateRefreshToken = (user) => {
    return jwt.sign({ username: user.username, isAdmin: user.isAdmin }, 'myrefreshSecretkey');
}       
router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hash = hashSync(password, SaltRounds);
    const user = await User.findOne({ username: username, password: hash }).exec();
    if (user) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        // res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
        // res.status(200).json(user);
        res.status(200).json({user, accessToken: accessToken, refreshToken: refreshToken});
    } else {
        // res.redirect('/login');
        res.status(401).json({ message: 'Invalid credentials' });
    }
});


const verify = (req, res, next) => {
    const authHeader = req.headers.authorization; 
    if(authHeader) {
        const token = authHeader.split(' ')[1];
         jwt.verify(token, 'mySecretKey', (err, user) => {  
                if(err) {
                    return res.status(403).json({ message: 'Token is not valid' });
                }
                req.user = user;
                next();
            }       
            );
        }
        else {
            res.status(401).json({ message: 'You are not authenticated' });
        }
};

router.delete("/delete/:id", verify, async (req, res) => {
    if(req.user.isAdmin || req.user.id === req.params.id) {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    }
    else {
        res.status(403).json({ message: 'You are not allowed to delete this user' });
    }
});

router.post('/logout', verify, (req, res) =>{
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully");
});

export default router;