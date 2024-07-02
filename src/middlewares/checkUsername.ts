import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";

export const checkUsernameExists = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;

    try {
        const existUser = await User.findOne({ username });
        if (existUser) {
            return res.status(400).json({ message: 'Nome de usuário já existe.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao verificar existencia de usuário.', error });
    }
}