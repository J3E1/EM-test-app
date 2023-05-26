import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface InitialState {
	currentDepartment: Department | null;
	departments: Department[] | null;
	currentPage: number;
}
const initialState: InitialState = {
	currentDepartment: null,
	departments: null,
	currentPage: 1,
};

const departmentSlice = createSlice({
	name: 'department',
	initialState,
	reducers: {
		setCurrentDepartment: (state, action: PayloadAction<Department>) => {
			state.currentDepartment = action.payload;
		},
		setDepartments: (state, action: PayloadAction<Department[]>) => {
			state.departments = action.payload;
		},
		reset: state => {
			state.currentDepartment = null;
			state.departments = null;
		},
		incrementCurrPage: state => {
			state.currentPage++;
		},
		decrementCurrPage: state => {
			state.currentPage--;
		},
	},
});

export const {
	setCurrentDepartment,
	setDepartments,
	reset,
	incrementCurrPage,
	decrementCurrPage,
} = departmentSlice.actions;

export default departmentSlice.reducer;
