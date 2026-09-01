import { Router } from 'express';
import { getWarehouses, createWarehouse } from '../controllers/warehouseController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/warehouses:
 *   get:
 *     summary: Obtener todos los almacenes
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de almacenes
 */
router.get('/', authenticateToken, getWarehouses);

/**
 * @swagger
 * /api/warehouses:
 *   post:
 *     summary: Crear un almacén
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Almacén creado
 */
router.post('/', authenticateToken, createWarehouse);

export default router;