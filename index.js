const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express()
require('dotenv').config()

const port = process.env.PORT || 5000; 

// middware
app.use(cors())
app.use(express.json())

// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASS)


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zfjzbub.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const tasksCollection = client.db('taskmanagement').collection('tasks');

    // post task on database
    app.post('/tasks', async(req, res)=>{
      const tasks = req.body;
  
      const result = await tasksCollection.insertOne(tasks)
      res.send(result)
  })

  app.get('/tasks/:email', async(req, res)=>{
    const email = req.params.email
    const query = {status:"todo", email:email}
    const result = await tasksCollection.find(query).toArray()
    res.send(result)


  })
  app.get('/tasks/:email', async(req, res)=>{
    const email = req.params.email
    const query = {status:"ongoing", email:email}
    const result = await tasksCollection.find(query).toArray()
    res.send(result)


  })

  app.delete('/tasks/:id', async(req, res) =>{
    const id = req.params.id
    const query = { _id: new ObjectId(id)}
    const result = await tasksCollection.deleteOne(query)
    res.send(result); 
  })



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);








app.get('/', (req, res) => {
    res.send(' website is running.....')
  })
  
app.listen(port, () => {
    console.log(` listening on port ${port}`)
  })