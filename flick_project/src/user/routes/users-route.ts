import express from 'express';
import { getUserProfileController, login, register } from '../controller';
import { authUser } from '../../middleware';

const router = express.Router();

router.post('/login', login)
router.post('/register', register)
router.get('/user/profile', authUser ,getUserProfileController)

export default router;