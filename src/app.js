
import { Client } from 'pg';

const pgConString = "postgres://postgres:postgres@localhost:5432/opla?currentSchema=myschema";
const client = Client(pgConString);

client.connect().then((result) => {
    client.on('notification', function(msg) {
        console.log(msg);
    });
    let query = client.query("LISTEN watchers");
}).catch((err) => {
    console.log(err);
});

export default client;