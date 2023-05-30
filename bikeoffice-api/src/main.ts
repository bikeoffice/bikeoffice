import express from 'express';
import * as path from 'path';
import { Bike, Client, Employee, Product, Rent, User } from '@bikeoffice/types';
import sequelizeSchemaCrud from '@bikeoffice/sequelize-schema-connector';
import sequelizeCrud from 'express-crud-router-sequelize-v6-connector'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import crud from 'express-crud-router';
import cookieMiddleware from './middlewares/auth';
import { AuthRouter } from '../src/routes/auth';
import { RentsCalendarRouter } from './routes/rentsCalendar';
import { AvailabilityRouter } from './routes/availability';

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

// RENT MODULE
app.use(crud('/rents', sequelizeSchemaCrud(Rent)));
app.use(crud('/bikes', sequelizeSchemaCrud(Bike)));
app.use(crud('/clients', sequelizeSchemaCrud(Client)));
// custom routes
app.use('/rents-calendar', RentsCalendarRouter);
app.use('/availability', AvailabilityRouter);
// END RENT MODULE


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
