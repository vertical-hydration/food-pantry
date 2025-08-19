import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  serial,
  pgSchema,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./auth_schema";
import { randomUUID } from "crypto";

export const foodPantry = pgSchema("food_pantry");

export const programStatusEnum = pgEnum("program_status", [
  "active",
  "inactive",
  "archived",
]);

export const eventStatusEnum = pgEnum("event_status", [
  "active",
  "inactive",
  "archived",
]);

export const applicationStatusEnum = pgEnum("application_status", [
  "submitted",
  "accepted",
  "waitlist",
  "declined",
]);

const timestamps = {
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .$onUpdateFn(() => new Date()),
};

export const programs = foodPantry.table("programs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().default("program"),
  status: programStatusEnum().default("inactive"),
  ...timestamps,
});

export const events = foodPantry.table("events", {
  id: serial().primaryKey(),
  name: text().notNull().default("event"),
  status: eventStatusEnum().default("inactive"),
  programId: integer("program_id").references(() => programs.id),
  eventDate: timestamp("event_date"),
  openDate: timestamp("open_date"),
  closeDate: timestamp("close_date"),
  ...timestamps,
});

export const students = foodPantry.table("students", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  school: text().notNull(),
  userId: text("user_id").references(() => users.id),
  ...timestamps,
});

export const profiles = foodPantry.table("profiles", {
  id: text().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  street: text().notNull(),
  street2: text(),
  city: text().notNull(),
  state: text().notNull(),
  zip: text().notNull(),
});

export const applications = foodPantry.table("applications", {
  id: serial().primaryKey(),
  userId: text("user_id").references(() => users.id),
  programID: integer("program_id").references(() => programs.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  street: text().notNull(),
  street2: text(),
  city: text().notNull(),
  state: text().notNull(),
  zip: text().notNull(),
  email: text().notNull(),
  status: applicationStatusEnum().default("submitted"),
  acceptedDate: timestamp("accepted_date"),
  ...timestamps,
});
