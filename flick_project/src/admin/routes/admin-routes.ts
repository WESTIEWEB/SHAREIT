import { Router } from 'express';
import { controllerCreateAdmin, controllerCreateSuperAdmin } from '../controllers';
import { authAdmin } from '../../middleware';

const router = Router();

router.post('/create-super-admin', controllerCreateSuperAdmin)
router.post('/create-admin', authAdmin, controllerCreateAdmin)

export default router;