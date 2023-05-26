import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import 'colors';
import connectDB from './config/db';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import authRouter from './routes/authRoutes';
import departmentRouter from './routes/departmentRouts';
import userRouter from './routes/usersRoutes';

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

const corsOptions = {
	origin: '*',
};
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/api/auth', authRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/employees', userRouter);
app.get('/api', (_, res) => {
	res.status(200).json({ message: 'Welcome to the Api' });
});

// if (process.env.NODE_ENV === 'production') {
// 	const __dirname = path.resolve();
// 	app.use(express.static(path.join(__dirname, '/backend/dist')));

// 	app.get('*', (req, res) =>
// 		res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
// 	);
// } else {
// 	app.get('/', (req, res) => {
// 		res.send('API is running....');
// 	});
// }

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
	console.log(`Server started on http://localhost:${PORT}`.green.bold)
);
//646f4ee25cd45805e567b568 646f4ef45cd45805e567b56b 646f4f025cd45805e567b56e 646f4f185cd45805e567b574 646f4f245cd45805e567b577 646f4f415cd45805e567b57d 646f4f4d5cd45805e567b580
