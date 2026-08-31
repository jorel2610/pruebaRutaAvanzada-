import { Request, Response } from 'express';
import { Clinic } from '../models/Clinic';

export const createClinic = async (req: Request, res: Response): Promise<void> => {
    try {
        const clinic = await Clinic.create(req.body);
        res.status(201).json(clinic);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la clínica', error });
    }
};

export const getClinics = async (_req: Request, res: Response): Promise<void> => {
    try {
        const clinics = await Clinic.findAll();
        res.json(clinics);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener clínicas', error });
    }
};

export const updateClinic = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const [updated] = await Clinic.update(req.body, { where: { id } });
        if (!updated) {
            res.status(404).json({ message: 'Clínica no encontrada' });
            return;
        }
        res.json({ message: 'Clínica actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar clínica', error });
    }
};

export const deleteClinic = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deleted = await Clinic.destroy({ where: { id } });
        if (!deleted) {
            res.status(404).json({ message: 'Clínica no encontrada' });
            return;
        }
        res.json({ message: 'Clínica eliminada lógicamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar clínica', error });
    }
};