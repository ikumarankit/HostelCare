import { Router } from 'express';
import {
  getComplaints,
  getComplaintById,
  createComplaint,
  updateComplaintStatus,
  deleteComplaint,
} from '../controllers/complaintController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/', getComplaints);
router.get('/:id', getComplaintById);
router.post('/', createComplaint);
router.patch('/:id', updateComplaintStatus);
router.delete('/:id', deleteComplaint);

export default router;
