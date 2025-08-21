ALTER TABLE "food_pantry"."applications" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."applications" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."events" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."events" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."programs" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."programs" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."students" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."students" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."applications" ADD COLUMN "students" json;