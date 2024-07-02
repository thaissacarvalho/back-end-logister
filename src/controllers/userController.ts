import { Request, Response } from 'express';
import User from '../models/User.js';
import { checkUsername } from '../utils/checkUsername.ts';
import { cryptPassword } from '../utils/cryptPassword.ts';

export const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar os usuários' });
    }
}

export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, username, email, password } = req.body
    try {
        const usernameExists = await checkUsername(username);
        const hashedPassword = await cryptPassword(password);

        if (usernameExists) {
            res.status(400).json({ message: 'Username já existe' });
        }

        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'O usuário foi criado com sucesso.' })

    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar o usuário.' });
        console.log(error);
    }
}

