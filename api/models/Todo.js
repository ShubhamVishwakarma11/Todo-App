const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    task : {
        type: String,
        required: true
    },
    completed : {
        type: Boolean,
        default : false
    },
    timeStamp : {
        type: String,
        default: Date.now()
    }
})

const todo = mongoose.model("todo", todoSchema);
module.exports = todo;