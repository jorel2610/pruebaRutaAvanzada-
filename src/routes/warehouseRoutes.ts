import { Router } from 'express';
import { createWarehouse, getWarehouses, updateWarehouse, deleteWarehouse } from '../controllers/warehouseController';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware';
import { UserRole } from '../models/User';

const router = Router();

router.use(authenticateToken);

router.get('/', getWarehouses);
router.post('/', authorizeRoles(UserRole.ADMIN), createWarehouse);
router.put('/:id', authorizeRoles(UserRole.ADMIN), updateWarehouse);
router.delete('/:id', authorizeRoles(UserRole.ADMIN), deleteWarehouse);

export default router;