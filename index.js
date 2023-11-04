const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

// midleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j7uagrh.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const projectCollection = client.db("Portfolio").collection("Projects");
    const experienceCollection = client
      .db("Portfolio")
      .collection("Experience");
    const educationCollection = client.db("Portfolio").collection("Educations");
    const contactsCollection = client.db("Portfolio").collection("Contacts");

    // Project Data Get
    app.get("/projects", async (req, res) => {
      const query = {};
      const result = await projectCollection.find(query).toArray();
      res.send(result);
    });

    // experience Data Get
    app.get("/experiences", async (req, res) => {
      const query = {};
      const result = await experienceCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/educations", async (req, res) => {
      const query = {};
      const result = await educationCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/contacts", async (req, res) => {
      const query = {};
      const result = await contactsCollection.find(query).toArray();
      res.send(result);
      console.log(result);
    }); 

    // Project Data post
    app.post("/projects", async (req, res) => {
      const newProject = req.body;
      const result = projectCollection.insertOne(newProject);
      res.send(result);
    });

    
    // experience Data post
    app.post("/experiences", async (req, res) => {
      const newExperience = req.body;
      const result = experienceCollection.insertOne(newExperience);
      res.send(result);
    });
    // experience Data post
    app.post("/educations", async (req, res) => {
      const newEducation = req.body;
      const result = educationCollection.insertOne(newEducation);
      res.send(result);
    });
    app.post("/contacts", async (req, res) => {
      const newContacts = req.body;
      const result = contactsCollection.insertOne(newContacts);
      res.send(result);
    });

    app.delete("/projects/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await projectCollection.deleteOne(query);
      res.send(result);
      console.log(result);
    });
    app.delete("/experiences/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await experienceCollection.deleteOne(query);
      res.send(result);
    });
    app.delete("/educations/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await educationCollection.deleteOne(query);
      res.send(result);
    });
    app.delete("/contacts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await contactsCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch((error) => console.error(error));

app.get("/", async (req, res) => {
  res.send("Portfolio Is Running");
});
app.listen(port, () => {
  console.log(`portfolio Running in ${port}`);
});
