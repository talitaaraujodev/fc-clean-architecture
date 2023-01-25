import 'reflect-metadata';
import { AppDataSource } from './infrastructure/config/database/ormconfig';
import env from './infrastructure/config/envConfig';
import { customerRoute } from './presentation/routes/customerRoute';
import app from './app';


AppDataSource.initialize();

app.listen(env.serverPort, customerRoute);
