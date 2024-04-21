import { connect, Schema, model } from 'mongoose';

// define the role also
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
    }
});

export const User = model('User', newuser);