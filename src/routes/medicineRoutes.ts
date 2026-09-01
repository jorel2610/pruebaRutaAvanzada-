import { Router } from 'express';
import { getMedicines, createMedicine } from '../controllers/medicineController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/medicines:
 *   get:
 *     summary: Obtener listado de medicamentos
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de medicamentos
 */
router.get('/', authenticateToken, getMedicines);

/**
 * @swagger
 * /api/medicines:
 *   post:
 *     summary: Registrar un nuevo medicamento
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Medicamento creado
 */
router.post('/', authenticateToken, createMedicine);

export default router;