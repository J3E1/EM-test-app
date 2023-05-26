import type { RequestHandler, ErrorRequestHandler } from 'express';

export const notFound: RequestHandler = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	console.log('💥💥Error 💥💥'.red.bold, err.stack);
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	let message = err.message;

	if (err.name === 'CastError' && err.kind === 'ObjectId') {
		statusCode = 404;
		message = 'Resource not found';
	}

	res.status(statusCode).json({
		message: message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};
