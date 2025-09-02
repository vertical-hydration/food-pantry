CREATE TYPE "public"."application_status" AS ENUM('submitted', 'accepted', 'waitlist', 'declined');--> statement-breakpoint
CREATE TABLE "food_pantry"."applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"program_id" integer,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"street" text NOT NULL,
	"street2" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip" text NOT NULL,
	"email" text NOT NULL,
	"status" "application_status" DEFAULT 'submitted',
	"accepted_date" timestamp,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "food_pantry"."profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"street" text NOT NULL,
	"street2" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "food_pantry"."students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"school" text NOT NULL,
	"user_id" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "food_pantry"."applications" ADD CONSTRAINT "applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food_pantry"."applications" ADD CONSTRAINT "applications_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "food_pantry"."programs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food_pantry"."students" ADD CONSTRAINT "students_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;