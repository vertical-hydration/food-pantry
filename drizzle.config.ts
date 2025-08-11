import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./app/services/db/schema/index.ts",
  out: "./app/services/db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
