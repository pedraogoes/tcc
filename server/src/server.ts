import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors';
import { AppErrors } from './shared/errors/AppErrors';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppErrors) {
        return res.status(err.statusCode).json({ 
            status: 'error', message: err.message
        });
    }

    return res.status(500).json({ message: 'Erro interno servidor' });
})

app.listen(3001, () => {
    console.log('Server port 3001');
});
