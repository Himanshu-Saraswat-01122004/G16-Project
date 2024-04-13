import { connect, Schema, model } from 'mongoose';

export const newuser = new Schema({
    name: String,
    // username should be uniuqe so that we can use it as a primary key
    username: {
        type: String,
        unique: true,
    },
    password: String,
    isAdmin: {
        type: Boolean,
        default: false,
    }
});
export const User = model('User', newuser);
