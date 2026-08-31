import { Request, Response } from 'express';
import { SupplyRequest } from '../models/SupplyRequest';
import { Medicine } from '../models/Medicine';
import { Clinic } from '../models/Clinic';
import { Warehouse } from '../models/Warehouse';

export const createSupplyRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { clinicId, medicineId, warehouseId, quantity, status } = req.body;

        const request = await SupplyRequest.create({
            clinicId,
            medicineId,
            warehouseId,
            quantity,
            status: status || 'Pendiente'
        });

        const medicine = await Medicine.findByPk(medicineId);
        if (medicine) {
            medicine.stock -= quantity;
            await medicine.save();
        }

        res.status(201).json({ message: 'Solicitud de abastecimiento creada exitosamente', request });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la solicitud', error });
    }
};

export const updateRequestStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const request = await SupplyRequest.findByPk(Number(id));
        if (!request) {
            res.status(404).json({ message: 'Solicitud no encontrada.' });
            return;
        }

        request.status = status;
        await request.save();

        res.json({ message: 'Estado de solicitud actualizado correctamente', request });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado', error });
    }
};

export const getAllRequests = async (_req: Request, res: Response): Promise<void> => {
    try {
        const requests = await SupplyRequest.findAll({
            include: [Clinic, Medicine, Warehouse]
        });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error al consultar las solicitudes', error });
    }
};

export const getRequestsByClinic = async (req: Request, res: Response): Promise<void> => {
    try {
        const { clinicId } = req.params;
        const requests = await SupplyRequest.findAll({
            where: { clinicId },
            include: [Clinic, Medicine, Warehouse]
        });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el historial de la clínica', error });
    }
};