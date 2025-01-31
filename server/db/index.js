import pg from 'pg';


const { Pool } = pg
 
const db = new Pool();
 
export const query = (text, params) => pool.query(text, params);
export default db;