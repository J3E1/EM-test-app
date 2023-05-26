import { RequestHandler } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { DepartmentRegBody } from '../@types';
import Department from '../models/Department';
import User from '../models/User';

// @desc    Create a new dep
// @route   POST /api/departments/
export const createDepartment: RequestHandler = expressAsyncHandler(
	async (req, res) => {
		const { departmentName, categoryName, location, employees, salary } =
			req.body as DepartmentRegBody;
		if (
			!departmentName ||
			!categoryName ||
			!location ||
			!employees ||
			!salary
		) {
			res.status(500);
			throw new Error('Please provide necessary information');
		}

		const department = await Department.create({
			departmentName,
			categoryName,
			location,
			employees,
			salary,
		});
		await User.updateMany(
			{ _id: { $in: employees } },
			{ $push: { department: department._id } }
		);

		res
			.status(201)
			.json({ message: 'Department crated successfully', department });
	}
);

const PAGE_SIZE = 5; // Number of departments to display per page
// @desc    Get all departments
// @route   GET /api/departments/
export const getAllDepartments: RequestHandler = expressAsyncHandler(
	async (req, res) => {
		const page = req.query.page || 1; // Get the requested page number from the query parameters
		const skip = (+page - 1) * PAGE_SIZE; // Calculate the number of departments to skip

		const departments = await Department.find()
			.sort({ updatedAt: -1 })
			.skip(skip)
			.limit(PAGE_SIZE)
			.populate({
				path: 'employees',
				select: 'firstName lastName _id email',
			})
			.select('-createdAt -updatedAt -__v');
		res
			.status(201)
			.json({ message: 'Departments fetched successfully', departments });
	}
);

// @desc    Get Single Department
// @route   GET /api/departments/:id
export const getDepartmentById: RequestHandler = expressAsyncHandler(
	async (req, res) => {
		const { id } = req.params;

		const department = await Department.findById(id)
			.populate({
				path: 'employees',
				select: 'firstName lastName _id email',
			})
			.select('-createdAt -updatedAt -__v');
		if (!department) {
			res.status(404);
			throw new Error('Department not found');
		}
		res
			.status(200)
			.json({ message: 'Department fetched successfully', department });
	}
);

// @desc    Update department
// @route   PATCH /api/departments/:id
export const updateDepartment: RequestHandler = expressAsyncHandler(
	async (req, res) => {
		const { id } = req.params;
		const { departmentName, categoryName, location, salary, employees } =
			req.body;
		if (
			!departmentName &&
			!categoryName &&
			!location &&
			!salary &&
			!employees
		) {
			res.status(500);
			throw new Error('Please provide any data to be updated');
		}

		const department = await Department.findByIdAndUpdate(id, {
			departmentName,
			categoryName,
			location,
			salary,
			employees,
		});
		if (!department) {
			res.status(404);
			throw new Error('Department not found');
		}
		res
			.status(200)
			.json({ message: 'Department updated successfully', department });
	}
);

// @desc    Delete department
// @route   DELETE /api/departments/:id
export const deleteDepartment: RequestHandler = expressAsyncHandler(
	async (req, res) => {
		const { id } = req.params;

		const department = await Department.findByIdAndDelete(id);
		if (!department) {
			res.status(404);
			throw new Error('Department not found');
		}
		res.status(200).json({ message: 'Department deleted successfully' });
	}
);
