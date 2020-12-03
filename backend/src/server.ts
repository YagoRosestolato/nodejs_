import express from 'express';
import path from 'path';
import cors from 'cors';

import uploadConfig from './config/upload';

import routes from './routes';
import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(uploadConfig.directory)));

app.listen(3333, () => {
  console.log(`Online !`);
});
