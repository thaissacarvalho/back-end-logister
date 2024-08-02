import bcrypt from 'bcrypt';

export const cryptPassword = async (password: string) => {
    try {
        const hashedPassword:string = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        throw new Error('Erro ao criptografar a senha.');
    }
}