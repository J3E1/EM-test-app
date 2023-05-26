import type { ComponentProps } from 'react';
type Props = ComponentProps<'input'>;
export default function Input(props: Props) {
	return (
		<div>
			<input
				{...props}
				className='w-full bg-transparent border-b-[3px] border-black outline-none p-2 font-semibold mb-8'
			/>
		</div>
	);
}
