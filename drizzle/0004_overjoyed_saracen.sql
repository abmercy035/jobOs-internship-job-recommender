ALTER TABLE "jobs" ADD COLUMN "job_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "job_type" text;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "salary" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "user_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "job_type" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "salary_expectations" text;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_job_id_unique" UNIQUE("job_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_user_id_unique" UNIQUE("user_id");