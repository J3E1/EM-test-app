import { Schema, model } from 'mongoose';
import { IDepartment } from '../@types';
import User from './User';

const departmentSchema = new Schema<IDepartment>(
	{
		departmentName: { type: String, required: true },
		categoryName: { type: String, required: true },
		location: { type: String, required: true },
		salary: { type: Number, required: true },
		employees: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
	},
	{
		timestamps: true,
	}
);
// Pre hook to populate the employees array with specific fields
// departmentSchema.pre<IDepartment>(/^find/, function (next) {
// 	this.populate({
// 		path: 'employees',
// 		select: 'firstName lastName _id email',
// 	});
// 	next();
// });

// Pre hook to update departments array of users before saving the department
departmentSchema.pre<IDepartment>('save', async function (next) {
	const previousDepartment = (await this.$model('Department').findById(
		this._id
	)) as IDepartment;

	if (
		previousDepartment &&
		this.employees.toString() !== previousDepartment.employees.toString()
	) {
		const addedEmployeeIds = this.employees.filter(
			employeeId => !previousDepartment.employees.includes(employeeId)
		);

		const removedEmployeeIds = previousDepartment.employees.filter(
			employeeId => !this.employees.includes(employeeId)
		);

		await User.updateMany(
			{
				_id: { $in: addedEmployeeIds },
			},
			{ $addToSet: { departments: this._id } }
		);

		await User.updateMany(
			{
				_id: { $in: removedEmployeeIds },
			},
			{ $pull: { departments: this._id } }
		);
	}

	next();
});

// Middleware to remove the department from users when deleted
departmentSchema.post<IDepartment>(
	'findOneAndDelete',
	async function (department: IDepartment) {
		if (department) {
			const userIds = department.employees.map(String);
			await User.updateMany(
				{ _id: { $in: userIds } },
				{ $pull: { departments: department._id } }
			);
		}
	}
);
export default model<IDepartment>('Department', departmentSchema);
