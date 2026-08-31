import { Router } from 'express';
import multer from 'multer';
import { uploadSeederJson } from '../controllers/seederController';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

/**
 * @openapi
 * /api/seeders/upload/{entity}:
 *   post:
 *     summary: Cargar archivo JSON para poblar base de datos (Seeder)
 *     tags:
 *       - Seeders
 *     parameters:
 *       - in: path
 *         name: entity
 *         required: true
 *         schema:
 *           type: string
 *           enum: [users, clinics, warehouses, medicines]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Base de datos poblada exitosamente
 */
router.post('/upload/:entity', upload.single('file'), uploadSeederJson);

export default router;