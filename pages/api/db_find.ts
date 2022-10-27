import { MongoClient } from "mongodb";
// Replace the uri string with your MongoDB deployment's connection string.
const uri = 'mongodb+srv://admin:admin123@kp-cluster.g74e9au.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

export interface Customer {
    fName: string;
    lName: string;
    pwd: string;
    email: string;
}
type CustomerSummary = Pick<Customer, "fName">;
async function run(): Promise<void> {
    try {
        const database = client.db("mongodbtest");
        // Specifying a Schema is always optional, but it enables type hinting on
        // finds and inserts
        const customers = database.collection<Customer>("customer");
        const customer = await customers.findOne<CustomerSummary>(
            { fName: "Lady" }
        );
        console.log(customer);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);