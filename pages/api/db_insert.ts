import { MongoClient } from "mongodb";
// Replace the uri string with your MongoDB deployment's connection string.
const uri = 'mongodb+srv://admin:admin123@kp-cluster.g74e9au.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

interface Customer {
    fName: string;
    lName: string;
    pwd: string;
    email: string;
}

async function run() {
    try {
        const database = client.db("kp_db");
        // Specifying a Schema is optional, but it enables type hints on
        // finds and inserts
        const customers = database.collection<Customer>("customers");
        const result = await customers.insertOne({
            fName: "Lord",
            lName: "Voldemort",
            pwd: "HarryH8R_76!",
            email: "triddle@stedwards.edu"
        });
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);