import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  serial,
  pgSchema,
  pgEnum,
} from "drizzle-orm/pg-core";

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

const timestamps = {
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
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
