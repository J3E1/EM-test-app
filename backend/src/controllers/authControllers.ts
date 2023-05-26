import type { RequestHandler } from 'express';

import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/User';

import expressAsyncHandler from 'express-async-handler';
import { generateAccessToken } from '../utils/utils';

import { get } from 'lodash';
import { IUser, RegisterBody } from '../@types';

// @desc    Auth user & get token
// @route   POST /api/auth/login
export const login: RequestHandler = expressAsyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(500);
		throw new Error('Please provide Email and Password');
	}
	const user = await User.findOne({ email }).select('+password');
	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	// Verify password
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		res.status(401);
		throw new Error('Invalid Password');
	}

	const token = generateAccessToken(user._id, user.role);
	res.status(200).json({
		message: 'User logged in successfully',
		token,
		user: {
			_id: user._id,
			role: user.role,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			department: user.department,
		},
	});
});
// @desc    Register a new user
// @route   POST /api/auth/register
export const register: RequestHandler = expressAsyncHandler(
	async (req, res) => {
		const { firstName, lastName, email, password, role, gender, hobbies } =
			req.body as RegisterBody;

		if (
			!lastName ||
			!firstName ||
			!email ||
			!password ||
			!role ||
			!gender ||
			!hobbies
		) {
			res.status(500);
			throw new Error('Please provide necessary information');
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			res.status(400);
			throw new Error('User already exists!');
		}
		const user = await User.create({
			firstName,
			lastName,
			email,
			password,
			role,
			gender,
			hobbies,
		});

		if (user) {
			// Generate and return access token
			const token = generateAccessToken(user._id, user.role);
			res.status(201).json({
				message: 'User registered successfully',
				token,
				user: {
					_id: user._id,
					role: user.role,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
				},
			});
			return;
		} else {
			res.status(500);
			throw new Error('Invalid user data');
		}
	}
);
