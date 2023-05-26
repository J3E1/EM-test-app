import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface InitialState {
	userInfo: {
		userId: string;
		role: 'employee' | 'manager' | null;
		token: string;
	} | null;
}
const initialState: InitialState = {
	userInfo: localStorage.getItem('userInfo')
		? JSON.parse(localStorage.getItem('userInfo')!)
		: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<InitialState>) => {
			state.userInfo = action.payload.userInfo;
			localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo));
		},
		logout: state => {
			state.userInfo = null;
			localStorage.removeItem('userInfo');
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
