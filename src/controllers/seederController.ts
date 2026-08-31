import { Request, Response } from 'express';
import { User } from '../models/User';
import { Clinic } from '../models/Clinic';
import { Warehouse } from '../models/Warehouse';
import { Medicine } from '../models/Medicine';

export const uploadSeederJson = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'Por favor adjunta un archivo JSON.' });
            return;
        }

        const jsonData = JSON.parse(req.file.buffer.toString('utf-8'));
        const entity = req.params.entity as string; // <--- Casteo explícito a string

        switch (entity.toLowerCase()) {
            case 'users':
                await User.bulkCreate(jsonData);
                break;
            case 'clinics':
                await Clinic.bulkCreate(jsonData, { validate: true });
                break;
            case 'warehouses':
                await Warehouse.bulkCreate(jsonData);
                break;
            case 'medicines':
                await Medicine.bulkCreate(jsonData);
                break;
            default:
                res.status(400).json({ message: 'Entidad de Seeder no válida.' });
                return;
        }

        res.json({ message: `Datos poblados exitosamente en la entidad ${entity}` });
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar el archivo Seeder', error });
    }
};