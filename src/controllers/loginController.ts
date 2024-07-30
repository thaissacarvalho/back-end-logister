/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { authLogin } from '../services/authLogin';

export const loginController = async (req: Request, res: Response) => {
    try {
        const { identifier, password } = req.body;
        const token = await authLogin(identifier, password);
        res.json(`Token gerado! Acesso concedido: ${token}`)
    } catch (error:any) {
        res.status(400).json(error.message);
    }
};

export default loginController;