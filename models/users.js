import { connect, Schema, model } from 'mongoose';

export const roles = ['user', 'admin', 'permiumUser', 'superAdmin'];

export const newuser = new Schema({

    name: String,
    username: {
        type: String,
        unique: true,
    },
    password: String,
    roles: {
        type: String,
        default: 'user',
        enum: roles,
    },
    DOB: Date,
    Age: Number,
    phoneno: Number,
    gender: String,
    Aadhar: Number,
    PanNo: String,
    address: String,
    country: String,
    state: String,
    city: String,
    pincode: Number,
    about: String,
    watchlist: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Stock',
        },
    ],
    created: {
        type: Date,
        default: Date.now,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    }
});


export const User = model('User', newuser);