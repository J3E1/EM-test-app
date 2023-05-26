import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { merge, get } from 'lodash';
import User from '../models/User';
import { IUser } from '../@types';
export const protect: RequestHandler = expressAsyncHandler(
	async (req, res, next) => {
		let token!: string;

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer ')
		) {
			token = req.headers.authorization.split(' ')[1];
		}
		if (token) {
			try {
				const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
					userId: string;
					role: 'employee' | 'manager';
				};
				const currentUser = await User.findById(decoded.userId).select(
					'-password'
				);

				merge(req, { user: currentUser });

				next();
			} catch (error) {
				console.error(error);
				res.status(401);
				throw new Error('Not authorized, token failed');
			}
		} else {
			res.status(401);
			throw new Error('Not authorized, no token');
		}
	}
);
export const restrictedTo = (role: 'employee' | 'manager'): RequestHandler =>
	expressAsyncHandler((req, res, next) => {
		const user = get(req, 'user', {}) as IUser;
		if (role !== user.role) {
			res.status(401);
			throw new Error("You don't have permission to perform this action");
		}
		next();
	});
