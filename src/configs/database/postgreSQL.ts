//postgreSQL connection
import { config } from 'dotenv';
config({ path: '.env' });
import { Pool } from 'pg';

const client: Pool = new Pool({
  user: process.env.POSTGRSQL_USE,
  host: process.env.POSTGRSQL_HOST,
  database: process.env.POSTGRSQL_DATABASE,
  port: Number(process.env.POSTGRSQL_PORT),
  max: Number(process.env.POSTGRSQL_MAX_POOL_COUNT),
});

export default client;
