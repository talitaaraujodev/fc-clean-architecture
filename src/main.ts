import 'reflect-metadata';
import { AppDataSource } from './infrastructure/config/database/ormconfig';
import app from './app';
import env from './infrastructure/config/env';
import { customerRoute } from './presentation/routes/customerRoute';

AppDataSource.initialize();

app.listen(env.serverPort, customerRoute);
