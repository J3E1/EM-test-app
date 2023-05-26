import mongoose, { Error } from 'mongoose';

const connectDB = async () => {
	const connUrl = process.env.MONGODB_CONNECTION_URL as string;

	try {
		const conn = await mongoose.connect(connUrl);
		console.log(
			`MongoDB Connected: ${conn.connection.host}`.black.bgGreen.bold
		);
	} catch (error) {
		if (error instanceof Error) {
			console.log(`Error: ${error.message}`.red.underline.bold);
		}
		process.exit(1);
	}
};
export default connectDB;
