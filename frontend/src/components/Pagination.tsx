import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	decrementCurrPage,
	incrementCurrPage,
} from '../features/department/departmentSlice';
import { useAppSelector } from '../app/hooks';
type Props = {};
export default function Pagination({}: Props) {
	const { currentPage, departments } = useAppSelector(
		state => state.department
	);
	const dispatch = useDispatch();
	return (
		<div className='flex my-4 justify-center gap-6'>
			<button
				onClick={() => {
					dispatch(decrementCurrPage());
				}}
				disabled={currentPage === 1}
				className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-sm hover:bg-gray-100 hover:text-gray-700 disabled:bg-gray-100 disabled:text-gray-300 disabled:text-gray-700 disabled:cursor-not-allowed '>
				Previous
			</button>

			<button
				onClick={() => {
					dispatch(incrementCurrPage());
				}}
				disabled={departments!.length < 5}
				className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-sm hover:bg-gray-100 hover:text-gray-700 disabled:bg-gray-100 disabled:text-gray-300 disabled:text-gray-700 disabled:cursor-not-allowed '>
				Next
			</button>
		</div>
	);
}
