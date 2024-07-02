import bcrypt from 'bcryptjs';

export const cryptPassword = async (password: string): Promise<string> => {
    try {
        const hashedPassword:string = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        throw new Error('Erro ao aceitar a senha.');
    }
}