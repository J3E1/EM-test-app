import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
	isOpen: boolean;
	mode: 'EDIT' | 'CREATE' | 'INFO';
};
const initialState: InitialState = {
	isOpen: false,
	mode: 'CREATE',
};

const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		openSidebar: state => {
			state.isOpen = true;
		},
		closeSidebar: state => {
			state.isOpen = false;
		},
		setMode: (state, action: PayloadAction<'EDIT' | 'CREATE' | 'INFO'>) => {
			state.mode = action.payload;
		},
	},
});
export const { openSidebar, closeSidebar, setMode } = sidebarSlice.actions;
export default sidebarSlice.reducer;
