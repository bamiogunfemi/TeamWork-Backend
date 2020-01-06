import { config } from 'dotenv';
import { expect } from 'chai';
import DB from '../../src/database/config/db';

config();

describe('Database config', () => {
  it('should establish connection to the DB', (done) => {
    DB.getClient()
      .then((client) => {
        expect(client.database).to.equal(process.env.TEST_DB_NAME);
        done();
      })
      .catch(done);
  });
});
