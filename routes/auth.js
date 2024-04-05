import { Router } from "express";
import { User } from "../models/users.js";
import { genSaltSync, hashSync } from 'bcrypt';

export const router = Router();

const SaltRounds = genSaltSync(10);
router.post('/signup', async (req, res) => {
    console.log("loda");
    const hash = hashSync(req.body.password, SaltRounds);

    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: hash,
    });
    await user.save()
        .then(() => {
            res.status(200);
        })
        .catch((err) => {
            console.log(`err: ${err}`);
        });
        // res.status(200).json({message : "User created successfully"});
        res.redirect('/login');
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hash = hashSync(password, SaltRounds);
    const user = await User.findOne({ username: username, password: hash });
    if (user) {
        res.redirect('/dashboard');
    } else {
        // notify({
        //     title: 'Login',
        //     message: 'Invalid username or password',
        // });
        // error('Invalid username or password');
        res.redirect('/login');
    }
});
