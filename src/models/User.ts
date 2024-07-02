import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
    name: string,
    username: string,
    email: string,
    password: string
}

const UserSchema: Schema<User> = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model<User>('User', UserSchema);