import { Pool, types } from 'pg';
import config from './config';

const dbPool = new Pool(config);

types.setTypeParser(1700, (val) => parseFloat(val));

export default {
  query(text, params) {
    return new Promise((resolve, reject) => {
      dbPool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
