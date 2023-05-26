import type { ComponentProps } from 'react';
type Props = ComponentProps<'div'>;
export default function Layout({ children }: Props) {
	return (
		<section className='antialiased bg-gray-100 text-gray-600 min-h-[calc(100vh-4rem)] py-4'>
			<div className='w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200'>
				{children}
			</div>
		</section>
	);
}
