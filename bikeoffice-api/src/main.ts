import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import * as path from 'path';
import { Bike, BikeDetail, BikeSize, Category, Client, Employee, Product, Rent, User, Ticket} from '@bikeoffice/types';
import sequelizeSchemaCrud from '@bikeoffice/sequelize-schema-connector';
import sequelizeCrud from 'express-crud-router-sequelize-v6-connector'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import crud from 'express-crud-router';
import { TicketRouter } from './modules/ticket/routes';
import { AuthRouter } from './modules/auth/routes';
import { cookieMiddleware } from './modules/auth/middlewares';
import { RentsCalendarRouter } from './modules/rent/routes';
import { AvailabilityRouter } from './modules/availability/routes';

const app = express();

// middlewares
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// routers
app.use('/auth', AuthRouter);

// crud and schemaCrud
app.use(cookieMiddleware);
app.use(crud('/users', sequelizeCrud(User)))
app.use(crud('/employees', sequelizeSchemaCrud(Employee)))
app.use(crud('/products', sequelizeSchemaCrud(Product)))
app.use(crud('/categories', sequelizeSchemaCrud(Category)))
app.use(crud('/tickets', sequelizeSchemaCrud(Ticket)))

app.use('/ticket', TicketRouter);

// RENT MODULE
app.use(crud('/rents', sequelizeSchemaCrud(Rent)));
app.use(crud('/clients', sequelizeSchemaCrud(Client)));
app.use(crud('/bikes', sequelizeSchemaCrud(Bike)));
app.use(crud('/details', sequelizeSchemaCrud(BikeDetail)));
app.use(crud('/sizes', sequelizeSchemaCrud(BikeSize)));
app.use(crud('/categories', sequelizeSchemaCrud(Category)));
// custom routes
app.use('/rents-calendar', RentsCalendarRouter);
app.use('/availability', AvailabilityRouter);
// END RENT MODULE


const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
server.on('error', console.error);
