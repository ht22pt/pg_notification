/*
import knex from 'knex';

const pgConString = "postgres://postgres:postgres@127.0.0.1:5432/opla";

const db = knex({
  client: 'pg',
  connection: pgConString,
  migrations: {
    tableName: 'migrations',
  },
  debug: process.env.DATABASE_DEBUG === 'true',
});

db.withSchema('opla_public').on('notification', function(msg) {
    console.log(msg);
});

db.raw("LISTEN watchers").then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
})

export default db;
*/
var pg = require('pg');

//A localhost PostgreSQL database's connection string is simple.
var connectionString = 'postgres://postgres:postgres@127.0.0.1:5432/opla';

//Step 2

//We access a PostgreSQL client

//We use the 'pg' module's recommended client pooling API
//We pass the connect function the database connection string, and a callback function
//'onConnect'. We define that function.
var postgres = pg.Client(connectionString)

postgres.co

function onConnect(err, client, done) {
  //Err - This means something went wrong connecting to the database.
  if (err) {
    console.error(err);
    process.exit(1);
  }

  //For now let's end client
  client.end();
}

export default pg;