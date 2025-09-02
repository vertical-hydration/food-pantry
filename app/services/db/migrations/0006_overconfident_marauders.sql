ALTER TABLE "food_pantry"."events" ADD COLUMN "location" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."events" ADD COLUMN "time" text DEFAULT '' NOT NULL;