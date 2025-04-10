ALTER TABLE "users" ALTER COLUMN "job_type" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "job_type" SET DEFAULT ARRAY[]::text[];--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "job_type" SET NOT NULL;