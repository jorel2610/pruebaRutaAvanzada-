import { Request, Response } from 'express';
import { Warehouse } from '../models/Warehouse';

export const createWarehouse = async (req: Request, res: Response): Promise<void> => {
    try {
        const warehouse = await Warehouse.create(req.body);
        res.status(201).json(warehouse);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el almacén', error });
    }
};

export const getWarehouses = async (_req: Request, res: Response): Promise<void> => {
    try {
        const warehouses = await Warehouse.findAll();
        res.json(warehouses);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener almacenes', error });
    }
};

export const updateWarehouse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const [updated] = await Warehouse.update(req.body, { where: { id } });
        if (!updated) {
            res.status(404).json({ message: 'Almacén no encontrado' });
            return;
        }
        res.json({ message: 'Almacén actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar almacén', error });
    }
};

export const deleteWarehouse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deleted = await Warehouse.destroy({ where: { id } });
        if (!deleted) {
            res.status(404).json({ message: 'Almacén no encontrado' });
            return;
        }
        res.json({ message: 'Almacén eliminado lógicamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar almacén', error });
    }
};