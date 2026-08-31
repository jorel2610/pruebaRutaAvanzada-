import { Request, Response, NextFunction } from 'express';
import { Clinic } from '../models/Clinic';
import { Medicine } from '../models/Medicine';
import { Warehouse } from '../models/Warehouse';
import { RequestStatus } from '../models/SupplyRequest';

export const validateSupplyRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { clinicId, medicineId, warehouseId, quantity } = req.body;

    if (quantity <= 0) {
        res.status(400).json({ message: 'La cantidad solicitada debe ser mayor a cero.' });
        return;
    }

    const clinic = await Clinic.findByPk(clinicId);
    if (!clinic) {
        res.status(404).json({ message: 'La clínica especificada no existe.' });
        return;
    }

    const warehouse = await Warehouse.findByPk(warehouseId);
    if (!warehouse) {
        res.status(404).json({ message: 'El almacén especificado no existe.' });
        return;
    }

    const medicine = await Medicine.findByPk(medicineId);
    if (!medicine) {
        res.status(404).json({ message: 'El medicamento especificado no existe.' });
        return;
    }

    if (medicine.stock < quantity) {
        res.status(400).json({ message: 'El almacén o inventario no cuenta con stock suficiente.' });
        return;
    }

    next();
};

export const validateUniqueNit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { nit } = req.body;
    const existingClinic = await Clinic.findOne({ where: { nit } });
    if (existingClinic) {
        res.status(400).json({ message: 'Ya existe una clínica registrada con ese NIT.' });
        return;
    }
    next();
};

export const validateRequestStatus = (req: Request, res: Response, next: NextFunction): void => {
    const { status } = req.body;
    if (status && !Object.values(RequestStatus).includes(status)) {
        res.status(400).json({ message: 'El estado enviado no es válido.' });
        return;
    }
    next();
};