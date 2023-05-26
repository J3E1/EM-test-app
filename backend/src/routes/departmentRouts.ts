import { Router } from 'express';
import {
	createDepartment,
	deleteDepartment,
	getAllDepartments,
	getDepartmentById,
	updateDepartment,
} from '../controllers/departmentControllers';
import { protect, restrictedTo } from '../middleware/authMiddleware';

const departmentRouter = Router();

departmentRouter.use(protect, restrictedTo('manager'));
departmentRouter.route('/').post(createDepartment).get(getAllDepartments);
departmentRouter
	.route('/:id')
	.patch(updateDepartment)
	.delete(deleteDepartment)
	.get(getDepartmentById);

export default departmentRouter;
