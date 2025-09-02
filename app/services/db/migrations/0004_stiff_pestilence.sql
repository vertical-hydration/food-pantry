CREATE TABLE "food_pantry"."application_students" (
	"id" serial PRIMARY KEY NOT NULL,
	"application_id" integer NOT NULL,
	"student_id" uuid NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "food_pantry"."application_students" ADD CONSTRAINT "application_students_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "food_pantry"."applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food_pantry"."application_students" ADD CONSTRAINT "application_students_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "food_pantry"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food_pantry"."applications" DROP COLUMN "students";