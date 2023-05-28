import { toast } from 'react-toastify';
export default function errorExtractor(err: unknown) {
	if (typeof err === 'object' && err !== null && 'data' in err) {
		const errorResponse = (err as { data: { message: string } }).data;
		if (
			typeof errorResponse === 'object' &&
			errorResponse !== null &&
			'message' in errorResponse
		) {
			toast.error(errorResponse.message);
		} else {
			toast.error('Invalid error response format');
		}
	} else {
		toast.error('Unknown error occurred');
	}
}
