import { Router } from 'express';
import {
  createUser,
  getUsers,
  deleteUser,
  login,
  updateUser,
  getMe,
} from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/signup', createUser);
router.post('/login', login);
router.get('/users', getUsers);

router.put('/users/me', authMiddleware, updateUser);
router.delete('/users/me', authMiddleware, deleteUser);
router.get('/users/me', authMiddleware, getMe);

export default router;
