CREATE TYPE "public"."reservation_status" AS ENUM('cancelled', 'confirmed', 'pending', 'waitlist');--> statement-breakpoint
CREATE TABLE "food_pantry"."reservations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"status" "reservation_status" DEFAULT 'pending' NOT NULL,
	"event_id" integer NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "food_pantry"."applications" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."applications" ALTER COLUMN "program_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."applications" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."events" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."events" ALTER COLUMN "program_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."events" ALTER COLUMN "event_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."events" ALTER COLUMN "open_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."events" ALTER COLUMN "close_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."profiles" ALTER COLUMN "street2" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "food_pantry"."profiles" ALTER COLUMN "street2" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."programs" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."students" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "food_pantry"."reservations" ADD CONSTRAINT "reservations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food_pantry"."reservations" ADD CONSTRAINT "reservations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "food_pantry"."events"("id") ON DELETE no action ON UPDATE no action;