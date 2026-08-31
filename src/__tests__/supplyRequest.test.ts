import { validateSupplyRequest, validateRequestStatus } from '../middlewares/validationMiddleware';
import { Request, Response, NextFunction } from 'express';

describe('Middlewares de Validación de Solicitudes (Unit Tests)', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        nextFunction = jest.fn();
    });

    test('Debe retornar error 400 si la cantidad solicitada es menor o igual a cero', async () => {
        mockRequest.body = {
            clinicId: 1,
            medicineId: 1,
            warehouseId: 1,
            quantity: 0,
        };

        await validateSupplyRequest(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'La cantidad solicitada debe ser mayor a cero.',
        });
    });

    test('Debe retornar error 400 si el estado enviado no pertenece al Enum permitido', () => {
        mockRequest.body = {
            status: 'EstadoInvalidoPrueba',
        };

        validateRequestStatus(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'El estado enviado no es válido.',
        });
    });

    test('Debe llamar a next() si el estado enviado es un estado permitido', () => {
        mockRequest.body = {
            status: 'Aprobado',
        };

        validateRequestStatus(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toHaveBeenCalled();
    });
});