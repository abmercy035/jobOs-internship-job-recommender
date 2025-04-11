import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema'; // Import your schema

const db = drizzle(process.env.DATABASE_URL!,  { schema });


export default db



// import { drizzle } from 'drizzle-orm';
// import { someDatabaseClient } from 'some-database-client';
// import * as schema from './schema.ts'; // Import your schema

// // Your database connection
// const db = drizzle(someDatabaseClient, { schema });
// export default db;
