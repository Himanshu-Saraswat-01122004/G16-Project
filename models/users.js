import { connect, Schema, model } from 'mongoose';

export const newuser = new Schema({
    name: String,
    username: String,
    password: String
});
export const User = model('User', newuser);
