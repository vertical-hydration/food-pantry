CREATE SCHEMA "food_pantry";
--> statement-breakpoint
CREATE TYPE "public"."event_status" AS ENUM('active', 'inactive', 'archived');--> statement-breakpoint
CREATE TYPE "public"."program_status" AS ENUM('active', 'inactive', 'archived');--> statement-breakpoint
CREATE TABLE "food_pantry"."events" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text DEFAULT 'event' NOT NULL,
	"status" "event_status" DEFAULT 'inactive',
	"program_id" integer,
	"event_date" timestamp,
	"open_date" timestamp,
	"close_date" timestamp,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "food_pantry"."programs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text DEFAULT 'program' NOT NULL,
	"status" "program_status" DEFAULT 'inactive',
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "food_pantry"."events" ADD CONSTRAINT "events_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "food_pantry"."programs"("id") ON DELETE no action ON UPDATE no action;