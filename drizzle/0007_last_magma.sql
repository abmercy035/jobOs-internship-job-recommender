ALTER TABLE "users" ADD COLUMN "tools" text[] DEFAULT ARRAY[]::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "title" text;