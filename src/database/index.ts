import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
 
const client = postgres(process.env.AUTH_DRIZZLE_URL! +";sslmode=verify-ca;sslrootcert=ca.pem");
export const db = drizzle(client, { schema: schema, logger: true });