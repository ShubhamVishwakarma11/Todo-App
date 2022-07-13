const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());
app.use(cors());

const MONGO_URL = process.env.MONGO_URL || "mongodb://0.0.0.0:27017/mern-todo";

mongoose.connect(MONGO_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    console.log("Connection successful with db!");
})
.catch(console.error);

const Todo = require("./models/Todo");
const todo = require('./models/Todo');

app.get('/todos', async (req,res) => {
    const todos = await todo.find();
    res.json(todos);
})

app.post("/todo/new" , async (req,res) => {
    const todo = new Todo({
        task: req.body.task
    });
    todo.save();
    res.json(todo);
})

app.delete('/todo/delete/:id', async (req,res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
});

app.put('/todo/complete/:id', async (req,res) => {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    todo.save();

    res.json(todo);
});

app.listen(3001, () => {
    console.log("Server listening on port 3001");
});

