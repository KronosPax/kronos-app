// Can not use import statements outside a module // import { MongoClient } from "mongodb";
const { MongoClient } = require("mongodb");

// URI string from MongoDB Atlas Connection
const uri =
    'mongodb+srv://admin:admin123@kp-cluster.g74e9au.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);
async function run() {
    try {
        const database = client.db("kp_db");
        const customers = database.collection("customers");
        // create a filter for a movie to update
        const filter = { fName: "Lord" };
        // this option instructs the method to create a document if no documents match the filter
        const options = { upsert: true };
        // create a document that sets the phone number of the customer
        const updateDoc = {
            $set: {
                phone: "5126969420"
            },
        };
        const result = await customers.updateOne(filter, updateDoc, options);
        console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
        );
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
