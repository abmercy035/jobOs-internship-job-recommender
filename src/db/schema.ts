import { sql } from 'drizzle-orm';
import { pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(), // Ensure email is unique
	userId: varchar("user_id", { length: 255 }).notNull().unique(),
	skills: text('skills').array().notNull().default(sql`ARRAY[]::text[]`),
	tools: text('tools').array().notNull().default(sql`ARRAY[]::text[]`),
	title: text('title').notNull(),
	jobType: text('job_type').array().notNull().default(sql`ARRAY[]::text[]`),
	salaryExpectations: text('salary_expectations'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const jobs = pgTable('jobs', {
	id: serial('id').primaryKey(),
	jobId: varchar("job_id", { length: 255 }).notNull().unique(),
	title: text('title').notNull(),
	description: text('description'),
	applicationType: text('application_type'),
	jobType: text('job_type').notNull(),
	salary: text('salary'),
	company: text('company'),
	requiredSkills: text('required_skills').array().notNull().default(sql`ARRAY[]::text[]`),
	createdAt: timestamp('created_at').notNull().defaultNow(),
});

