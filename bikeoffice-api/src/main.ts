import express from 'express';
import * as path from 'path';
import { Test } from '@bikeoffice/types';
import cors from 'cors';

const app = express();

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// log every request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to bikeoffice-api!' } as Test);
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
