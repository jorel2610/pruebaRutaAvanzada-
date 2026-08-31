import { Router } from 'express';
import {
  createSupplyRequest,
  updateRequestStatus,
  getAllRequests,
  getRequestsByClinic
} from '../controllers/supplyRequestController';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware';
import { validateSupplyRequest, validateRequestStatus } from '../middlewares/validationMiddleware';
import { UserRole } from '../models/User';

const router = Router();

router.use(authenticateToken);

/**
 * @openapi
 * /api/requests:
 *   post:
 *     summary: Crear solicitud de abastecimiento (Gestor o Admin)
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clinicId:
 *                 type: integer
 *               medicineId:
 *                 type: integer
 *               warehouseId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Solicitud creada
 */
router.post('/', validateSupplyRequest, createSupplyRequest);

/**
 * @openapi
 * /api/requests/{id}/status:
 *   patch:
 *     summary: Actualizar estado de una solicitud
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pendiente, Aprobado, Rechazado, Completado]
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
router.patch('/:id/status', validateRequestStatus, updateRequestStatus);

router.get('/', getAllRequests);
router.get('/clinic/:clinicId', getRequestsByClinic);

export default router;