import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../models/User';

export interface AuthRequest extends Request {
    user?: { id: number; role: UserRole };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
        return;
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: number; role: UserRole };
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token inválido o expirado.' });
    }
};

export const authorizeRoles = (...roles: UserRole[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ message: 'No tienes permisos para realizar esta acción.' });
            return;
        }
        next();
    };
};