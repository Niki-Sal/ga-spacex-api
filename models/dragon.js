const mongoose = require('mongoose');
// Schema class from mongoose
const Schema = mongoose.Schema;

// Make a capsuleSchema
const dragonSchema = new Schema({
    name: { type: String, unique: true },
    type: String,
    waterLandings: Number,
});

// Model
const Dragon = mongoose.model('Dragon', dragonSchema);

module.exports = Dragon;