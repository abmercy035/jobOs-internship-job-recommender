import dotenv from 'dotenv';
import express from 'express';
import jobsRoute from './routes/jobs'
import usersRoute from './routes/users'

const app = express();

dotenv.config();

const port = 5000;

app.use(express.json());
app.use('/api', jobsRoute);
app.use('/api', usersRoute);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
