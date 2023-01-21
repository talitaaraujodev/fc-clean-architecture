import dotenv from 'dotenv';
dotenv.config();

export = {
  serverPort: Number(process.env.SERVER_PORT) || 9003,
  dbName: process.env.PG_DATABASE || 'clean_architecture',
  dbHost: process.env.PG_HOST || 'localhost',
  dbPort: Number(process.env.PG_PORT) || 5432,
  dbUser: process.env.PG_USER || 'username',
  dbPassword: process.env.PG_PASSWORD || '123456',
};
