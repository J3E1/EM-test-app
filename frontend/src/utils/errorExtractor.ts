import { AxiosError } from 'axios';
export default function errorExtractor(error: unknown) {
	console.log('💥💥 error:', error);
	if (error instanceof AxiosError) return error.message;
	if (error instanceof Error) return error.message;
	return '💥💥 error occurred 💥💥 ';
}
