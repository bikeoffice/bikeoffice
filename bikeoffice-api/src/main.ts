import express from 'express';
import * as path from 'path';
import { Employee, Test, User } from '@bikeoffice/types';
import sequelizeSchemaCrud from '@bikeoffice/sequelize-schema-connector';
import sequelizeCrud from 'express-crud-router-sequelize-v6-connector'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import crud from 'express-crud-router';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.send({ message: 'Welcome to bikeoffice-api!' } as Test);
});

app.get("/schema", (req, res) => res.cookie("schema", req.query.schema, { maxAge: 900000, httpOnly: false }) && res.send({ message: 'Schema set' }))

app.use(crud('/users', sequelizeCrud(User)))

app.use(crud('/employees', sequelizeSchemaCrud(Employee)))

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
