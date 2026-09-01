import { Router } from 'express';
import { getClinics, createClinic } from '../controllers/clinicController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/clinics:
 *   get:
 *     summary: Obtener todas las clínicas
 *     tags: [Clinics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clínicas
 */
router.get('/', authenticateToken, getClinics);

/**
 * @swagger
 * /api/clinics:
 *   post:
 *     summary: Crear una nueva clínica
 *     tags: [Clinics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Clínica creada
 */
router.post('/', authenticateToken, createClinic);

export default router;