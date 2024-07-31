import User from "../models/User.js";

export const checkUsername = async (username: string) => {
    try {
        const existingUser = await User.findOne({ username });
        return !!existingUser;
    } catch (error) {
        console.error({ message: 'Erro ao verificar existência de usuário.', error });
    }
}

export const checkEmail = async (email: string) => {
    try {
        const existingEmail = await User.findOne({ email });
        return !!existingEmail;
    } catch (error) {
        console.error({ message: 'Erro ao verificar existência de usuário.', error});
    }
}