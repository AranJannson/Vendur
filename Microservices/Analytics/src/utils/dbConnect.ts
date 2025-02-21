import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { items_stock } from '../drizzle/schema'


export async function connect() {

  try {
    const connectionString = process.env.DATABASE_URL

    if (!connectionString) {
      throw new Error('DATABASE_URL is not defined')
    }
  
    const client = postgres(connectionString, { prepare: false })
  
    return drizzle(client);

  } catch (error) {

    console.error(error);
    return;

  }

}

