// services/authLogin.ts
import User from "../models/User";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET não está definido. Defina a variável de ambiente.');
}

export const authLogin = async (identifier: string, password: string) => {
    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });

    if (!user) {
        throw new Error('Invalid username/email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid username/email or password');
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '15d' });
    return token;
}
