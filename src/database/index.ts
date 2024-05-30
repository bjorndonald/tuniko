import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from './schema';
 
const client = postgres(process.env.AUTH_DRIZZLE_URL!);
export const db = drizzle(client, { schema: schema, logger: true });