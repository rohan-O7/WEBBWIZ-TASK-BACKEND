const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser")
dotenv.config();
const app = express();
const cors = require("cors")

const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "To-Do-List";

const port = 3000;

client.connect();
app.use(bodyParser.json())
app.use(cors())

// Get all the todos
app.get("/", async (req, res) => {
  const db = client.db(dbName);   
  const collection = db.collection("documents");
  const findResult = await collection.find().toArray();
  res.json(findResult);
});

// Save a todo
app.post("/add", async (req, res) => {
  const todo=req.body;
  const db = client.db(dbName);   
  const collection = db.collection("documents");
  const addResult = await collection.insertOne(todo)
  res.send({success: true,result:addResult})
});

// Delete a todo
app.delete("/delete", async (req, res) => {
    const todo=req.body;
    const db = client.db(dbName);    
    const collection = db.collection("documents");
    const deleteResult = await collection.deleteOne({id:todo.id});
    res.send({success: true,result:deleteResult});
  });

// Update a todo
app.put("/edit", async (req, res) => {
  const todo=req.body;
  console.log(todo);
  const db = client.db(dbName);
  const collection = db.collection("documents");
  const editResult = await collection.updateOne({ id: todo.id }, { $set: {todo:todo.todo} });
  res.send({success: true,result:editResult})
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
