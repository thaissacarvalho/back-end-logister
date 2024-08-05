import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined');
}

export const loginController = async (req: Request, res: Response) => {
  const { identifier, password } = req.body;

  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }]
  });

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  const checkPassword = bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(401).json({ message: 'Senha incorreta.' });
  }

  try {
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '15d' });

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json('Erro no servidor.')
  }
};