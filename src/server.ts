import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const dbURL = process.env.DB_HOST as string;
const PORT: number = 3000;

const app = express();

mongoose.connect(dbURL)
    .then(() => {
        app.emit('All include!');
        console.log('Connected to database LOGISTER');
    }).catch((e: string) => console.log(e)); 

app.on('All include', () => {
    app.listen(PORT, () => {
        console.log('Servidor executando... \n Acessar http://localhost:3000');
    });
});
