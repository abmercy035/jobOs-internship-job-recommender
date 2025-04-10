// Match skills between user and job
import * as dataType from './../types/interface.ts';

export const matchUserWithJobs = (jobsList: dataType.Job[], user: dataType.User) => {
	return jobsList
		.map((job) => {
			let score = 0;
			let totalPossible = 0; //Incase I needed to add more match cases i would only be needing to update(:increment) from that point

			// => A. Title and Skill match
			totalPossible += 1;
			const titleAndSkillsMatch = user.skills?.some(skill =>
				job.title.toLowerCase().includes(skill.toLowerCase()));
			if (titleAndSkillsMatch) score += 1;

			// => B. Title and Skill match
			totalPossible += 1;
			const jobTypeMatch = user.jobType.some(jobType =>
				job.jobType.toLowerCase().includes(jobType.toLowerCase()));
			if (jobTypeMatch) score += 1;

			// => C. Title match
			totalPossible += 1;
			const titleMatch = job.title.toLowerCase().includes(user?.title.toLowerCase())
			if (titleMatch) score += 1;

			// => D. Description match
			totalPossible += 1;
			const descriptionMatch = user.skills?.some(skill => job.description?.toLowerCase().includes(skill.toLowerCase()));
			if (descriptionMatch) score += 1;

			// => E. Skill match
			totalPossible += 1;
			const matchedSkills = job.requiredSkills?.filter(skill =>
				user.skills?.includes(skill.toLowerCase()) || user.tools?.includes(skill.toLowerCase()) || user.skills?.some(userSkill => skill.toLowerCase().includes(userSkill.toLowerCase())) || user.tools?.some(userTool => skill.toLowerCase().includes(userTool.toLowerCase()))
			) || [];
			const skillScore = matchedSkills.length / (job.requiredSkills?.length || 1);
			score += skillScore;

			// => E. Salary match
			totalPossible += 1;
			const salaryMatch = user.salaryExpectations
				? job.salary && job.salary <= user.salaryExpectations
				: true;
			if (salaryMatch) score += 1;
			const scorePercentage = (score / totalPossible) * 100;

			return {
				...job,
				createdAt: (job.createdAt).toLocaleString(),
				score,
				scorePercentage: Math.round(scorePercentage),
				matchedSkills,
			};
		})
		.filter(job => job.score > 0)
		.sort((a, b) => b.scorePercentage - a.scorePercentage);
};
