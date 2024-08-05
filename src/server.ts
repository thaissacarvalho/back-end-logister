import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import route from './routes/routes.js';

dotenv.config();

const dbURL = process.env.DB_HOST as string;
const PORT: number = 3000;

mongoose.connect(dbURL)
    .then(() => {
        app.emit('All include!');
        console.log('Connected to database');
    }).catch((e: string) => console.log(e));

const app = express();

app.on('All include!', () => {
    app.listen(PORT, () => {
        console.log('Servidor executando... \n Acessar http://localhost:3000');
    });
});

app.use(express.json());
app.use('/api', route);