import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface InitialState {
	currentEmployee: Employee | null;
	employees: Employee[] | null;
}
const initialState: InitialState = {
	currentEmployee: null,
	employees: null,
};

const employeeSlice = createSlice({
	name: 'employee',
	initialState,
	reducers: {
		setCurrentEmployee: (state, action: PayloadAction<Employee>) => {
			state.currentEmployee = action.payload;
		},
		setEmployees: (state, action: PayloadAction<Employee[]>) => {
			state.employees = action.payload;
		},
		reset: state => {
			state.currentEmployee = null;
			state.employees = null;
		},
	},
});

export const { setCurrentEmployee, setEmployees, reset } =
	employeeSlice.actions;

export default employeeSlice.reducer;
