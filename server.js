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
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// Save a todo
app.post("/", async (req, res) => {
  const todo=req.body;
  const db = client.db(dbName);   
  const collection = db.collection("documents");
  const findResult = await collection.insertOne(todo)
  res.send({success: true,result:findResult})
});

// Delete a todo
app.delete("/", async (req, res) => {
    const todo=req.body;
    const db = client.db(dbName);    
    const collection = db.collection("documents");
    const findResult = await collection.deleteOne({id:todo.id});
    res.send({success: true,result:findResult});
  });

// Update a todo
app.put("/", async (req, res) => {
  const todo=req.body;
  const db = client.db(dbName);    
  const collection = db.collection("documents");
  const findResult = await collection.updateOne({ id: todo.id }, { $set: {todo:todo.todo.todo,isCompleted:todo.isCompleted} });
  res.send({success: true,result:findResult})
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
