import { Router } from 'express';
import { createRaid, getRaids } from '../controllers/raidController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/raids', authMiddleware, createRaid);
router.get('/raids', getRaids);

export default router;
