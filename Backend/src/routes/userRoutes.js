import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateProfile,
  deleteUser,
} from '../controllers/userController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.patch('/profile', updateProfile);

router.get('/', restrictTo('admin'), getUsers);
router.get('/:id', restrictTo('admin'), getUserById);
router.post('/', restrictTo('admin'), createUser);
router.put('/:id', restrictTo('admin'), updateUser);
router.delete('/:id', restrictTo('admin'), deleteUser);

export default router;
