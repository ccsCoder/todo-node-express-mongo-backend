const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TaskSchema = new Schema({
    id: String,
    title: String,
    complete: Boolean,
    description: String,
    color: String,
    pinned: String
});

module.exports = mongoose.model('Task', TaskSchema);