import { Request, Response } from 'express';
import User from '../models/User.js';
import { checkUsername } from '../utils/checkUsername';
import { cryptPassword } from '../utils/cryptPassword';

const userController = {
    async index(req: Request, res: Response) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar os usuários' });
        }
    },

    async register(req: Request, res: Response) {
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
    },

    async edit(req: Request, res: Response) {
        const { _id } = req.params;
        const { field, value } = req.body;

        try {
            let updatedUser;
            switch (field) {
                case 'name':
                    updatedUser = await User.findByIdAndUpdate(_id, { name: value }, { new: true });
                    break;
                case 'username': {
                    const existingUser = await checkUsername(value);
                    if (existingUser) {
                        return res.status(400).json({ error: 'Username já está em uso.' });
                    }
                    updatedUser = await User.findByIdAndUpdate(_id, { username: value }, { new: true });
                    break;
                }
                case 'password': {
                    const hashedPassword = await cryptPassword(value);
                    updatedUser = await User.findByIdAndUpdate(_id, { password: hashedPassword }, { new: true });
                    break;
                }
                default:
                    return res.status(400).json({ error: 'Campo inválido.' });
            }

            if (!updatedUser) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            return res.json(updatedUser);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: `${error.message}` });
            } else {
                res.status(500).json({ message: 'Server error' });
            }
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const username = req.params.username;
            const user = await User.findOneAndDelete({username});

            if(!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            res.status(200).json({ message: 'Usuário deletado com sucesso.' });

        } catch (error) {
            res.status(500).json({ message: 'Falha ao excluir o usuário.', error });
        }
    }
}

export default userController;
