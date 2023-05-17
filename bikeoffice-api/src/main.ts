import express from 'express';
import * as path from 'path';
import { Employee, Product, User } from '@bikeoffice/types';
import sequelizeSchemaCrud from '@bikeoffice/sequelize-schema-connector';
import sequelizeCrud from 'express-crud-router-sequelize-v6-connector'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import crud from 'express-crud-router';
import cookieMiddleware from './middlewares/auth';
import { AuthRouter } from '../src/routes/auth';

const app = express();

// middlewares
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// routers
app.use('/auth', AuthRouter);

// Crud and schemaCrud
app.use(cookieMiddleware);
app.use(crud('/users', sequelizeCrud(User)))
app.use(crud('/employees', sequelizeSchemaCrud(Employee)))
app.use(crud('/products', sequelizeSchemaCrud(Product)))

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
