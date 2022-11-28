import { Request, Response, NextFunction, request } from 'express';
import { verify } from 'jsonwebtoken';

interface ISubPayload {
    user: string;
    business: string;
}

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticate(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        throw Error('Token não encontrado');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decode = verify(token, 'b4e7304e870b9b8ea154b41e197bce0b');

        const { sub } = decode as ITokenPayload;

        const subPayload = JSON.parse(sub) as ISubPayload;

        request.user = {
            id: subPayload.user,
            business: subPayload.business
        }

        return next();
    } catch (error) {   
        throw Error('Token inválido');
    }
}