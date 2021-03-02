const mongoose = require('mongoose');
// Schema class from mongoose
const Schema = mongoose.Schema;

// Make a capsuleSchema
const landpadsSchema = new Schema({
    name: { type: String, unique: true },
    region: String,
    landing_attempts: Number,
    landing_successes: Number,
});

// Model
const Landpads = mongoose.model('Landpads', landpadsSchema);

module.exports = Landpads;