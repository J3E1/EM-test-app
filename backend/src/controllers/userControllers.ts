import { RequestHandler } from 'express';
import User from '../models/User';
import expressAsyncHandler from 'express-async-handler';
import { get } from 'lodash';
import { IUser } from '../@types';

// @desc    Get all Employee
// @route   GET /api/employees/
const PAGE_SIZE = 3; // Number of departments to display per page
export const getAllEmployees: RequestHandler = expressAsyncHandler(
	async (req, res) => {
		const page = req.query.page || 1; // Get the requested page number from the query parameters
		const skip = (+page - 1) * PAGE_SIZE; // Calculate the number of departments to skip
		const employees = await User.find({ role: 'employee' });
		// .skip(skip)
		// .limit(PAGE_SIZE);
		res
			.status(201)
			.json({ message: 'Employees fetched successfully', employees });
	}
);

// @desc    Get single employee
// @route   GET /api/employees/:id
export const getEmployee: RequestHandler = expressAsyncHandler(
	async (req, res) => {
		const { id } = req.params;
		const user = get(req, 'user', {}) as IUser;
		if (user._id.toString() !== id && user.role !== 'manager') {
			res.status(401);
			throw new Error('Unauthorized');
		}
		const employee = await User.findById(id).populate({
			path: 'department',
			select: 'departmentName categoryName location salary',
		});
		res
			.status(201)
			.json({ message: 'Employees fetched successfully', employee });
	}
);
