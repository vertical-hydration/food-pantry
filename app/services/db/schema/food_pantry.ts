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
  json,
} from "drizzle-orm/pg-core";
import { users } from "./auth_schema";
import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";
// ...existing code...

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
  createdAt: timestamp("created_at")
    .notNull()
    .$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .$onUpdateFn(() => new Date()),
};

export const programs = foodPantry.table("programs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().default("program"),
  status: programStatusEnum().default("inactive").notNull(),
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
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  programId: integer("program_id")
    .references(() => programs.id)
    .notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  street: text().notNull(),
  street2: text(),
  city: text().notNull(),
  state: text().notNull(),
  zip: text().notNull(),
  email: text().notNull(),
  status: applicationStatusEnum().default("submitted").notNull(),
  acceptedDate: timestamp("accepted_date"),
  ...timestamps,
});

// Join table for normalized many-to-many relationship between applications and students
export const applicationStudents = foodPantry.table("application_students", {
  id: serial("id").primaryKey(),
  applicationId: integer("application_id")
    .notNull()
    .references(() => applications.id),
  studentId: uuid("student_id")
    .notNull()
    .references(() => students.id),
  // Optionally, add timestamps or other metadata here
  ...timestamps,
});

//
// Relations
//
export const usersRelations = relations(users, ({ one, many }) => ({
  students: many(students),
  profiles: one(profiles),
  applications: many(applications),
}));

export const studentsRelations = relations(students, ({ one, many }) => ({
  user: one(users, {
    fields: [students.userId],
    references: [users.id],
  }),
  applicationLinks: many(applicationStudents),
}));

export const profileRelations = relations(profiles, ({ one }) => ({
  user: one(users, { fields: [profiles.id], references: [users.id] }),
}));

export const applicationsRelations = relations(
  applications,
  ({ one, many }) => ({
    studentLinks: many(applicationStudents),
    program: one(programs, {
      fields: [applications.programId],
      references: [programs.id],
    }),
    user: one(users, {
      fields: [applications.userId],
      references: [users.id],
    }),
  })
);

export const applicationStudentsRelations = relations(
  applicationStudents,
  ({ one }) => ({
    application: one(applications, {
      fields: [applicationStudents.applicationId],
      references: [applications.id],
    }),
    student: one(students, {
      fields: [applicationStudents.studentId],
      references: [students.id],
    }),
  })
);

export const programsRelations = relations(programs, ({ many }) => ({
  applications: many(applications),
  events: many(events),
}));

export const eventRelations = relations(events, ({ many, one }) => ({
  programs: one(programs, {
    fields: [events.programId],
    references: [programs.id],
  }),
}));
