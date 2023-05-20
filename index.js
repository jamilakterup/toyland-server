const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());



// const uri = 'mongodb://0.0.0.0:27017';



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4rd33vy.mongodb.net/?retryWrites=true&w=majority`;

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
        // await client.connect();

        const toyCollection = client.db('toylandDb').collection('toys');

        app.get('/toys', async (req, res) => {
            const result = await toyCollection.find({}).toArray();
            res.send(result);
        })


        app.post('/toys', async (req, res) => {
            const body = req.body;
            const result = await toyCollection.insertOne(body);
            res.send(result);
        });

        app.delete('/toys/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const result = await toyCollection.deleteOne(query);
            res.send(result);
        });

        app.get('/toys/:subcategory', async (req, res) => {
            const subcategory = req.params.subcategory;
            const query = {subcategory: subcategory};
            const result = await toyCollection.find(query).toArray();
            res.send(result);
        });

        app.get('/myToys/:email', async (req, res) => {
            const email = req.params.email;
            const query = {email: email};
            const result = await toyCollection.find(query).toArray();
            res.send(result);
        });





    } finally {
        // await client.close();
    }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send('welcome to toyland')
})

app.listen(port, () => {
    console.log(`port in running on ${port}`);
});