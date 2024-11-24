import postgres from 'postgres';


const sql = postgres(process.env.DBNAME);


export default sql;
