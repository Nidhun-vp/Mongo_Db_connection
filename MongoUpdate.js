
const { MongoClient }=require('mongodb');
const { Collection } = require('mongodb');

async function main(){
    const uri="mongodb://localhost:27017"
     const client=new MongoClient(uri);
     try{
        //connect to the mondodb cluster
        await client.connect();
        await newcollection(client,"node_db_1");

     }finally{
        await client.close();
     }
}

async function newcollection(client,dbname){
    const dbobj=await client.db(dbname);

    const collection=await dbobj.createCollection("mern_students");
    console.log("collection created");

   
    // const updateResult = await collection.updateOne(
    //     { name: "kiran" },                 
    //     { $set: { place: "KLM" } });    
        
        //updateMany
        const updates = [
            { filter: { name: "ann" }, update: { $set: { place: "kottayam" } } },
            { filter: { name: "annie" }, update: { $set: { place: "kollam" } } }
        ];
        
console.log(`${updates.insertedCount} record updated successfully`);
 
const allData=await collection.find().toArray();
console.log(allData);


}
main().catch(console.error)