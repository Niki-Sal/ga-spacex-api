const mongoose = require('mongoose');
// Schema class from mongoose
const Schema = mongoose.Schema;

// Make a capsuleSchema
const starlinkSchema = new Schema({
    file: Number,
    objectName: String,
    creationDate: String,
    date: new Date()
});

// Model
const Starlink = mongoose.model('Starlink', starlinkSchema);

module.exports = Starlink;