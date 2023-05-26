import { useAppDispatch, useAppSelector } from '../app/hooks';
import { closeSidebar } from '../features/sideBar/sideBarSlice';
import Features from './Features';

type Props = { title?: string };
export default function SideBar({ title }: Props) {
	const { isOpen, mode } = useAppSelector(state => state.sidebar);
	const dispatch = useAppDispatch();

	return (
		<>
			<div
				className={`${
					isOpen
						? 'block opacity-75 bg-black'
						: 'hidden opacity-0 bg-transparent'
				} h-full w-[100vw]  z-29 top-0 right-0 fixed transition-all duration-500 delay-200`}
				onClick={() => dispatch(closeSidebar())}></div>
			<div
				className={`${
					isOpen ? 'right-0' : '-right-full'
				} w-[100vw] bg-white fixed top-0 h-full shadow-2xl sm:w-[90vw] md:w-[60vw] xl:max-w-[50vw] transition-all duration-300 z-30 ease-[cubic-bezier(.51,.92,.24,1.15)] overflow-x-auto`}>
				<div className='h-16 bg-white w-full'>
					<div className='flex h-full justify-between items-center bg-white max-w-[90%] mx-auto'>
						<h2 className='font-bold text-xl uppercase'>{mode} department</h2>
						<button onClick={() => dispatch(closeSidebar())}>
							<IconClose className='text-black' height='2rem' width='2rem' />
						</button>
					</div>
				</div>
				<div className='flex h-full bg-white'>
					<Features />
				</div>
			</div>
		</>
	);
}

function IconClose(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox='0 0 1024 1024' fill='currentColor' {...props}>
			<path d='M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z' />
		</svg>
	);
}
