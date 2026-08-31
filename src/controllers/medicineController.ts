import { Request, Response } from 'express';
import { Medicine } from '../models/Medicine';

export const createMedicine = async (req: Request, res: Response): Promise<void> => {
    try {
        const medicine = await Medicine.create(req.body);
        res.status(201).json(medicine);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el medicamento', error });
    }
};

export const getMedicines = async (_req: Request, res: Response): Promise<void> => {
    try {
        const medicines = await Medicine.findAll();
        res.json(medicines);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener medicamentos', error });
    }
};

export const updateMedicine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const [updated] = await Medicine.update(req.body, { where: { id } });
        if (!updated) {
            res.status(404).json({ message: 'Medicamento no encontrado' });
            return;
        }
        res.json({ message: 'Medicamento actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar medicamento', error });
    }
};

export const deleteMedicine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deleted = await Medicine.destroy({ where: { id } });
        if (!deleted) {
            res.status(404).json({ message: 'Medicamento no encontrado' });
            return;
        }
        res.json({ message: 'Medicamento eliminado lógicamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar medicamento', error });
    }
};