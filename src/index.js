import express from 'express';
import {config} from 'dotenv';

config();

const app = express();
const port = process.env.NODE_ENV === 'test' ? 8378 : process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_, res) => {
  res.status(200).json({ msg: 'Welcome to TeamWork' });
});

app.listen(port, () => console.log(`server on port ${port}`));

export default app;
