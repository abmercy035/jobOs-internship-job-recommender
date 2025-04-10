import express from "express"
import db from "../db/index.ts";
import { eq } from 'drizzle-orm';
import { users } from '../db/schema.ts'; // Your schema with users and jobs
import { v4 as uuid } from "uuid";
import { isValiData } from "validata-jsts";
import { userRules } from "../lib/datarules.ts";

const usersRoute = express.Router()


// create user 
usersRoute.post('/users', async (req, res) => {
	const body = req.body;
	const existingUser = await db.select().from(users).where(eq(users.email, body.email)).limit(1);
	if (existingUser.length > 0) {
		res.status(400).json({ error: 'User with this email already exists' });
		return;
	}
	const validatetionError = isValiData(userRules, body)
	if (validatetionError) { res.status(400).json({ error: validatetionError }); return };
	const user = await db.insert(users).values({
		userId: uuid(),
		...body
	}).returning().then((data) => {
		return data;
	});


	if (!user) {
		res.status(403).json({ error: 'Failed to create User' });
		return
	}

	res.json(user);
});


// user fetch endpoint by the user's :userId
usersRoute.get('/users/:userId', async (req, res) => {
	const userId = (req.params.userId);

	const user = await db.query.users.findFirst({ where: (users, { eq }) => eq(users.userId, userId) })

	if (!user) {
		res.status(404).json({ error: 'User not found' });
		return
	}
	res.json(user);
});

export default usersRoute
