import User from "../models/User.js";

export const checkUsername = async (username: string): Promise<boolean> => {
    try {
        const existingUser = await User.findOne({ username });
        return !!existingUser;
    } catch (error) {
        console.error({ message: 'Erro ao verificar existência de usuário.', error });
        return true;
    }
}