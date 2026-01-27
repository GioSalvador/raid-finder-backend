import { Router } from 'express';
import { createRaid, getRaids } from '../controllers/raidController.js';

const router = Router();

router.post('/raids', createRaid);
router.get('/raids', getRaids);

export default router;
