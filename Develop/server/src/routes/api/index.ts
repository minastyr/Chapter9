import { Router } from 'express';
const router = Router();

import weatherRoutes from './weatherRoutes.js';
import historyRoutes from './historyRoutes.js';


router.use('/weather', weatherRoutes);

export default router;
