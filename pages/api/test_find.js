const { MongoClient } = require("mongodb");

// URI string from MongoDB Atlas Connection
const uri =
    'mongodb+srv://admin:admin123@kp-cluster.g74e9au.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function run() {
    try {
        const database = client.db('kp_db');
        const customers = database.collection('customers');

        // Query for a customer with the first name Lady
        const query = { fName: 'Lady' };
        const customer = await customers.findOne(query);

        console.log(customer);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);