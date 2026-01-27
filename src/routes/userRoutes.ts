import { Router } from 'express';
import {
  createUser,
  getUsers,
  deleteUser,
  login,
  updateUser,
} from '../controllers/userController.js';

const router = Router();

router.post('/signup', createUser);
router.post('/login', login);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
