import { Router } from "express";
import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import verify from "../middleware/verify.js";
import isAdmin from "../middleware/isAdmin.js";
import isSuperAdmin from "../middleware/isSuperAdmin.js";

const router = Router();

router.post("/createSuperAdmin", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: hash,
    roles: "superAdmin",
  });

  const existing = await User.findOne({ roles: "superAdmin" }).exec();
    if (existing) {
        return res.status(400).json({ message: "SuperAdmin already exists" });
    } else {
        await user.save()
        .then(() => {
            res.status(200);
        })
        .catch((err) => {
            console.log(`err: ${err}`);
        });
        res.status(200).json({ message: "SuperAdmin created successfully" });
    }
});

router.post('/makeAdmin', isSuperAdmin, async (req, res) => {
    const username = req.body.username;
    const user = await User.findOne({ username: username }).exec();
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    else{
        user.roles = 'admin';
        await user.save();
        res.status(200).json({ message: 'User is now Admin' });
    }
});

router.post('/makePremium', isAdmin, async (req, res) => {
    const username = req.body.username;
    const user = await User.findOne({ username: username }).exec();
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    else{
        user.roles = 'premium';
        await user.save();
        res.status(200).json({ message: 'User is now Premium' });
    }
});

export default router;