import { Router } from 'express';
import { createMedicine, getMedicines, updateMedicine, deleteMedicine } from '../controllers/medicineController';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware';
import { UserRole } from '../models/User';

const router = Router();

router.use(authenticateToken);

router.get('/', getMedicines);
router.post('/', authorizeRoles(UserRole.ADMIN), createMedicine);
router.put('/:id', authorizeRoles(UserRole.ADMIN), updateMedicine);
router.delete('/:id', authorizeRoles(UserRole.ADMIN), deleteMedicine);

export default router;