import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface User extends Document {
    name: string,
    username: string,
    email: string,
    password: string,
    comparePassword: (password: string) => Promise<boolean>;
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

UserSchema.pre<User>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

UserSchema.methods.comparePassword = function (password: string) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model<User>('User', UserSchema);