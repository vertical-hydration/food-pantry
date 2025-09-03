ALTER TABLE "food_pantry"."programs" ALTER COLUMN "image" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."programs" ALTER COLUMN "eligibility" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "food_pantry"."programs" ALTER COLUMN "eligibility" SET DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "food_pantry"."programs" ALTER COLUMN "faqs" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "food_pantry"."programs" ALTER COLUMN "faqs" SET DEFAULT '[]'::jsonb;