/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

interface CustomRequest extends Request {
  user?: jwt.JwtPayload; 
}

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET não está definido. Defina a variável de ambiente.');
}

const authJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
    req.user = decoded;
    next(); 
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export default authJWT;
