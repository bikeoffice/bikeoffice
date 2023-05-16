import express from 'express';
import * as path from 'path';
import { Employee, User } from '@bikeoffice/types';
import sequelizeSchemaCrud from '@bikeoffice/sequelize-schema-connector';
import sequelizeCrud from 'express-crud-router-sequelize-v6-connector'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import crud from 'express-crud-router';
import cookieMiddleware from './middlewares/auth';
import AuthRouter from '../src/routes/auth';

const app = express();

// middlewares
app.use(cors({credentials: true, origin: true}));
app.use(cookieParser());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
// app.use(cookieMiddleware);

// routers
app.use('/auth', AuthRouter);

app.get("/schema", (req, res) => res.cookie("schema", req.query.schema, { maxAge: 900000, httpOnly: false }) && res.send({ message: 'Schema set' }))

// Crud and schemaCrud
app.use(crud('/users', sequelizeCrud(User)))

app.use(crud('/employees', sequelizeSchemaCrud(Employee)))

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
