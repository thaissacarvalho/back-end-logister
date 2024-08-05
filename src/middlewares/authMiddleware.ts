import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json('Acesso negado!');

  try {

    const jwtSecret: any = process.env.JWT_SECRET;

    jwt.verify(token, jwtSecret);

    next();

  } catch (error) {
    res.status(400).json({ message: "Token inválido!" })
  }
};
