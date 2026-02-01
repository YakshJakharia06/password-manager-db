const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const dns = require('node:dns');
const cors = require('cors');

dotenv.config();


const url = process.env.MONGO_URI;
if (!url) {
  console.error("ERROR: MONGO_URI is undefined. Check your .env file location and variable name.");
  process.exit(1);
}
const client = new MongoClient(url);
const dbName = 'password';

const app = express();
dns.setServers(['8.8.8.8', '8.8.4.4']); 

const port = 3001;

app.use(bodyParser.json());
app.use(cors());


async function main() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas");

    // get all passwords
    app.get('/', async (req, res) => {
      const db = client.db(dbName);
      const collection = db.collection('passwords');
      const findResult = await collection.find({}).toArray();
      res.json(findResult);
    });

    // save a password
    app.post('/', async (req, res) => {
      const password = req.body;
      const db = client.db(dbName);
      const collection = db.collection('passwords');
      const findResult = await collection.insertOne(password);
      res.send({ success: true, findResult });
    });

    // delete a password
    app.delete('/', async (req, res) => {
      const password = req.body;
      const db = client.db(dbName);
      const collection = db.collection('passwords');
      const findResult = await collection.deleteOne({ id: password.id });
      res.send({ success: true, findResult });
    });

    app.listen(port, '0.0.0.0', () => {
      console.log(`Backend server listening on port http://localhost:${port}`);
    });

  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

main();
