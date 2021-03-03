const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const shipSchema = new Schema({
    id: {type: String, unique: true},
    name: String,
    active: Boolean,
    roles: Array
})

const Ship = mongoose.model('Ship', shipSchema);

module.exports = Ship;