import { Router } from 'express';
import { User } from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import verify from '../middleware/verify.js';

const router = Router();

router.post('/signup', async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: hash,
        roles: req.body.roles,
    });

    const existing = await User.findOne({ username: req.body.username }).exec();
    if (existing) {
        return res.status(400).json({ message: 'Username already taken' });
    } else {
        await user
            .save()
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

const generateAccessToken = (user) => {
    return jwt.sign(
        { username: user.username, roles: user.roles },
        'mySecretKey',
        { expiresIn: '1d' }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { username: user.username, roles: user.roles },
        'myrefreshSecretkey'
    );
};

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ username: username }).exec();
    if (!user) {
        res.status(401).json({ message: 'Invalid Credentials' });
        return;
    }
    console.log(user);
    const ispassvalid = await bcrypt.compare(password, user.password);
    if (ispassvalid) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.status(200).json({
            user,
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
        // res.status(200).json({ message: 'User logged in successfully' });
    } else {
        res.status(401).json({ message: 'Wrong Passwrod' });
    }
});

let refreshTokens = [];
router.post('/refresh', (req, res) => {
    const refreshToken = req.body.token;

    if (!refreshToken)
        return res.status(401).json({ message: 'User not authenticated' });
    if (!refreshTokens.includes(refreshToken))
        return res.status(403).json({ message: 'Refresh token is not valid' });

    jwt.verify(refreshToken, 'myrefreshSecretkey', (err, user) => {
        err && console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    });
});

router.delete('/delete/:id', verify, async (req, res) => {
    if (
        req.user.roles === 'admin' ||
        req.user.roles === 'superAdmin' ||
        req.user.id === req.params.id
    ) {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } else {
        res.status(403).json({
            message: 'You are not allowed to delete this user',
        });
    }
});

router.post('/logout', verify, (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json('You logged out successfully');
});

export default router;
