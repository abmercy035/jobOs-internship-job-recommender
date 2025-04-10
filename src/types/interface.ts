export interface User {
	id: number;
	name: string;
	title: string;
	email: string;
	userId: string;
	skills: string[];
	tools: string[];
	jobType: string[];
	salaryExpectations?: string | null;
	createdAt: Date;
}

export interface Job {
	id: number;
	jobId: string;
	title: string;
	description?: string | null;
	applicationType?: string | null;
	jobType: string;
	salary?: string | null;
	company?: string | null;
	requiredSkills: string[];  
	createdAt: Date;
}
