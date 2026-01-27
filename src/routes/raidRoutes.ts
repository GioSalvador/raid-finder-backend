import { Router } from 'express';
import { createRaid, deleteRaid, getRaids, updateRaid } from '../controllers/raidController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/raids', authMiddleware, createRaid);
router.get('/raids', getRaids);
router.put('/raids/:id', authMiddleware, updateRaid);
router.delete('/raids/:id', authMiddleware, deleteRaid);

export default router;
