const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://newdata:hAC0Qp8JViZ7dFyn@cluster0.pg0uckr.mongodb.net/?retryWrites=true&w=majority';
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
      // Send a ping to confirm a successful connection
      const studentCollection = client.db('devhouse').collection('students');
      const noticeCollection = client.db('devhouse').collection('notice');
      const teachersCollection = client.db('devhouse').collection('teachers');
     
      // console.log("Pinged your deployment. You successfully connected to MongoDB!");
      //Students information section
      app.get('/students', async(req,res)=>{
        const query = {};
        const cursor = studentCollection.find(query);
        const items = await cursor.toArray();
        res.send(items);
  
      });

      app.post('/students', async(req, res) =>{
        console.log("Request", req.body);
        const newUser = req.body;
        const result = await studentCollection.insertOne(newUser);
        res.send(result);
      });

      //notice information section

      app.get('/notice', async(req,res)=>{
        const query = {};
        const cursor = noticeCollection.find(query);
        const items = await cursor.toArray();
        res.send(items);
  
      });

      app.post('/notice', async(req, res) =>{
        console.log("Request", req.body);
        const newTeacher = req.body;
        const result = await noticeCollection.insertOne(newTeacher);
        res.send(result);
      });

      //Teachers Info API
      app.get('/teachers', async(req,res)=>{
        const query = {};
        const cursor = teachersCollection.find(query);
        const teacher = await cursor.toArray();
        res.send(teacher);
  
      });

      app.post('/teachers', async(req, res) =>{
        console.log("Request", req.body);
        const newUser = req.body;
        const result = await teachersCollection.insertOne(newUser);
        res.send(result);
      });

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
      }
    }
    run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send("Server is running");
});


app.listen(port,()=>{
    console.log(`Server running port: ${port}`);
});