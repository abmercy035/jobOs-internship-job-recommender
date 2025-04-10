import { matchUserWithJobs } from './../utils/jobMatcher.js';
import express from "express"
import { isInValiData } from "validata-jsts";
import db from "../db/index.js";
import { jobsRules } from '../lib/datarules.js';
import { jobs as jobsSchema } from './../db/schema.js';
import { v4 as uuid } from "uuid";

const jobsRoute = express.Router()


// create new Job 
jobsRoute.post('/jobs', async (req, res) => {

	const validationError = isInValiData(jobsRules, req.body);

	if (validationError) {
		res.status(400).json({ error: validationError });
		return;
	}

	const job = await db.insert(jobsSchema).values({
		jobId: uuid(),
		...req.body
	}).returning().then((data) => {
		return data;
	});

	if (!job) {
		res.status(403).json({ error: 'Failed to create Job' });
		return
	}

	res.json(job);
});


// Job fetch endpoint for with matching
jobsRoute.get('/jobs', async (req, res) => {
	const { userId } = req.body;
	const validationError = isInValiData(["userId-objectId-err:userId is required"], { userId })
	if (validationError) {
		res.status(400).json({ error: validationError });
		return;
	}
	const user = await db.query.users.findFirst({ where: (users, { eq }) => eq(users.userId, userId) })
	if (!user) { res.status(404).json({ error: 'User not found' }); return }

	const jobsList = await db.select().from(jobsSchema);
	console.log(matchUserWithJobs(jobsList, user));
	res.json(matchUserWithJobs(jobsList, user));
});


export default jobsRoute
