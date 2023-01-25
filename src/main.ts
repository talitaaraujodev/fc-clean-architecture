import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './infrastructure/config/database/ormconfig';
import env from './infrastructure/config/envConfig';
import { customerRoute } from './presentation/routes/customerRoute';
import { productRoute } from './presentation/routes/productRoute';


AppDataSource.initialize();

app.listen(env.serverPort, [customerRoute, productRoute]);
