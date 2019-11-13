require('dotenv').config();

const env = process.env.ENV || process.env.NODE_ENV;

const DBConfig = {
  test: {
    user: 'postgres',
    database: 'team_test',
    password: 'bami',
  },

  dev: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },

  production: {
    connectionString: process.env.DATABASE_URL,
  },

  staging: {
    connectionString: process.env.DATABASE_URL,
  },
};

let credentials = DBConfig[env];
if (!credentials) {
  credentials = DBConfig.dev;
}

const config = credentials;

export default config;
