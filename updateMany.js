const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Call the function to perform operations on the collection
        await updatePlaces(client, "node_db_1");

    } finally {
        await client.close();
    }
}

async function updatePlaces(client, dbname) {
    const dbobj = client.db(dbname);
    const collection = dbobj.collection("mern_students");

    console.log("Collection connected...");

    // Update "ann" and "annie"
    const updates = [
        { filter: { name: "ann" }, update: { $set: { place: "kozhikode" } } },
        { filter: { name: "annie" }, update: { $set: { place: "kottakkal" } } }
    ];

    for (const { filter, update } of updates) {
        const result = await collection.updateOne(filter, update);
        console.log(`Updated ${result.modifiedCount} document(s) for filter:`, filter);
    }

    // Fetch and display all documents after update
    const allData = await collection.find().toArray();
    console.log("Updated Data:");
    console.log(allData);
}

main().catch(console.error);
