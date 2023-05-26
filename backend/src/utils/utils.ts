import jwt from 'jsonwebtoken';
import { Document, Query } from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateAccessToken = (
	userId: string,
	role: 'employee' | 'manager'
) => {
	const token = jwt.sign({ userId, role }, JWT_SECRET, {
		expiresIn: '1d',
	});
	return token;
};

export class APIFeatures<T> {
	private queryString: Record<string, any>;
	query: Query<Document[], Document>;
	constructor(
		query: Query<Document[], Document>,
		reqQuery: Record<string, any>
	) {
		this.query = query;
		this.queryString = reqQuery;
	}
	filter() {
		const { city, date } = this.queryString;
		if (city) {
			this.query = this.query.find({ city });
		}
		if (date) {
			const startDate = new Date(date);
			const endDate = new Date(date);
			endDate.setDate(endDate.getDate() + 1); // Filter for events within a single day
			this.query = this.query.find({
				createdAt: { $gte: startDate, $lt: endDate },
			});
		}
		return this;
	}
	sort() {
		if (this.queryString.sort) {
			let sortBy = this.queryString.sort as string;
			sortBy = sortBy.split(',').join(' ');
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort('-createdAt');
		}
		return this;
	}
	limitFields() {
		if (this.queryString.fields) {
			let fieldsBy = this.queryString.fields as string;
			fieldsBy = fieldsBy.split(',').join(' ');
			this.query = this.query.select(fieldsBy);
		} else {
			this.query = this.query.select('-__v -createdAt -updatedAt');
		}
		return this;
	}
	search() {
		if (this.queryString.search) {
			const { search } = this.queryString;
			this.query = this.query.find({
				$or: [
					{ title: { $regex: search, $options: 'i' } },
					{ city: { $regex: search, $options: 'i' } },
				],
			});
		}
		return this;
	}
	paginate() {
		const page = +this.queryString.page! || 1;
		const limit = +this.queryString.limit! || 10;
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);
		return this;
	}
}
export const generateSlug = (text: string) =>
	text
		.toLowerCase() // Convert text to lowercase
		.replace(/\s+/g, '-') // Replace whitespaces with hyphens
		.replace(/[^a-z0-9-]/g, '') // Remove any non-alphanumeric characters and hyphens
		.replace(/-+/g, '-') // Replace consecutive hyphens with a single hyphen
		.replace(/^-|-$/g, ''); // Remove hyphens from the start or end of the slug
export const filterObjectByKeys = <T extends object, K extends keyof T>(
	obj: T,
	keys: K[]
): Pick<T, K> => {
	const filteredObj: Partial<Pick<T, K>> = {};

	keys.forEach(key => {
		if (obj.hasOwnProperty(key)) {
			filteredObj[key] = obj[key];
		}
	});

	return filteredObj as Pick<T, K>;
};
