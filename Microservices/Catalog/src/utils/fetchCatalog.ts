import { items } from '../drizzle/schema'
import { connect } from './dbConnect'
import { JSONValue } from 'postgres';


export const fetchCatalog = async (): Promise<JSONValue> => {

    const db = await connect();

    return await db!.select().from(items);
}