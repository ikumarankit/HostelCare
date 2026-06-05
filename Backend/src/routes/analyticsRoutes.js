import { Router } from 'express';
import { getAnalytics } from '../controllers/analyticsController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = Router();

router.use(protect, restrictTo('admin', 'warden'));

router.get('/', getAnalytics);

export default router;
