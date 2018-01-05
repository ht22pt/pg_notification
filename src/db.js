const pg = require('pg');

//A localhost PostgreSQL database's connection string is simple.
const connectionString = 'postgres://postgres:postgres@127.0.0.1:5432/opla?currentShema=opla_public';

const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'opla',
  user: 'postgres',
  password: 'postgres',
});

const clientData = new pg.Client(connectionString);

clientData.connect().then((client) => {
  clientData.on('notification', function(msg) {
    console.log(msg);
  });

  clientData.query('LISTEN watchers');
}).catch((err) => {
  console.log(err);
});

/*
pool.connect((err, client, done) => {
  if (err) {
    console.log(err);
  }

  client.on('notification', function(msg) {
    console.log(msg);
  });

  client.query('LISEN watchers');

});
*/
export default connectionString;