import { defineConfig } from "drizzle-kit";
export default defineConfig({
    dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
    schema: "./src/database/schema.ts",
    out: "./src/drizzle",
    dbCredentials: {
        url: process.env.AUTH_DRIZZLE_URL
    }
});
