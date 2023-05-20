const {MongoClient, ServerApiVersion} = require('mongodb');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());



const uri = 'mongodb://0.0.0.0:27017';



// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4rd33vy.mongodb.net/?retryWrites=true&w=majority`;

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

        // console.log(req.query);
        // let query = {};
        // if (req.query?.category || req.query?.subcategory) {
        //     query = {
        //         category: req.query.category,
        //         subcategory: req.query.subcategory
        //     }
        // }


        const toyCollection = client.db('toylandDb').collection('toys');

        app.get('/toys', async (req, res) => {
            const result = await toyCollection.find({}).toArray();
            res.send(result);
        })


        app.post('/toys', async (req, res) => {
            const body = req.body;
            const results = await toyCollection.findOne(body);
            res.send(results);
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