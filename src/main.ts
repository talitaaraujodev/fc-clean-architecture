import 'reflect-metadata';
import app from './app';
import env from './infrastructure/config/envConfig';
import { AppDataSource } from './infrastructure/config/database/ormconfig';
import { orderRoute } from './presentation/routes/orderRoute';
import { customerRoute } from './presentation/routes/customerRoute';
import { productRoute } from './presentation/routes/productRoute';

AppDataSource.initialize();

app.listen(env.serverPort, [customerRoute, productRoute, orderRoute]);
