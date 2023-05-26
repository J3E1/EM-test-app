import type { Document, ObjectId } from 'mongoose';
interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	gender: string;
	hobbies: string[];
	role: 'employee' | 'manager';
	department: ObjectId[];
}

interface RegisterBody {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	gender: string;
	hobbies: string[];
	role: 'employee' | 'manager';
}
interface DepartmentRegBody {
	departmentName: string;
	categoryName: string;
	location: string;
	salary: number;
	employees: ObjectId[];
}
interface IDepartment extends Document, DepartmentRegBody {}
