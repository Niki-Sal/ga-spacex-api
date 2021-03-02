const mongoose = require('mongoose');
// Schema class from mongoose
const Schema = mongoose.Schema;

// Make a rocketSchema
const rocketSchema = new Schema({
    name: String,
    stages: Number,
    country: String,
    description: String
});

// Model
const Rocket = mongoose.model('Rocket', rocketSchema);

module.exports = Rocket;