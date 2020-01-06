import { config } from 'dotenv';
import { Done } from 'mocha';
import prepare from 'mocha-prepare';
import runAll from 'npm-run-all';

config();

/**
 * @description called before running test cases
 * @param {Done} done mocha async done method
 */
const initSetup = (done) => {
  runAll(['db:migrate', 'db:seed'])
    .then(() => done())
    .catch(done);
};

/**
 * @description called after all test completes
 * @param {Done} done mocha async done method
 */
const tearDown = (done) => {
  runAll(['db:refresh'])
    .then(() => done())
    .catch(done);
};

prepare(initSetup, tearDown);
