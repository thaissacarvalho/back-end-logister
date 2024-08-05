import User from "../models/User";
import { Request, Response } from "express";

export const privateController = async (req: Request, res: Response) => {
    const id = req.params._id;

    const user = await User.findById(id, '-password');

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ user });
}