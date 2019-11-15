import { config } from 'dotenv';
import debug from 'debug';
import express from 'express';
import router from './routes';

config();

const app = express();
const DEBUG = debug('dev');
const port = process.env.NODE_ENV === 'test' ? 8378 : process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', router);

app.get('/', (_, res) => {
  res.status(200).json({ msg: 'Welcome to TeamWork' });
});

app.listen(port, () => DEBUG(`server on port ${port}`));

export default app;
