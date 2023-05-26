interface Department {
	_id: string;
	departmentName: string;
	categoryName: string;
	location: string;
	salary: number;
	employees: Employee[] | string[];
}
interface Employee {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	department?: Department[];
}
