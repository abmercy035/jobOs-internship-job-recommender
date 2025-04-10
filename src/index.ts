import express from 'express';
import jobsRoute from './routes/jobs.js'
import usersRoute from './routes/users.js'

const app = express();
const port = 5000;

app.use(express.json());

app.use('/api', jobsRoute);
app.use('/api', usersRoute);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
