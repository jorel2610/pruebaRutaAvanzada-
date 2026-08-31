import { Router } from 'express';
import { createClinic, getClinics, updateClinic, deleteClinic } from '../controllers/clinicController';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware';
import { validateUniqueNit } from '../middlewares/validationMiddleware';
import { UserRole } from '../models/User';

const router = Router();

router.use(authenticateToken);

router.get('/', getClinics);
router.post('/', authorizeRoles(UserRole.ADMIN), validateUniqueNit, createClinic);
router.put('/:id', authorizeRoles(UserRole.ADMIN), updateClinic);
router.delete('/:id', authorizeRoles(UserRole.ADMIN), deleteClinic);

export default router;