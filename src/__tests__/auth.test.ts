import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middlewares/authMiddleware';

jest.mock('jsonwebtoken');

describe('Middleware de Autenticación (Unit Tests)', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            headers: {}
        };
        res = {
            status: jest.fn().mockReturnThis() as any,
            json: jest.fn() as any
        };
        next = jest.fn() as any;
        jest.clearAllMocks();
    });

    it('Debe retornar 401 si no se proporciona el encabezado de autorización', () => {
        authenticateToken(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: expect.any(String) })
        );
        expect(next).not.toHaveBeenCalled();
    });

    it('Debe retornar 401 si el formato del token es inválido', () => {
        req.headers = { authorization: 'BearerInvalidToken' };

        authenticateToken(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    it('Debe llamar a next() si el token JWT es válido', () => {
        req.headers = { authorization: 'Bearer valid_token_string' };
        (jwt.verify as jest.Mock).mockReturnValue({ id: 1, role: 'ADMIN' });

        authenticateToken(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
    });
});