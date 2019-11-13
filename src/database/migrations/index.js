import '@babel/polyfill';
import debug from 'debug';
import DB from '../config/db';

import createQuery from './createTables';
import dropQuery from './dropTables';

const DEBUG = debug('DB');

// eslint-disable-next-line consistent-return
const queryTable = async () => {
  try {
    const queries = `${dropQuery}${createQuery}`;
    const migrateTable = await DB.query(queries);
    DEBUG(migrateTable);
  } catch (err) {
    DEBUG(err.stack);
    return err.stack;
  }
};

queryTable();
