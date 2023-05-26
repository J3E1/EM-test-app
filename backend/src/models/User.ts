import { Schema, model } from 'mongoose';
import validator from 'validator';
import { IUser } from '../@types';
import bcrypt from 'bcrypt';

const userSchema: Schema = new Schema<IUser>(
	{
		firstName: {
			type: String,
			required: [true, 'A user must have a First Name'],
			trim: true,
		},
		lastName: {
			type: String,
			required: [true, 'A user must have a Last Name'],
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'A user must have an email'],
			unique: true,
			lowercase: true,
			trim: true,
			validate: [validator.isEmail, 'Please enter a valid email address'],
		},
		password: {
			type: String,
			required: true,
			maxlength: 20,
			minlength: 8,
			select: false,
		},
		gender: {
			type: String,
			required: true,
		},
		hobbies: [
			{
				type: String,
				required: true,
			},
		],
		role: { type: String, enum: ['employee', 'manager'], default: 'employee' },
		department: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Department',
			},
		],
	},
	{
		timestamps: true,
	}
);
// Pre hook to populate the employees array with specific fields
// userSchema.pre<IUser>('findOne', function (next) {
// 	this
// 	next();
// });

userSchema.pre('save', async function (next) {
	try {
		// Encrypt the password using bcrypt
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);

		this.password = hashedPassword;

		next();
	} catch (err) {
		if (err instanceof Error) {
			return next(err);
		}
	}
});

export default model<IUser>('User', userSchema);
