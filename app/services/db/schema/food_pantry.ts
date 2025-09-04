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
  jsonb,
} from "drizzle-orm/pg-core";
import { users } from "./auth_schema";
import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";
// ...existing code...

export const foodPantry = pgSchema("food_pantry");

type FAQ = {
  question: string;
  answer: string;
};

type FAQDATA = {
  faqs: FAQ[];
};

type Eligibity = {
  requirements: string[];
};

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

export const reservationStatusEnum = pgEnum(
  "reservation_status",
  ["cancelled", "confirmed", "pending", "waitlist"]
);

export const applicationStatusEnum = pgEnum(
  "application_status",
  ["submitted", "accepted", "waitlist", "declined"]
);

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
  image: text("image"),
  description: text().default("").notNull(),
  eligibility: jsonb()
    .$type<Eligibity>()
    .default({ requirements: [] })
    .notNull(),
  faqs: jsonb()
    .$type<FAQDATA>()
    .default({ faqs: [] })
    .notNull(),
  status: programStatusEnum().default("inactive").notNull(),
  ...timestamps,
});

export const events = foodPantry.table("events", {
  id: serial().primaryKey(),
  name: text().notNull().default("event"),
  status: eventStatusEnum().default("inactive").notNull(),
  location: text().notNull().default(""),
  time: text().notNull().default(""),
  programId: integer("program_id")
    .references(() => programs.id)
    .notNull(),
  eventDate: timestamp("event_date").notNull(),
  openDate: timestamp("open_date").notNull(),
  closeDate: timestamp("close_date").notNull(),
  ...timestamps,
});

export const reservations = foodPantry.table(
  "reservations",
  {
    id: serial().primaryKey(),
    userId: text("user_id")
      .references(() => users.id)
      .notNull(),
    status: reservationStatusEnum()
      .default("pending")
      .notNull(),
    eventId: integer("event_id")
      .references(() => events.id)
      .notNull(),
    option: json(),
    ...timestamps,
  }
);

export const students = foodPantry.table("students", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  school: text().notNull(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  ...timestamps,
});

export const profiles = foodPantry.table("profiles", {
  id: text().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  street: text().notNull(),
  street2: text().notNull().default(""),
  city: text().notNull(),
  state: text().notNull(),
  zip: text().notNull(),
});

export const applications = foodPantry.table(
  "applications",
  {
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
    status: applicationStatusEnum()
      .default("submitted")
      .notNull(),
    acceptedDate: timestamp("accepted_date"),
    ...timestamps,
  }
);

// Join table for normalized many-to-many relationship between applications and students
export const applicationStudents = foodPantry.table(
  "application_students",
  {
    id: serial("id").primaryKey(),
    applicationId: integer("application_id")
      .notNull()
      .references(() => applications.id),
    studentId: uuid("student_id")
      .notNull()
      .references(() => students.id),
    // Optionally, add timestamps or other metadata here
    ...timestamps,
  }
);

//
// Relations
//
export const usersRelations = relations(
  users,
  ({ one, many }) => ({
    students: many(students),
    profiles: one(profiles),
    applications: many(applications),
  })
);

export const studentsRelations = relations(
  students,
  ({ one, many }) => ({
    user: one(users, {
      fields: [students.userId],
      references: [users.id],
    }),
    applicationLinks: many(applicationStudents),
  })
);

export const profileRelations = relations(
  profiles,
  ({ one }) => ({
    user: one(users, {
      fields: [profiles.id],
      references: [users.id],
    }),
  })
);

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
    events: many(events),
  })
);

export const applicationStudentsRelations = relations(
  applicationStudents,
  ({ one, many }) => ({
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

export const programsRelations = relations(
  programs,
  ({ many }) => ({
    applications: many(applications),
    events: many(events),
  })
);

export const eventRelations = relations(
  events,
  ({ many, one }) => ({
    programs: one(programs, {
      fields: [events.programId],
      references: [programs.id],
    }),
    reservations: many(reservations),
  })
);

export const reservationsRelations = relations(
  reservations,
  ({ many, one }) => ({
    event: one(events, {
      fields: [reservations.eventId],
      references: [events.id],
    }),
    user: one(users, {
      fields: [reservations.userId],
      references: [users.id],
    }),
  })
);
