import { User } from '../models/users.js';
import verify from '../middleware/verify.js';
import router from './auth.js';
import jwt from 'jsonwebtoken';

router.post('/updateProfilecontent',verify, async (req, res) => {
    const user = await User.findOne({ username: req.user.username });
    user.name = req.body.name;
    user.DOB = req.body.DOB;
    // calculate age
    const today = new Date();
    const birthDate = new Date(user.DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    user.Age = age;
    user.phoneno = req.body.phoneno;
    user.gender = req.body.gender;
    user.Aadhar = req.body.Aadhar;
    user.PanNo = req.body.PanNo;
    user.address = req.body.address;
    user.country = req.body.country;
    user.state = req.body.state;
    user.city = req.body.city;
    user.pincode = req.body.pincode;
    user.about = req.body.about;
    user.lastUpdated = Date.now();
    await user.save();
    res.status(200).json({ message: 'Profile updated successfully' });
});

export default router;