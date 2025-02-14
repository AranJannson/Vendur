import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { items_stock } from '../drizzle/schema'
import modifyStockQuantity, { addItem } from './modifyStock'
import { fetchCatalog } from './fetchCatalog'


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


export async function testConnection() {

  const db = await connect();

  try {
    modifyStockQuantity('2', '50')

    console.log(await db!.select().from(items_stock));

  } catch (error) {
    console.error(error);
  }

  const catalog = await fetchCatalog();
  
  console.log(`testing fetch catalog: \n ${JSON.stringify(catalog, null, 2)}`);

  // addItem('Tshirt-Red');

  const catalogUpdated = await fetchCatalog();

  await modifyStockQuantity('3', '100')
  
  console.log(`testing fetch catalog: \n ${JSON.stringify(catalogUpdated, null, 2)}`);

}

