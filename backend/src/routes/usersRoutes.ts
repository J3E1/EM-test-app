import { Router } from 'express';
import { protect, restrictedTo } from '../middleware/authMiddleware';
import { getAllEmployees, getEmployee } from '../controllers/userControllers';

const userRouter = Router();

userRouter.get('/', protect, restrictedTo('manager'), getAllEmployees);
userRouter.get('/:id', protect, getEmployee);

export default userRouter;
