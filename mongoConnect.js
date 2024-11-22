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
//insertone
    const customerData={name:"annie",place:"TVM",email:"annie@gmail.com"};
    const result=await collection.insertOne(customerData);
//insertMany
// const studentData=[
//     {name:"ann",place:"COK",email:"ann@gmail.com"},
//     {name:"benny",place:"CAN",email:"benny@gmail.com"},
//     {name:"kiran",place:"CCJ",email:"kiran@gmail.com"},
//     {name:"vinod",place:"DXB",email:"vinod@gmail.com"}
// ];

// const result=await collection.insertMany(studentData);
console.log(`${result.insertedCount} record inserted`);
 
const allData=await collection.find().toArray();
console.log(allData);


}
main().catch(console.error)