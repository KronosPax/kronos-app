const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = 'mongodb+srv://admin:admin123@kp-cluster.g74e9au.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);
async function run() {
    try {
        const database = client.db("kp_db");
        const customers = database.collection("customers");
        // create an array of documents to insert
        const docs = [
            { fname: "Lord", lName:"Voldemort", phone_isVerified:false},
            { fname: "Laura", lName:"Smith", email:"lsmith7@stedwards.edu", phone: "5124668011", phone_isVerified:true},
            { fname: "James", lName:"Ross", email:"jross6@stedwards.edu", phone_isVerified:false},
        ];
        // this option prevents additional documents from being inserted if one fails
        const options = { ordered:true };
        const result = await customers.insertMany(docs, options);
        console.log(`${result.insertedCount} documents were inserted`);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);