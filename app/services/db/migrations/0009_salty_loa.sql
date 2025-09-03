ALTER TABLE "food_pantry"."programs" ADD COLUMN "description" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."programs" ADD COLUMN "eligibility" json DEFAULT '[]'::json NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."programs" ADD COLUMN "faqs" json DEFAULT '[]'::json NOT NULL;